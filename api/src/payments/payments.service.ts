
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
   * Make a loan repayment.
   *
   * The payment, repayment schedule updates,
   * audit logs, and loan closure happen atomically.
   *
   * The WebSocket event is emitted only after
   * the transaction successfully commits.
   */
  async makeRepayment(
    userId: string,
    dto: {
      loanId: string;
      amount: number;
      reference: string;
    },
  ) {
    // Validate payment amount
    if (!Number.isFinite(dto.amount) || dto.amount <= 0) {
      throw new BadRequestException(
        'Payment amount must be greater than zero',
      );
    }

    // Validate payment reference
    if (!dto.reference?.trim()) {
      throw new BadRequestException(
        'Payment reference is required',
      );
    }

    const reference = dto.reference.trim();

    /*
     * Everything that changes financial state belongs
     * inside one database transaction.
     */
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Find the user's active loan
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

      // 2. Check whether this payment reference
      // has already been processed.
      const existingTx = await tx.transaction.findUnique({
        where: {
          reference,
        },
      });

      if (existingTx) {
        throw new ConflictException(
          'A payment with this reference already exists',
        );
      }

      // 3. Get pending repayment schedules
      // oldest installment first.
      const schedules = await tx.repaymentSchedule.findMany({
        where: {
          loanId: dto.loanId,
          status: 'PENDING',
        },
        orderBy: [
          {
            dueDate: 'asc',
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

      // 4. Get all schedules so we can calculate
      // the current outstanding balance.
      const allSchedules =
        await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
          },
        });

      const totalDue = allSchedules.reduce(
        (sum, schedule) =>
          sum + Number(schedule.amountDue),
        0,
      );

      const totalPaidBefore = allSchedules.reduce(
        (sum, schedule) =>
          sum + Number(schedule.amountPaid),
        0,
      );

      const outstandingBefore =
        totalDue - totalPaidBefore;

      // Prevent overpayment.
      if (
        dto.amount >
        outstandingBefore + 0.000001
      ) {
        throw new BadRequestException(
          'Payment exceeds the outstanding loan balance',
        );
      }

      // 5. Record the payment transaction
      const transaction = await tx.transaction.create({
        data: {
          loanId: dto.loanId,
          type: 'REPAYMENT',
          amount: dto.amount,
          reference,
          providerRef: `MAN-${Date.now()}`,
        },
      });

      // 6. Allocate payment across installments.
      //
      // Example:
      //
      // Installment 1 = 500
      // Installment 2 = 500
      //
      // User pays 700
      //
      // Installment 1 = PAID (500)
      // Installment 2 = 200
      //
      let remainingPayment = dto.amount;

      for (const schedule of schedules) {
        if (remainingPayment <= 0.000001) {
          break;
        }

        const amountDue = Number(
          schedule.amountDue,
        );

        const alreadyPaid = Number(
          schedule.amountPaid,
        );

        const installmentOutstanding = Math.max(
          0,
          amountDue - alreadyPaid,
        );

        if (installmentOutstanding <= 0) {
          continue;
        }

        const amountAllocated = Math.min(
          remainingPayment,
          installmentOutstanding,
        );

        const newAmountPaid =
          alreadyPaid + amountAllocated;

        const fullyPaid =
          newAmountPaid >=
          amountDue - 0.000001;

        await tx.repaymentSchedule.update({
          where: {
            id: schedule.id,
          },
          data: {
            amountPaid: fullyPaid
              ? schedule.amountDue
              : newAmountPaid,

            status: fullyPaid
              ? 'PAID'
              : 'PENDING',
          },
        });

        remainingPayment -= amountAllocated;
      }

      // 7. Create repayment audit log
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

      // 8. Get updated repayment schedules
      const updatedSchedules =
        await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
          },
          orderBy: {
            dueDate: 'asc',
          },
        });

      // 9. Calculate updated balance
      const updatedTotalDue =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum + Number(schedule.amountDue),
          0,
        );

      const updatedTotalPaid =
        updatedSchedules.reduce(
          (sum, schedule) =>
            sum + Number(schedule.amountPaid),
          0,
        );

      const outstanding = Math.max(
        0,
        updatedTotalDue - updatedTotalPaid,
      );

      // 10. Count remaining unpaid installments
      const remainingInstallments =
        updatedSchedules.filter(
          (schedule) =>
            schedule.status !== 'PAID',
        ).length;

      // 11. Determine whether the loan is fully paid
      const loanClosed =
        updatedSchedules.length > 0 &&
        remainingInstallments === 0 &&
        outstanding <= 0.000001;

      // 12. Close the loan if everything has been paid
      if (loanClosed) {
        await tx.loan.update({
          where: {
            id: dto.loanId,
          },

          data: {
            status: 'CLOSED',
            version: {
              increment: 1,
            },
          },
        });

        // Audit loan closure
        await tx.auditLog.create({
          data: {
            actorId: userId,
            action: 'LOAN_CLOSED',
            entityType: 'LOAN',
            entityId: dto.loanId,

            afterState: {
              reason: 'All installments paid',
            },
          },
        });
      }

      // 13. Return everything we need AFTER
      // the transaction commits.
      return {
        message: loanClosed
          ? 'Payment recorded — loan fully repaid!'
          : 'Payment recorded successfully',

        data: transaction,

        loanClosed,

        balance: {
          totalDue: updatedTotalDue,

          totalPaid: updatedTotalPaid,

          outstanding,

          progressPercent:
            updatedTotalDue > 0
              ? Math.round(
                  (updatedTotalPaid /
                    updatedTotalDue) *
                    100,
                )
              : 0,

          remainingInstallments,
        },
      };
    });

    /*
     * IMPORTANT:
     *
     * This happens AFTER the database transaction
     * successfully commits.
     *
     * If the transaction failed/rolled back,
     * this event will never be emitted.
     */
    this.events.emitPaymentUpdate(
      userId,
      dto.loanId,
      result.balance,
    );

    return result;
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
            purpose: true,
            amount: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get the repayment balance
   * for a specific loan.
   */
  async getLoanBalance(
    userId: string,
    loanId: string,
  ) {
    // Confirm that the loan belongs
    // to the authenticated user.
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

    // Calculate total amount that should
    // be paid across all installments.
    const totalDue = loan.repayments.reduce(
      (sum, repayment) =>
        sum + Number(repayment.amountDue),
      0,
    );

    // Calculate total amount actually paid.
    const totalPaid = loan.repayments.reduce(
      (sum, repayment) =>
        sum + Number(repayment.amountPaid),
      0,
    );

    // Remaining balance
    const outstanding =
      totalDue - totalPaid;

    // Number of completely paid installments
    const paidInstallments =
      loan.repayments.filter(
        (repayment) =>
          repayment.status === 'PAID',
      ).length;

    // Total number of installments
    const totalInstallments =
      loan.repayments.length;

    // Find the next unpaid installment
    const nextInstallment =
      loan.repayments.find(
        (repayment) =>
          repayment.status === 'PENDING',
      ) ?? null;

    return {
      loanId,

      totalDue,

      totalPaid,

      outstanding,

      progressPercent:
        totalDue > 0
          ? Math.round(
              (totalPaid / totalDue) *
                100,
            )
          : 0,

      paidInstallments,

      totalInstallments,

      nextInstallment,

      schedule: loan.repayments,
    };
  }
}

