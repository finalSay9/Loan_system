import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}


  /**
   * make payments
   * now
   */
  async makeRepayment(
    userId: string,
    dto: { loanId: string; amount: number; reference: string },
  ) {
    const loan = await this.prisma.loan.findFirst({
      where: { id: dto.loanId, userId, status: 'DISBURSED' },
    });
    if (!loan) throw new NotFoundException('Active loan not found');

    return this.prisma.$transaction(async (tx) => {
      // Record the transaction
      const transaction = await tx.transaction.create({
        data: {
          loanId: dto.loanId,
          type: 'REPAYMENT',
          amount: dto.amount,
          reference: dto.reference,
          providerRef: `MAN-${Date.now()}`,
        },
      });

      // Find the earliest unpaid schedule
      const schedule = await tx.repaymentSchedule.findFirst({
        where: { loanId: dto.loanId, status: 'PENDING' },
        orderBy: { dueDate: 'asc' },
      });

      if (schedule) {
        await tx.repaymentSchedule.update({
          where: { id: schedule.id },
          data: { amountPaid: dto.amount, status: 'PAID' },
        });
      }

      await tx.auditLog.create({
        data: {
          actorId: userId,
          action: 'LOAN_REPAYMENT',
          entityType: 'LOAN',
          entityId: dto.loanId,
          afterState: { amount: dto.amount, reference: dto.reference },
        },
      });

      return { message: 'Payment recorded successfully', data: transaction };
    });
  }

  async getMyTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { loan: { userId } },
      include: { loan: { select: { purpose: true, amount: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
