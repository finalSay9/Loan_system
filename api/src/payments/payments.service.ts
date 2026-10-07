
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EventsGateway } from 'src/events/events.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventsGateway,
  ) {}

  /**
   * Record a repayment against a disbursed loan.
   *
   * Payment processing is atomic:
   *
   * 1. Validate the loan.
   * 2. Validate idempotency/reference.
   * 3. Calculate the outstanding balance.
   * 4. Create the repayment transaction.
   * 5. Allocate the payment FIFO across installments.
   * 6. Allocate each installment payment in priority order:
   *      penalty -> fee -> interest -> principal
   * 7. Create PaymentAllocation records.
   * 8. Update repayment schedules.
   * 9. Close the loan when all installments are paid.
   * 10. Write audit logs.
   *
   * The WebSocket event is emitted only after the
   * database transaction successfully commits.
   */
  async makeRepayment(
    userId: string,
    dto: {
      loanId: string;
      amount: number;
      reference: string;
    },
  ) {
    this.validatePayment(dto);

    const reference = dto.reference.trim();

    const result = await this.prisma.$transaction(async (tx) => {
      /**
       * ---------------------------------------------------------
       * 1. Validate the loan
       * ---------------------------------------------------------
       */
      const loan = await tx.loan.findFirst({
        where: {
          id: dto.loanId,
          userId,
          status: 'DISBURSED',
        },
      });

      if (!loan) {
        throw new NotFoundException(
          'Active loan not found',
        );
      }

      /**
       * ---------------------------------------------------------
       * 2. Idempotency / duplicate reference protection
       * ---------------------------------------------------------
       *
       * The database also has a UNIQUE constraint on reference.
       * This application-level check gives the user a meaningful
       * ConflictException before Prisma reaches the constraint.
       */
      const existingTransaction =
        await tx.transaction.findUnique({
          where: {
            reference,
          },
        });

      if (existingTransaction) {
        throw new ConflictException(
          'A payment with this reference already exists',
        );
      }

      /**
       * ---------------------------------------------------------
       * 3. Get outstanding repayment schedules
       * ---------------------------------------------------------
       *
       * IMPORTANT:
       *
       * PARTIALLY_PAID and OVERDUE installments must remain
       * eligible for payment.
       *
       * PAID and WAIVED installments are excluded.
       */
      const schedules =
        await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
            status: {
              in: [
                'PENDING',
                'PARTIALLY_PAID',
                'OVERDUE',
              ],
            },
          },
          orderBy: [
            {
              dueDate: 'asc',
            },
            {
              installmentNumber: 'asc',
            },
            {
              id: 'asc',
            },
          ],
        });

      if (schedules.length === 0) {
        throw new BadRequestException(
          'No outstanding installments found',
        );
      }

      /**
       * ---------------------------------------------------------
       * 4. Calculate outstanding loan balance
       * ---------------------------------------------------------
       */
      const outstandingBefore =
        schedules.reduce(
          (sum, schedule) =>
            sum +
            this.calculateScheduleOutstanding(
              schedule,
            ),
          0,
        );

      if (
        dto.amount >
        outstandingBefore + 0.000001
      ) {
        throw new BadRequestException(
          'Payment exceeds the outstanding loan balance',
        );
      }

      /**
       * ---------------------------------------------------------
       * 5. Create the repayment transaction
       * ---------------------------------------------------------
       */
      const transaction =
        await tx.transaction.create({
          data: {
            loanId: dto.loanId,
            type: 'REPAYMENT',
            amount: dto.amount,
            reference,
            providerRef: `MAN-${Date.now()}`,
          },
        });

      /**
       * ---------------------------------------------------------
       * 6. Allocate payment across installments
       * ---------------------------------------------------------
       */
      let remainingPayment = dto.amount;

      for (const schedule of schedules) {
        if (remainingPayment <= 0.000001) {
          break;
        }

        const allocation =
          this.calculatePaymentAllocation(
            schedule,
            remainingPayment,
          );

        if (allocation.total <= 0.000001) {
          continue;
        }

        /**
         * -------------------------------------------------------
         * Create immutable payment allocation record
         * -------------------------------------------------------
         */
        await tx.paymentAllocation.create({
          data: {
            transactionId: transaction.id,
            scheduleId: schedule.id,

            principalAmount:
              allocation.principal,

            interestAmount:
              allocation.interest,

            feeAmount:
              allocation.fee,

            penaltyAmount:
              allocation.penalty,
          },
        });

        /**
         * -------------------------------------------------------
         * Update repayment schedule
         * -------------------------------------------------------
         */
        const newPrincipalPaid =
          Number(schedule.principalPaid) +
          allocation.principal;

        const newInterestPaid =
          Number(schedule.interestPaid) +
          allocation.interest;

        const newFeePaid =
          Number(schedule.feePaid) +
          allocation.fee;

        const newPenaltyPaid =
          Number(schedule.penaltyPaid) +
          allocation.penalty;

        const newAmountPaid =
          Number(schedule.amountPaid) +
          allocation.total;

        const fullyPaid =
          newAmountPaid >=
          Number(schedule.amountDue) -
            0.000001;

        await tx.repaymentSchedule.update({
          where: {
            id: schedule.id,
          },

          data: {
            amountPaid: fullyPaid
              ? schedule.amountDue
              : newAmountPaid,

            principalPaid:
              fullyPaid
                ? schedule.principalAmount
                : newPrincipalPaid,

            interestPaid:
              fullyPaid
                ? schedule.interestAmount
                : newInterestPaid,

            feePaid:
              fullyPaid
                ? schedule.feeAmount
                : newFeePaid,

            penaltyPaid:
              fullyPaid
                ? schedule.penaltyAmount
                : newPenaltyPaid,

            status: fullyPaid
              ? 'PAID'
              : schedule.status ===
                  'OVERDUE'
                ? 'OVERDUE'
                : 'PARTIALLY_PAID',

            paidAt: fullyPaid
              ? new Date()
              : null,
          },
        });

        remainingPayment -= allocation.total;
      }

      /**
       * Floating-point protection.
       *
       * We should never silently lose money because of a
       * floating-point calculation.
       */
      if (remainingPayment > 0.000001) {
        throw new BadRequestException(
          'Unable to allocate the entire payment',
        );
      }

      /**
       * ---------------------------------------------------------
       * 7. Audit payment
       * ---------------------------------------------------------
       */
      await tx.auditLog.create({
        data: {
          actorId: userId,
          action: 'LOAN_REPAYMENT',
          entityType: 'LOAN',
          entityId: dto.loanId,

          afterState: {
            amount: dto.amount,
            reference,
            transactionId: transaction.id,
          },
        },
      });

      /**
       * ---------------------------------------------------------
       * 8. Recalculate loan balance
       * ---------------------------------------------------------
       */
      const updatedSchedules =
        await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
          },
          orderBy: {
            dueDate: 'asc',
          },
        });

      const totalDue =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum + Number(schedule.amountDue),
          0,
        );

      const totalPaid =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum + Number(schedule.amountPaid),
          0,
        );

      const outstanding = Math.max(
        0,
        totalDue - totalPaid,
      );

      const remainingInstallments =
        updatedSchedules.filter(
          (schedule) =>
            schedule.status !== 'PAID' &&
            schedule.status !== 'WAIVED',
        ).length;

      /**
       * ---------------------------------------------------------
       * 9. Determine whether the loan is fully repaid
       * ---------------------------------------------------------
       */
      const loanClosed =
        updatedSchedules.length > 0 &&
        remainingInstallments === 0 &&
        outstanding <= 0.000001;

      /**
       * ---------------------------------------------------------
       * 10. Close the loan
       * ---------------------------------------------------------
       */
      if (loanClosed) {
        await tx.loan.update({
          where: {
            id: dto.loanId,
          },

          data: {
            status: 'CLOSED',
            closedAt: new Date(),
            version: {
              increment: 1,
            },
          },
        });

        await tx.auditLog.create({
          data: {
            actorId: userId,
            action: 'LOAN_CLOSED',
            entityType: 'LOAN',
            entityId: dto.loanId,

            afterState: {
              reason:
                'All repayment installments paid',
              finalPaymentReference:
                reference,
              finalPaymentTransactionId:
                transaction.id,
            },
          },
        });
      }

      /**
       * ---------------------------------------------------------
       * 11. Return post-transaction information
       * ---------------------------------------------------------
       */
      return {
        message: loanClosed
          ? 'Payment recorded — loan fully repaid!'
          : 'Payment recorded successfully',

        data: transaction,

        loanClosed,

        balance: {
          totalDue,
          totalPaid,
          outstanding,

          progressPercent:
            totalDue > 0
              ? Math.min(
                  100,
                  Math.round(
                    (totalPaid /
                      totalDue) *
                      100,
                  ),
                )
              : 0,

          remainingInstallments,
        },
      };
    });

    /**
     * -----------------------------------------------------------
     * Emit realtime update ONLY after successful commit.
     * -----------------------------------------------------------
     */
    this.events.emitPaymentUpdate(
      userId,
      dto.loanId,
      result.balance,
    );

    return result;
  }

  /**
   * Validate payment input before opening
   * a database transaction.
   */
  private validatePayment(dto: {
    loanId: string;
    amount: number;
    reference: string;
  }) {
    if (!dto.loanId?.trim()) {
      throw new BadRequestException(
        'Loan ID is required',
      );
    }

    if (
      !Number.isFinite(dto.amount) ||
      dto.amount <= 0
    ) {
      throw new BadRequestException(
        'Payment amount must be greater than zero',
      );
    }

    if (!dto.reference?.trim()) {
      throw new BadRequestException(
        'Payment reference is required',
      );
    }
  }

  /**
   * Calculate the amount still outstanding
   * on an individual installment.
   */
  private calculateScheduleOutstanding(
    schedule: {
      amountDue: unknown;
      amountPaid: unknown;
    },
  ): number {
    return Math.max(
      0,
      Number(schedule.amountDue) -
        Number(schedule.amountPaid),
    );
  }

  /**
   * Determine how a payment should be allocated
   * against an installment.
   *
   * Priority:
   *
   * 1. Penalty
   * 2. Fee
   * 3. Interest
   * 4. Principal
   *
   * This is deterministic and prevents a payment from
   * being arbitrarily applied to principal first.
   */
  private calculatePaymentAllocation(
    schedule: {
      principalAmount: unknown;
      interestAmount: unknown;
      feeAmount: unknown;
      penaltyAmount: unknown;

      principalPaid: unknown;
      interestPaid: unknown;
      feePaid: unknown;
      penaltyPaid: unknown;

      amountDue: unknown;
      amountPaid: unknown;
    },
    paymentAmount: number,
  ) {
    let remaining = paymentAmount;

    /**
     * Outstanding component balances.
     */
    const outstandingPenalty = Math.max(
      0,
      Number(schedule.penaltyAmount) -
        Number(schedule.penaltyPaid),
    );

    const outstandingFee = Math.max(
      0,
      Number(schedule.feeAmount) -
        Number(schedule.feePaid),
    );

    const outstandingInterest = Math.max(
      0,
      Number(schedule.interestAmount) -
        Number(schedule.interestPaid),
    );

    const outstandingPrincipal = Math.max(
      0,
      Number(schedule.principalAmount) -
        Number(schedule.principalPaid),
    );

    /**
     * Penalty first.
     */
    const penalty = Math.min(
      remaining,
      outstandingPenalty,
    );

    remaining -= penalty;

    /**
     * Fee second.
     */
    const fee = Math.min(
      remaining,
      outstandingFee,
    );

    remaining -= fee;

    /**
     * Interest third.
     */
    const interest = Math.min(
      remaining,
      outstandingInterest,
    );

    remaining -= interest;

    /**
     * Principal last.
     */
    const principal = Math.min(
      remaining,
      outstandingPrincipal,
    );

    remaining -= principal;

    const total =
      penalty +
      fee +
      interest +
      principal;

    return {
      penalty,
      fee,
      interest,
      principal,
      total,
    };
  }

  /**
   * Get all transactions belonging
   * to the authenticated user.
   */
  async getMyTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        loan: {
          userId,
        },
      },

      include: {
        loan: {
          select: {
            id: true,
            purpose: true,
            amount: true,
          },
        },

        allocations: {
          include: {
            schedule: {
              select: {
                installmentNumber: true,
                dueDate: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get the complete repayment balance
   * for a specific loan.
   */
  async getLoanBalance(
    userId: string,
    loanId: string,
  ) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        userId,
      },

      include: {
        repayments: {
          orderBy: {
            dueDate: 'asc',
          },
        },
      },
    });

    if (!loan) {
      throw new NotFoundException(
        'Loan not found',
      );
    }

    const totalDue =
      loan.repayments.reduce(
        (sum, repayment) =>
          sum + Number(repayment.amountDue),
        0,
      );

    const totalPaid =
      loan.repayments.reduce(
        (sum, repayment) =>
          sum + Number(repayment.amountPaid),
        0,
      );

    const outstanding = Math.max(
      0,
      totalDue - totalPaid,
    );

    const paidInstallments =
      loan.repayments.filter(
        (repayment) =>
          repayment.status === 'PAID',
      ).length;

    const totalInstallments =
      loan.repayments.length;

    const nextInstallment =
      loan.repayments.find(
        (repayment) =>
          repayment.status ===
            'PENDING' ||
          repayment.status ===
            'PARTIALLY_PAID' ||
          repayment.status ===
            'OVERDUE',
      ) ?? null;

    return {
      loanId,

      totalDue,

      totalPaid,

      outstanding,

      progressPercent:
        totalDue > 0
          ? Math.min(
              100,
              Math.round(
                (totalPaid /
                  totalDue) *
                  100,
              ),
            )
          : 0,

      paidInstallments,

      totalInstallments,

      nextInstallment,

      schedule: loan.repayments,
    };
  }
}

