
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
   * Record a loan repayment atomically.
   */
  async makeRepayment(
    userId: string,
    dto: { loanId: string; amount: number; reference: string },
  ) {
    if (!Number.isFinite(dto.amount) || dto.amount <= 0) {
      throw new BadRequestException(
        'Payment amount must be greater than zero',
      );
    }

    if (!dto.reference?.trim()) {
      throw new BadRequestException(
        'Payment reference is required',
      );
    }

    const reference = dto.reference.trim();

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // 1. Verify loan ownership and status inside the transaction.
        const loan = await tx.loan.findFirst({
          where: {
            id: dto.loanId,
            userId,
            status: 'DISBURSED',
          },
        });

        if (!loan) {
          throw new NotFoundException('Active loan not found');
        }

        // 2. Reject duplicate references.
        const existingTx = await tx.transaction.findUnique({
          where: { reference },
        });

        if (existingTx) {
          throw new ConflictException(
            'A payment with this reference already exists',
          );
        }

        // 3. Load unpaid installments in due-date order.
        const schedules = await tx.repaymentSchedule.findMany({
          where: {
            loanId: dto.loanId,
            status: 'PENDING',
          },
          orderBy: [
            { dueDate: 'asc' },
            { id: 'asc' },
          ],
        });

        if (schedules.length === 0) {
          throw new BadRequestException(
            'No outstanding installments found',
          );
        }

        const allSchedules = await tx.repaymentSchedule.findMany({
          where: { loanId: dto.loanId },
        });

        const totalDue = allSchedules.reduce(
          (sum, item) => sum + Number(item.amountDue),
          0,
        );

        const totalPaidBefore = allSchedules.reduce(
          (sum, item) => sum + Number(item.amountPaid),
          0,
        );

        const outstandingBefore = totalDue - totalPaidBefore;

        // This implementation rejects overpayments rather than
        // silently accepting an unallocated excess amount.
        if (dto.amount > outstandingBefore + 0.000001) {
          throw new BadRequestException(
            'Payment exceeds the outstanding loan balance',
          );
        }

        // 4. Record the payment.
        const transaction = await tx.transaction.create({
          data: {
            loanId: dto.loanId,
            type: 'REPAYMENT',
            amount: dto.amount,
            reference,
            providerRef: `MAN-${Date.now()}`,
          },
        });

        // 5. Allocate the payment to installments, oldest first.
        let unallocated = dto.amount;

        for (const schedule of schedules) {
          if (unallocated <= 0.000001) {
            break;
          }

          const amountDue = Number(schedule.amountDue);
          const alreadyPaid = Number(schedule.amountPaid);
          const installmentOutstanding = Math.max(
            0,
            amountDue - alreadyPaid,
          );

          if (installmentOutstanding <= 0) {
            continue;
          }

          const allocation = Math.min(
            unallocated,
            installmentOutstanding,
          );

          const newAmountPaid = alreadyPaid + allocation;
          const fullyPaid =
            newAmountPaid >= amountDue - 0.000001;

          await tx.repaymentSchedule.update({
            where: { id: schedule.id },
            data: {
              amountPaid: fullyPaid
                ? schedule.amountDue
                : newAmountPaid,
              status: fullyPaid ? 'PAID' : 'PENDING',
            },
          });

          unallocated -= allocation;
        }

        // 6. Write the repayment audit record.
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

        // 7. Recalculate the balance from persisted installment data.
        const updatedSchedules =
          await tx.repaymentSchedule.findMany({
            where: { loanId: dto.loanId },
            orderBy: { dueDate: 'asc' },
          });

        const updatedTotalDue = updatedSchedules.reduce(
          (sum, item) => sum + Number(item.amountDue),
          0,
        );

        const updatedTotalPaid = updatedSchedules.reduce(
          (sum, item) => sum + Number(item.amountPaid),
          0,
        );

        const outstanding = Math.max(
          0,
          updatedTotalDue - updatedTotalPaid,
        );

        const remainingInstallments = updatedSchedules.filter(
          (item) => item.status !== 'PAID',
        ).length;

        const loanClosed =
          remainingInstallments === 0 && outstanding <= 0.000001;

        // 8. Close the loan only when a non-empty schedule is fully paid.
        if (loanClosed && updatedSchedules.length > 0) {
          await tx.loan.update({
            where: { id: dto.loanId },
            data: {
              status: 'CLOSED',
              version: { increment: 1 },
            },
          });

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
                    (updatedTotalPaid / updatedTotalDue) * 100,
                  )
                : 0,
            remainingInstallments,
          },
        };
      });

      // 9. Notify connected clients only after commit succeeds.
      this.events.emitPaymentUpdate(
        userId,
        dto.loanId,
        result.balance,
      );

      return result;
    } catch (error) {
      // Translate a concurrent duplicate-reference insert into HTTP 409.
      // Prisma P2002 means a unique constraint was violated.
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A payment with this reference already exists',
        );
      }

      throw error;
    }
  }
}