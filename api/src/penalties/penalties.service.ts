
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PenaltyService {
  private readonly logger =
    new Logger(PenaltyService.name);

  private readonly systemUserId =
    process.env.SYSTEM_USER_ID;

  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {
    if (!this.systemUserId) {
      throw new Error(
        'SYSTEM_USER_ID environment variable is not configured.',
      );
    }
  }

  /**
   * Find repayment schedules that are eligible for
   * overdue penalty assessment.
   *
   * A schedule is eligible when:
   *
   * - The loan is DISBURSED
   * - The installment is not fully paid
   * - The installment has passed its due date + grace period
   * - A penalty has not already been assessed
   */
  async assessOverduePenalties(): Promise<{
    processed: number;
    skipped: number;
    failed: number;
  }> {
     console.log('PrismaService injected:', !!this.prisma);
  console.log(
    'repaymentSchedule delegate:',
    !!this.prisma?.repaymentSchedule,
  );
    const now = new Date();

    const schedules =
      await this.prisma.repaymentSchedule.findMany({
        where: {
          status: {
            in: [
              'PENDING',
              'PARTIALLY_PAID',
            ],
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
        if (
          !this.isPenaltyEligible(
            schedule,
            now,
          )
        ) {
          skipped++;
          continue;
        }

        const assessed =
          await this.assessPenalty(
            schedule.id,
            now,
          );

        if (assessed) {
          processed++;
        } else {
          skipped++;
        }
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

  /**
   * Determine whether a schedule has passed its
   * grace period and still has money outstanding.
   */
  private isPenaltyEligible(
    schedule: {
      dueDate: Date;
      amountDue: Prisma.Decimal;
      amountPaid: Prisma.Decimal;
      loan: {
        gracePeriodDays: number;
      };
    },
    now: Date,
  ): boolean {
    const gracePeriodEndsAt =
      this.getGracePeriodEnd(
        schedule.dueDate,
        schedule.loan.gracePeriodDays,
      );

    if (now <= gracePeriodEndsAt) {
      return false;
    }

    const outstanding =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        schedule.amountDue.sub(
          schedule.amountPaid,
        ),
      );

    return outstanding.gt(0);
  }

  /**
   * Assess one penalty atomically.
   *
   * Returns true when this invocation actually
   * assessed the penalty.
   */
  private async assessPenalty(
    scheduleId: string,
    assessedAt: Date,
  ): Promise<boolean> {
    return this.prisma.$transaction(
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
          return false;
        }

        /*
         * Re-check all important conditions inside
         * the transaction.
         *
         * The initial query is only candidate discovery.
         * The transaction is the authoritative check.
         */
        if (
          schedule.penaltyAssessedAt !== null
        ) {
          return false;
        }

        if (
          schedule.loan.status !== 'DISBURSED'
        ) {
          return false;
        }

        if (
          schedule.status === 'PAID' ||
          schedule.status === 'WAIVED'
        ) {
          return false;
        }

        const gracePeriodEndsAt =
          this.getGracePeriodEnd(
            schedule.dueDate,
            schedule.loan.gracePeriodDays,
          );

        if (assessedAt <= gracePeriodEndsAt) {
          return false;
        }

        const outstanding =
          Prisma.Decimal.max(
            new Prisma.Decimal(0),
            schedule.amountDue.sub(
              schedule.amountPaid,
            ),
          );

        if (!outstanding.gt(0)) {
          return false;
        }

        const penalty =
          this.calculatePenalty(
            schedule.loan.lateFeeType,
            schedule.loan.lateFeeAmount,
            schedule.loan.lateFeeRate,
            outstanding,
          );

        /*
         * Capture the state before modification for
         * the audit record.
         */
        const beforeState = {
          status: schedule.status,
          amountDue:
            schedule.amountDue.toString(),
          amountPaid:
            schedule.amountPaid.toString(),
          baseAmountDue:
            schedule.baseAmountDue.toString(),
          penaltyAmount:
            schedule.penaltyAmount.toString(),
          remainingBalance:
            schedule.remainingBalance.toString(),
          penaltyAssessedAt:
            schedule.penaltyAssessedAt,
        };

        const newPenaltyAmount =
          schedule.penaltyAmount.add(
            penalty,
          );

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

        /*
         * Update the repayment schedule.
         */
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
         * Every assessed penalty gets its own
         * deterministic transaction identity.
         */
        const reference =
          `PENALTY-${schedule.id}`;

        const idempotencyKey =
          `PENALTY:${schedule.id}`;

        /*
         * Do not create a zero-value financial
         * transaction.
         *
         * We still mark the schedule as assessed
         * above so it cannot be repeatedly processed.
         */
        if (penalty.gt(0)) {
          await tx.transaction.create({
            data: {
              loanId:
                schedule.loanId,

              type: 'PENALTY',

              amount:
                penalty,

              reference,

              idempotencyKey,

              penaltyAmount:
                penalty,

              metadata: {
                scheduleId:
                  schedule.id,

                installmentNumber:
                  schedule.installmentNumber,

                assessedAt:
                  assessedAt.toISOString(),

                reason:
                  'OVERDUE_INSTALLMENT',
              },
            },
          });
        }

        const afterState = {
          status: 'OVERDUE',

          amountDue:
            newAmountDue.toString(),

          amountPaid:
            schedule.amountPaid.toString(),

          baseAmountDue:
            schedule.baseAmountDue.toString(),

          penaltyAmount:
            newPenaltyAmount.toString(),

          remainingBalance:
            newRemainingBalance.toString(),

          penaltyAssessedAt:
            assessedAt,
        };

        /*
         * Automated financial operations must have
         * an identifiable audit actor.
         */
        await tx.auditLog.create({
          data: {
            actorId:
              this.systemUserId!,

            action:
              'ASSESS_PENALTY',

            entityType:
              'RepaymentSchedule',

            entityId:
              schedule.id,

            beforeState,

            afterState,
          },
        });

        this.logger.log(
          `Penalty assessed: schedule=${schedule.id}, loan=${schedule.loanId}, penalty=${penalty.toString()}`,
        );

        return true;
      },

      {
        isolationLevel:
          Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  /**
   * Calculate the end of the grace period.
   *
   * Example:
   *
   * Due date:       September 1
   * Grace period:   3 days
   * Grace ends:     September 4
   * Overdue:        September 5
   */
  private getGracePeriodEnd(
    dueDate: Date,
    gracePeriodDays: number,
  ): Date {
    const result =
      new Date(dueDate);

    result.setDate(
      result.getDate() +
        gracePeriodDays,
    );

    return result;
  }

  /**
   * Calculate the penalty using the configuration
   * snapshot stored directly on the loan.
   *
   * FIXED:
   *
   *   penalty = lateFeeAmount
   *
   * PERCENTAGE:
   *
   *   penalty =
   *     outstanding × lateFeeRate / 100
   */
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

    if (
      lateFeeType === 'PERCENTAGE'
    ) {
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

