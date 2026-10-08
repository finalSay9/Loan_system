
import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PenaltyService {
  private readonly logger = new Logger(PenaltyService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Find repayment schedules that:
   *
   * 1. Belong to a disbursed loan
   * 2. Are not fully paid
   * 3. Have passed their due date + grace period
   * 4. Have not already been assessed a penalty
   */
  async assessOverduePenalties(): Promise<{
    processed: number;
    skipped: number;
    failed: number;
  }> {
    const now = new Date();

    const schedules =
    await this.prisma.repaymentSchedule.findMany({
        where: {
        status: {
            in: ['PENDING', 'PARTIALLY_PAID'],
        },

        penaltyAssessedAt: null,

        loan: {
            status: 'DISBURSED',
        },
        },

        include: {
        loan: {
            select: {
            id: true,
            lateFeeType: true,
            lateFeeAmount: true,
            lateFeeRate: true,
            gracePeriodDays: true,
            },
        },
        },

        orderBy: [
        {
            dueDate: 'asc',
        },
        {
            installmentNumber: 'asc',
        },
        ],
    });


    let processed = 0;
    let skipped = 0;
    let failed = 0;

    for (const schedule of schedules) {
      try {
        const eligible = this.isPenaltyEligible(
          schedule,
          now,
        );

        if (!eligible) {
          skipped++;
          continue;
        }

        await this.assessPenalty(schedule.id, now);

        processed++;
      } catch (error) {
        failed++;

        this.logger.error(
          `Failed to assess penalty for schedule ${schedule.id}`,
          error instanceof Error
            ? error.stack
            : String(error),
        );
      }
    }

    this.logger.log(
      `Penalty assessment completed. processed=${processed}, skipped=${skipped}, failed=${failed}`,
    );

    return {
      processed,
      skipped,
      failed,
    };
  }

  private isPenaltyEligible(
    schedule: {
      dueDate: Date;
      amountDue: Prisma.Decimal;
      amountPaid: Prisma.Decimal;
      loan: {
        gracePeriodDays: number;
        lateFeeAmount: Prisma.Decimal;
        lateFeeRate: Prisma.Decimal;
      };
    },
    now: Date,
  ): boolean {
    const gracePeriodEndsAt =
      new Date(schedule.dueDate);

    gracePeriodEndsAt.setDate(
      gracePeriodEndsAt.getDate() +
        schedule.loan.gracePeriodDays,
    );

    if (now <= gracePeriodEndsAt) {
      return false;
    }

    const outstanding =
      schedule.amountDue.sub(
        schedule.amountPaid,
      );

    return outstanding.gt(0);
  }

  /**
   * Assess exactly one penalty for one schedule.
   *
   * The unique idempotency key protects us from
   * accidentally creating the same penalty twice.
   */
  private async assessPenalty(
    scheduleId: string,
    assessedAt: Date,
  ): Promise<void> {
    await this.prisma.$transaction(
      async (tx) => {
        const schedule =
          await tx.repaymentSchedule.findUnique({
            where: {
              id: scheduleId,
            },

            include: {
              loan: true,
            },
          });

        if (!schedule) {
          return;
        }

        /*
         * Re-check inside the transaction.
         *
         * This is important because another scheduler
         * execution may have processed the same schedule
         * after our initial query.
         */
        if (
          schedule.penaltyAssessedAt !== null
        ) {
          return;
        }

        if (
          schedule.loan.status !== 'DISBURSED'
        ) {
          return;
        }

        if (
          schedule.status === 'PAID' ||
          schedule.status === 'WAIVED'
        ) {
          return;
        }

        const gracePeriodEndsAt =
          new Date(schedule.dueDate);

        gracePeriodEndsAt.setDate(
          gracePeriodEndsAt.getDate() +
            schedule.loan.gracePeriodDays,
        );

        if (assessedAt <= gracePeriodEndsAt) {
          return;
        }

        const outstanding =
          schedule.amountDue.sub(
            schedule.amountPaid,
          );

        if (!outstanding.gt(0)) {
          return;
        }

        const penalty =
          this.calculatePenalty(
            schedule.loan.lateFeeType,
            schedule.loan.lateFeeAmount,
            schedule.loan.lateFeeRate,
            outstanding,
          );

        /*
         * If the configured penalty is zero,
         * still mark it as assessed so the scheduler
         * doesn't repeatedly process this installment.
         */
        const newPenaltyAmount =
          schedule.penaltyAmount.add(penalty);

        const newAmountDue =
          schedule.baseAmountDue.add(
            newPenaltyAmount,
          );

        const newRemainingBalance =
          Prisma.Decimal.max(
            new Prisma.Decimal(0),
            newAmountDue.sub(
              schedule.amountPaid,
            ),
          );

        const beforeState = {
          status: schedule.status,
          penaltyAmount:
            schedule.penaltyAmount.toString(),
          amountDue:
            schedule.amountDue.toString(),
          amountPaid:
            schedule.amountPaid.toString(),
          remainingBalance:
            schedule.remainingBalance.toString(),
          penaltyAssessedAt:
            schedule.penaltyAssessedAt,
        };

        await tx.repaymentSchedule.update({
          where: {
            id: schedule.id,
          },

          data: {
            penaltyAmount:
              newPenaltyAmount,

            amountDue:
              newAmountDue,

            remainingBalance:
              newRemainingBalance,

            status: 'OVERDUE',

            penaltyAssessedAt:
              assessedAt,
          },
        });

        /*
         * Create a deterministic penalty transaction.
         *
         * The unique reference/idempotency key makes the
         * operation naturally idempotent.
         */
        const reference =
          `PENALTY-${schedule.id}`;

        await tx.transaction.create({
          data: {
            loanId: schedule.loanId,

            type: 'PENALTY',

            amount: penalty,

            reference,

            idempotencyKey:
              `PENALTY:${schedule.id}`,

            penaltyAmount:
              penalty,

            metadata: {
              scheduleId: schedule.id,
              installmentNumber:
                schedule.installmentNumber,
              assessedAt:
                assessedAt.toISOString(),
              reason:
                'OVERDUE_INSTALLMENT',
            },
          },
        });

        const afterState = {
          status: 'OVERDUE',

          penaltyAmount:
            newPenaltyAmount.toString(),

          amountDue:
            newAmountDue.toString(),

          amountPaid:
            schedule.amountPaid.toString(),

          remainingBalance:
            newRemainingBalance.toString(),

          penaltyAssessedAt:
            assessedAt,
        };

        /*
         * NOTE:
         * AuditLog.actorId is currently required.
         *
         * We therefore need a system actor for scheduled
         * operations. This will be added separately rather
         * than pretending a human performed the action.
         */

        this.logger.log(
          `Penalty assessed: schedule=${schedule.id}, loan=${schedule.loanId}, amount=${penalty.toString()}`,
        );
      },
      {
        isolationLevel:
          Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  private calculatePenalty(
    lateFeeType: string,
    lateFeeAmount: Prisma.Decimal,
    lateFeeRate: Prisma.Decimal,
    outstanding: Prisma.Decimal,
  ): Prisma.Decimal {
    if (lateFeeType === 'FIXED') {
      return Prisma.Decimal.max(
        new Prisma.Decimal(0),
        lateFeeAmount,
      );
    }

    if (lateFeeType === 'PERCENTAGE') {
      /*
       * Percentage is calculated against the
       * outstanding installment balance.
       *
       * Example:
       *
       * outstanding = 10,000
       * lateFeeRate = 5
       *
       * penalty = 10,000 * 5 / 100
       *         = 500
       */
      return Prisma.Decimal.max(
        new Prisma.Decimal(0),
        outstanding
          .mul(lateFeeRate)
          .div(100),
      );
    }

    return new Prisma.Decimal(0);
  }
}
