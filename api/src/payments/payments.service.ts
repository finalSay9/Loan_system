

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma';

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
   * Financial calculations use Prisma.Decimal throughout.
   *
   * Processing flow:
   *
   * 1. Validate request.
   * 2. Validate the loan.
   * 3. Check duplicate reference.
   * 4. Load outstanding schedules.
   * 5. Calculate outstanding balance.
   * 6. Create repayment transaction.
   * 7. Allocate payment FIFO.
   * 8. Allocate each installment:
   *      penalty -> fee -> interest -> principal
   * 9. Create PaymentAllocation records.
   * 10. Update repayment schedules.
   * 11. Update transaction component totals.
   * 12. Recalculate loan balance.
   * 13. Close loan when completely repaid.
   * 14. Write audit logs.
   *
   * WebSocket notification is emitted only after
   * the database transaction successfully commits.
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
    const paymentAmount = new Prisma.Decimal(dto.amount);

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
       * 2. Duplicate reference protection
       * ---------------------------------------------------------
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
       * PENDING, PARTIALLY_PAID and OVERDUE installments
       * can receive payments.
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
            sum.add(
              this.calculateScheduleOutstanding(
                schedule,
              ),
            ),
          new Prisma.Decimal(0),
        );

      if (paymentAmount.gt(outstandingBefore)) {
        throw new BadRequestException(
          'Payment exceeds the outstanding loan balance',
        );
      }

      /**
       * ---------------------------------------------------------
       * 5. Create repayment transaction
       * ---------------------------------------------------------
       *
       * Component totals are calculated during allocation
       * and written back to this transaction later.
       */
      const transaction =
        await tx.transaction.create({
          data: {
            loanId: dto.loanId,
            type: 'REPAYMENT',
            amount: paymentAmount,
            reference,

            /**
             * This is intentionally left null.
             *
             * providerRef should represent a real external
             * provider transaction/reference when one exists.
             */
            providerRef: null,

            principalAmount:
              new Prisma.Decimal(0),

            interestAmount:
              new Prisma.Decimal(0),

            feeAmount:
              new Prisma.Decimal(0),

            penaltyAmount:
              new Prisma.Decimal(0),
          },
        });

      /**
       * ---------------------------------------------------------
       * 6. Allocate payment FIFO
       * ---------------------------------------------------------
       */
      let remainingPayment = paymentAmount;

      let totalPrincipalAllocated =
        new Prisma.Decimal(0);

      let totalInterestAllocated =
        new Prisma.Decimal(0);

      let totalFeeAllocated =
        new Prisma.Decimal(0);

      let totalPenaltyAllocated =
        new Prisma.Decimal(0);

      for (const schedule of schedules) {
        if (remainingPayment.lte(0)) {
          break;
        }

        const allocation =
          this.calculatePaymentAllocation(
            schedule,
            remainingPayment,
          );

        if (allocation.total.lte(0)) {
          continue;
        }

        /**
         * -------------------------------------------------------
         * Create immutable allocation record
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
         * Accumulate transaction-level accounting
         * -------------------------------------------------------
         */
        totalPrincipalAllocated =
          totalPrincipalAllocated.add(
            allocation.principal,
          );

        totalInterestAllocated =
          totalInterestAllocated.add(
            allocation.interest,
          );

        totalFeeAllocated =
          totalFeeAllocated.add(
            allocation.fee,
          );

        totalPenaltyAllocated =
          totalPenaltyAllocated.add(
            allocation.penalty,
          );

        /**
         * -------------------------------------------------------
         * Calculate new schedule balances
         * -------------------------------------------------------
         */
        const newPrincipalPaid =
          new Prisma.Decimal(
            schedule.principalPaid,
          ).add(allocation.principal);

        const newInterestPaid =
          new Prisma.Decimal(
            schedule.interestPaid,
          ).add(allocation.interest);

        const newFeePaid =
          new Prisma.Decimal(
            schedule.feePaid,
          ).add(allocation.fee);

        const newPenaltyPaid =
          new Prisma.Decimal(
            schedule.penaltyPaid,
          ).add(allocation.penalty);

        const newAmountPaid =
          new Prisma.Decimal(
            schedule.amountPaid,
          ).add(allocation.total);

        const amountDue =
          new Prisma.Decimal(
            schedule.amountDue,
          );

        /**
         * Remaining balance must never become negative.
         */
        const newRemainingBalance =
          Prisma.Decimal.max(
            new Prisma.Decimal(0),
            amountDue.sub(newAmountPaid),
          );

        const fullyPaid =
          newRemainingBalance.isZero();

        /**
         * -------------------------------------------------------
         * Update repayment schedule
         * -------------------------------------------------------
         */
        await tx.repaymentSchedule.update({
          where: {
            id: schedule.id,
          },

          data: {
            amountPaid: fullyPaid
              ? amountDue
              : newAmountPaid,

            principalPaid: fullyPaid
              ? new Prisma.Decimal(
                  schedule.principalAmount,
                )
              : newPrincipalPaid,

            interestPaid: fullyPaid
              ? new Prisma.Decimal(
                  schedule.interestAmount,
                )
              : newInterestPaid,

            feePaid: fullyPaid
              ? new Prisma.Decimal(
                  schedule.feeAmount,
                )
              : newFeePaid,

            penaltyPaid: fullyPaid
              ? new Prisma.Decimal(
                  schedule.penaltyAmount,
                )
              : newPenaltyPaid,

            remainingBalance:
              newRemainingBalance,

            status: fullyPaid
              ? 'PAID'
              : schedule.status === 'OVERDUE'
                ? 'OVERDUE'
                : 'PARTIALLY_PAID',

            paidAt: fullyPaid
              ? new Date()
              : null,
          },
        });

        remainingPayment =
          remainingPayment.sub(
            allocation.total,
          );
      }

      /**
       * ---------------------------------------------------------
       * 7. Ensure entire payment was allocated
       * ---------------------------------------------------------
       */
      if (remainingPayment.gt(0)) {
        throw new BadRequestException(
          'Unable to allocate the entire payment',
        );
      }

      /**
       * ---------------------------------------------------------
       * 8. Update transaction accounting
       * ---------------------------------------------------------
       *
       * This makes the Transaction itself financially
       * meaningful without having to reconstruct its
       * allocation later.
       */
      const updatedTransaction =
        await tx.transaction.update({
          where: {
            id: transaction.id,
          },

          data: {
            principalAmount:
              totalPrincipalAllocated,

            interestAmount:
              totalInterestAllocated,

            feeAmount:
              totalFeeAllocated,

            penaltyAmount:
              totalPenaltyAllocated,
          },
        });

      /**
       * ---------------------------------------------------------
       * 9. Audit payment
       * ---------------------------------------------------------
       */
      await tx.auditLog.create({
        data: {
          actorId: userId,
          action: 'LOAN_REPAYMENT',
          entityType: 'LOAN',
          entityId: dto.loanId,

          afterState: {
            amount: paymentAmount.toString(),
            reference,
            transactionId: transaction.id,

            principalAmount:
              totalPrincipalAllocated.toString(),

            interestAmount:
              totalInterestAllocated.toString(),

            feeAmount:
              totalFeeAllocated.toString(),

            penaltyAmount:
              totalPenaltyAllocated.toString(),
          },
        },
      });

      /**
       * ---------------------------------------------------------
       * 10. Recalculate complete loan balance
       * ---------------------------------------------------------
       */
      const updatedSchedules =
        await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
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

      const totalDue =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum.add(
              new Prisma.Decimal(
                schedule.amountDue,
              ),
            ),
          new Prisma.Decimal(0),
        );

      const totalPaid =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum.add(
              new Prisma.Decimal(
                schedule.amountPaid,
              ),
            ),
          new Prisma.Decimal(0),
        );

      const outstanding =
        Prisma.Decimal.max(
          new Prisma.Decimal(0),
          totalDue.sub(totalPaid),
        );

      const remainingInstallments =
        updatedSchedules.filter(
          (schedule) =>
            schedule.status !== 'PAID' &&
            schedule.status !== 'WAIVED',
        ).length;

      /**
       * ---------------------------------------------------------
       * 11. Determine whether loan is fully repaid
       * ---------------------------------------------------------
       */
      const loanClosed =
        updatedSchedules.length > 0 &&
        remainingInstallments === 0 &&
        outstanding.isZero();

      /**
       * ---------------------------------------------------------
       * 12. Close loan
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
       * 13. Return post-transaction information
       * ---------------------------------------------------------
       */
      const progressPercent =
        totalDue.gt(0)
          ? Math.min(
              100,
              Math.round(
                totalPaid
                  .div(totalDue)
                  .mul(100)
                  .toNumber(),
              ),
            )
          : 0;

      return {
        message: loanClosed
          ? 'Payment recorded — loan fully repaid!'
          : 'Payment recorded successfully',

        data: updatedTransaction,

        loanClosed,

        balance: {
          totalDue: totalDue.toString(),
          totalPaid: totalPaid.toString(),
          outstanding: outstanding.toString(),

          progressPercent,

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

    /**
     * The database uses Decimal(15,2).
     *
     * Therefore accepting more than two decimal places
     * would create ambiguity in the financial model.
     */
    const decimalPlaces =
      String(dto.amount).split('.')[1]?.length ?? 0;

    if (decimalPlaces > 2) {
      throw new BadRequestException(
        'Payment amount cannot have more than 2 decimal places',
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
    amountDue: Prisma.Decimal;
    amountPaid: Prisma.Decimal;
  },
): Prisma.Decimal {
  return Prisma.Decimal.max(
    new Prisma.Decimal(0),
    schedule.amountDue.sub(schedule.amountPaid),
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
   * This is deterministic.
   */
 private calculatePaymentAllocation(
  schedule: {
    principalAmount: Prisma.Decimal;
    interestAmount: Prisma.Decimal;
    feeAmount: Prisma.Decimal;
    penaltyAmount: Prisma.Decimal;

    principalPaid: Prisma.Decimal;
    interestPaid: Prisma.Decimal;
    feePaid: Prisma.Decimal;
    penaltyPaid: Prisma.Decimal;
  },
  paymentAmount: Prisma.Decimal,
){
    let remaining = paymentAmount;

    /**
     * Outstanding penalty.
     */
    const outstandingPenalty =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        new Prisma.Decimal(
          schedule.penaltyAmount,
        ).sub(
          new Prisma.Decimal(
            schedule.penaltyPaid,
          ),
        ),
      );

    /**
     * Outstanding fee.
     */
    const outstandingFee =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        new Prisma.Decimal(
          schedule.feeAmount,
        ).sub(
          new Prisma.Decimal(schedule.feePaid),
        ),
      );

    /**
     * Outstanding interest.
     */
    const outstandingInterest =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        new Prisma.Decimal(
          schedule.interestAmount,
        ).sub(
          new Prisma.Decimal(
            schedule.interestPaid,
          ),
        ),
      );

    /**
     * Outstanding principal.
     */
    const outstandingPrincipal =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        new Prisma.Decimal(
          schedule.principalAmount,
        ).sub(
          new Prisma.Decimal(
            schedule.principalPaid,
          ),
        ),
      );

    /**
     * Penalty first.
     */
    const penalty = Prisma.Decimal.min(
      remaining,
      outstandingPenalty,
    );

    remaining = remaining.sub(penalty);

    /**
     * Fee second.
     */
    const fee = Prisma.Decimal.min(
      remaining,
      outstandingFee,
    );

    remaining = remaining.sub(fee);

    /**
     * Interest third.
     */
    const interest = Prisma.Decimal.min(
      remaining,
      outstandingInterest,
    );

    remaining = remaining.sub(interest);

    /**
     * Principal last.
     */
    const principal = Prisma.Decimal.min(
      remaining,
      outstandingPrincipal,
    );

    remaining = remaining.sub(principal);

    const total = penalty
      .add(fee)
      .add(interest)
      .add(principal);

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
          orderBy: [
            {
              dueDate: 'asc',
            },
            {
              installmentNumber: 'asc',
            },
          ],
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
          sum.add(
            new Prisma.Decimal(
              repayment.amountDue,
            ),
          ),
        new Prisma.Decimal(0),
      );

    const totalPaid =
      loan.repayments.reduce(
        (sum, repayment) =>
          sum.add(
            new Prisma.Decimal(
              repayment.amountPaid,
            ),
          ),
        new Prisma.Decimal(0),
      );

    const outstanding =
      Prisma.Decimal.max(
        new Prisma.Decimal(0),
        totalDue.sub(totalPaid),
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
          repayment.status === 'PENDING' ||
          repayment.status ===
            'PARTIALLY_PAID' ||
          repayment.status === 'OVERDUE',
      ) ?? null;

    return {
      loanId,

      totalDue: totalDue.toString(),

      totalPaid: totalPaid.toString(),

      outstanding: outstanding.toString(),

      progressPercent:
        totalDue.gt(0)
          ? Math.min(
              100,
              Math.round(
                totalPaid
                  .div(totalDue)
                  .mul(100)
                  .toNumber(),
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
