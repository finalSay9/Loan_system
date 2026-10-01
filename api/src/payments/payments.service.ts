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
  // 1. Record the transaction
  const transaction = await tx.transaction.create({
    data: {
      loanId: dto.loanId,
      type: 'REPAYMENT',
      amount: dto.amount,
      reference: dto.reference,
      providerRef: `MAN-${Date.now()}`,
    },
  })

  // 2. Find earliest unpaid installment
  const schedule = await tx.repaymentSchedule.findFirst({
    where: { loanId: dto.loanId, status: 'PENDING' },
    orderBy: { dueDate: 'asc' },
  })

  if (schedule) {
    const amountDue = Number(schedule.amountDue)
    const amountPaid = Number(dto.amount)

    await tx.repaymentSchedule.update({
      where: { id: schedule.id },
      data: {
        amountPaid,
        status: amountPaid >= amountDue ? 'PAID' : 'PENDING',
      },
    })
  }

  // 3. Audit log
  await tx.auditLog.create({
    data: {
      actorId: userId,
      action: 'LOAN_REPAYMENT',
      entityType: 'LOAN',
      entityId: dto.loanId,
      afterState: { amount: dto.amount, reference: dto.reference },
    },
  })

  // 4. Check remaining installments
  const remaining = await tx.repaymentSchedule.count({
    where: { loanId: dto.loanId, status: 'PENDING' },
  })

  // 5. Close loan if fully paid
  if (remaining === 0) {
    await tx.loan.update({
      where: { id: dto.loanId },
      data: { status: 'CLOSED', version: { increment: 1 } },
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

  // 6. Calculate updated balance
  const updatedSchedules = await tx.repaymentSchedule.findMany({
    where: { loanId: dto.loanId },
    orderBy: { dueDate: 'asc' },
  })

  const totalDue = updatedSchedules.reduce((s, r) => s + Number(r.amountDue), 0)
  const totalPaid = updatedSchedules.reduce((s, r) => s + Number(r.amountPaid), 0)
  const outstanding = totalDue - totalPaid

  return {
    message: remaining === 0
      ? 'Payment recorded — loan fully repaid!'
      : 'Payment recorded successfully',
    data: transaction,
    loanClosed: remaining === 0,
    balance: {
      totalDue,
      totalPaid,
      outstanding,
      progressPercent: Math.round((totalPaid / totalDue) * 100),
      remainingInstallments: remaining,
    },
  }
})
  }

  async getMyTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { loan: { userId } },
      include: { loan: { select: { purpose: true, amount: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * getting the loan
   * balance
   */
  async getLoanBalance(userId: string, loanId: string) {
    //confirm loan belong to the user
    const loan = await this.prisma.loan.findFirst({
      where: {id: loanId, userId},
      include: {
        repayments: {
          orderBy: {dueDate: "asc"}
        }
      }
    })

    if(!loan) {
      throw new NotFoundException("loan not found")
    };

    const totalDue = loan.repayments.reduce(
      (s, r) => s + Number(r.amountDue), 0
    )

    const totalPaid = loan.repayments.reduce(
      (s, r) => s + Number(r.amountPaid), 0
    )

    const outstanding = totalDue - totalPaid;
    const paidInstallments = loan.repayments.filter(r => r.status === "PAID").length;
    const totalInstallments = loan.repayments.length;
    const nextInstallment = loan.repayments.find(r => r.status === "PENDING") ?? null;

    return {
    loanId,
    totalDue,
    totalPaid,
    outstanding,
    progressPercent: totalDue > 0 ? Math.round((totalPaid / totalDue) * 100) : 0,
    paidInstallments,
    totalInstallments,
    nextInstallment,
    schedule: loan.repayments,
  }

  }



}
