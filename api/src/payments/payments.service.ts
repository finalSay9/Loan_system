import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    // At the top of makeRepayment, before the $transaction
const existingTx = await this.prisma.transaction.findUnique({
  where: { reference: dto.reference },
})
if (existingTx) {
  throw new ConflictException('A payment with this reference already exists')
}


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
  const amountDue = Number(schedule.amountDue)
  const amountPaid = Number(dto.amount)

  if (amountPaid < amountDue) {
    // Partial payment — record it but don't mark as fully paid
    await tx.repaymentSchedule.update({
      where: { id: schedule.id },
      data: { amountPaid },
      // status stays PENDING
    })
  } else {
    // Full payment
    await tx.repaymentSchedule.update({
      where: { id: schedule.id },
      data: { amountPaid, status: 'PAID' },
    })
  }
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

      // Check if all installments are now paid
const remainingSchedules = await tx.repaymentSchedule.count({
  where: { loanId: dto.loanId, status: 'PENDING' },
})

if (remainingSchedules === 0) {
  await tx.loan.update({
    where: { id: dto.loanId },
    data: {
      status: 'CLOSED',
      version: { increment: 1 },
    },
  })

  await tx.auditLog.create({
    data: {
      actorId: userId,
      action: 'LOAN_CLOSED',
      entityType: 'LOAN',
      entityId: dto.loanId,
      afterState: { reason: 'All installments paid' },
    },
  })
}

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
