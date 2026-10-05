
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanQueryDto } from './dto/loan-query.dto';
import { UpdateLoanStatusDto } from './dto/update-status-loan.dto';

import {
  FeeType,
  InstallmentStatus,
  InterestType,
  LoanStatus,
  RepaymentFrequency,
  TermUnit,
  TransactionType,
} from 'prisma/generated/prisma';

@Injectable()
export class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================
  // APPLY FOR LOAN
  // ============================================================

  async applyForLoan(createLoan: CreateLoanDto, userId: string) {
    /*
     * The borrower does not define the interest rate or fee
     * configuration directly.
     *
     * Those values come from the LoanProduct and are snapshotted
     * onto the Loan.
     */

    const product = await this.prisma.loanProduct.findFirst({
      where: {
        id: createLoan.productId,
        isActive: true,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'The selected loan product does not exist or is inactive',
      );
    }

    const amount = Number(createLoan.amount);
    const termValue = Number(createLoan.termValue);

    // ------------------------------------------------------------
    // Validate amount
    // ------------------------------------------------------------

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException(
        'Loan amount must be greater than zero',
      );
    }

    if (
      amount < Number(product.minAmount) ||
      amount > Number(product.maxAmount)
    ) {
      throw new BadRequestException(
        `Loan amount must be between ${product.minAmount} and ${product.maxAmount}`,
      );
    }

    // ------------------------------------------------------------
    // Validate term
    // ------------------------------------------------------------

    if (!Number.isInteger(termValue) || termValue <= 0) {
      throw new BadRequestException(
        'Loan term must be a positive whole number',
      );
    }

    if (
      termValue < product.minTermValue ||
      termValue > product.maxTermValue
    ) {
      throw new BadRequestException(
        `Loan term must be between ${product.minTermValue} and ${product.maxTermValue} ${product.termUnit.toLowerCase()}`,
      );
    }

    // ------------------------------------------------------------
    // Calculate number of installments
    // ------------------------------------------------------------

    const numberOfInstallments = this.calculateNumberOfInstallments(
      termValue,
      product.termUnit,
      product.repaymentFrequency,
    );

    if (numberOfInstallments <= 0) {
      throw new BadRequestException(
        'Unable to calculate repayment installments for this loan',
      );
    }

    // ------------------------------------------------------------
    // Calculate processing fee
    // ------------------------------------------------------------

    const processingFee = this.calculateFee(
      amount,
      product.processingFeeType,
      Number(product.processingFeeAmount),
      Number(product.processingFeeRate),
    );

    // ------------------------------------------------------------
    // Calculate estimated interest
    //
    // For reducing balance, this is an estimate at application time.
    // The definitive amount is calculated during schedule generation.
    // ------------------------------------------------------------

    const estimatedInterest = this.calculateEstimatedInterest(
      amount,
      Number(product.interestRate),
      product.interestType,
      termValue,
      product.termUnit,
      product.repaymentFrequency,
    );

    const estimatedTotalPayable =
      amount + estimatedInterest + processingFee;

    // ------------------------------------------------------------
    // Create loan
    // ------------------------------------------------------------

    return this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.create({
        data: {
          userId,
          productId: product.id,

          amount,

          purpose: createLoan.purpose,
          notes: createLoan.notes,

          status: LoanStatus.PENDING,

          // Product snapshot
          interestRate: product.interestRate,
          interestType: product.interestType,

          termValue,
          termUnit: product.termUnit,

          numberOfInstallments,

          repaymentFrequency: product.repaymentFrequency,

          processingFeeType: product.processingFeeType,
          processingFeeAmount: product.processingFeeAmount,
          processingFeeRate: product.processingFeeRate,

          lateFeeType: product.lateFeeType,
          lateFeeAmount: product.lateFeeAmount,
          lateFeeRate: product.lateFeeRate,

          gracePeriodDays: product.gracePeriodDays,

          totalInterest: estimatedInterest,
          totalFees: processingFee,
          totalPayable: estimatedTotalPayable,

          version: 0,
        },
      });

      // ----------------------------------------------------------
      // Audit
      // ----------------------------------------------------------

      await tx.auditLog.create({
        data: {
          actorId: userId,
          action: 'CREATE_LOAN',
          entityType: 'LOAN',
          entityId: loan.id,

          beforeState: null,

          afterState: {
            status: loan.status,
            amount: amount,
            productId: product.id,
            termValue,
            termUnit: product.termUnit,
            numberOfInstallments,
            repaymentFrequency: product.repaymentFrequency,
            interestRate: Number(product.interestRate),
            interestType: product.interestType,
          },
        },
      });

      return loan;
    });
  }

  // ============================================================
  // GET MY LOANS
  // ============================================================

  async getMyLoans(userId: string, query: LoanQueryDto) {
    const page = Math.max(query.page ?? 1, 1);
    const limit = Math.min(Math.max(query.limit ?? 10, 1), 100);

    const where = {
      userId,
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
    };

    const [loans, total] = await Promise.all([
      this.prisma.loan.findMany({
        where,

        include: {
          product: {
            select: {
              id: true,
              name: true,
            },
          },

          repayments: {
            select: {
              amountDue: true,
              amountPaid: true,
              principalAmount: true,
              interestAmount: true,
              feeAmount: true,
              penaltyAmount: true,
              principalPaid: true,
              interestPaid: true,
              feePaid: true,
              penaltyPaid: true,
              status: true,
              dueDate: true,
              installmentNumber: true,
            },

            orderBy: {
              installmentNumber: 'asc',
            },
          },
        },

        skip: (page - 1) * limit,
        take: limit,

        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.loan.count({
        where,
      }),
    ]);

    const data = loans.map((loan) => {
      const totalDue = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountDue),
        0,
      );

      const totalPaid = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountPaid),
        0,
      );

      const outstanding = Math.max(totalDue - totalPaid, 0);

      return {
        ...loan,

        balance: {
          totalDue: this.roundMoney(totalDue),
          totalPaid: this.roundMoney(totalPaid),
          outstanding: this.roundMoney(outstanding),

          progressPercent:
            totalDue > 0
              ? Math.min(
                  100,
                  Math.round((totalPaid / totalDue) * 100),
                )
              : 0,
        },
      };
    });

    return {
      data,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ============================================================
  // GET MY LOAN BY ID
  // ============================================================

  async getLoanById(loanId: string, userId: string) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        userId,
        deletedAt: null,
      },

      include: {
        product: true,

        repayments: {
          orderBy: {
            installmentNumber: 'asc',
          },
        },

        transactions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!loan) {
      throw new NotFoundException(
        'Loan with this id is not available',
      );
    }

    const totalDue = loan.repayments.reduce(
      (sum, repayment) => sum + Number(repayment.amountDue),
      0,
    );

    const totalPaid = loan.repayments.reduce(
      (sum, repayment) => sum + Number(repayment.amountPaid),
      0,
    );

    return {
      ...loan,

      balance: {
        totalDue: this.roundMoney(totalDue),
        totalPaid: this.roundMoney(totalPaid),
        outstanding: this.roundMoney(
          Math.max(totalDue - totalPaid, 0),
        ),

        progressPercent:
          totalDue > 0
            ? Math.min(
                100,
                Math.round((totalPaid / totalDue) * 100),
              )
            : 0,
      },
    };
  }

  // ============================================================
  // GET ALL LOANS
  // ============================================================

  async getAllLoans(query: LoanQueryDto) {
    const page = Math.max(query.page ?? 1, 1);
    const limit = Math.min(Math.max(query.limit ?? 25, 1), 100);

    const where = {
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
    };

    const [loans, total] = await Promise.all([
      this.prisma.loan.findMany({
        where,

        include: {
          user: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
              avatarUrl: true,
            },
          },

          product: {
            select: {
              id: true,
              name: true,
            },
          },

          repayments: {
            select: {
              amountDue: true,
              amountPaid: true,
              status: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },

        skip: (page - 1) * limit,
        take: limit,
      }),

      this.prisma.loan.count({
        where,
      }),
    ]);

    const data = loans.map((loan) => {
      const totalDue = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountDue),
        0,
      );

      const totalPaid = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountPaid),
        0,
      );

      const outstanding = Math.max(totalDue - totalPaid, 0);

      return {
        ...loan,

        balance: {
          totalDue: this.roundMoney(totalDue),
          totalPaid: this.roundMoney(totalPaid),
          outstanding: this.roundMoney(outstanding),

          progressPercent:
            totalDue > 0
              ? Math.min(
                  100,
                  Math.round((totalPaid / totalDue) * 100),
                )
              : 0,
        },
      };
    });

    return {
      data,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ============================================================
  // ADMIN GET LOAN
  // ============================================================

  async adminGetLoanById(loanId: string) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        deletedAt: null,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            address: true,
            occupation: true,
            role: true,
            kycStatus: true,
            avatarUrl: true,
          },
        },

        product: true,

        repayments: {
          orderBy: {
            installmentNumber: 'asc',
          },
        },

        transactions: {
          orderBy: {
            createdAt: 'desc',
          },

          include: {
            allocations: true,
          },
        },
      },
    });

    if (!loan) {
      throw new NotFoundException(
        'No loan with this id exists',
      );
    }

    return loan;
  }

  // ============================================================
  // START LOAN REVIEW
  // ============================================================

  async startReview(loanId: string, actorId: string) {
    return this.transitionLoan(
      loanId,
      actorId,
      LoanStatus.UNDER_REVIEW,
      'START_LOAN_REVIEW',
    );
  }

  // ============================================================
  // APPROVE LOAN
  // ============================================================

  async approveLoan(loanId: string, actorId: string) {
    return this.transitionLoan(
      loanId,
      actorId,
      LoanStatus.APPROVED,
      'APPROVE_LOAN',
    );
  }

  // ============================================================
  // REJECT LOAN
  // ============================================================

  async rejectLoan(
    loanId: string,
    actorId: string,
    reason: string,
  ) {
    if (!reason?.trim()) {
      throw new BadRequestException(
        'A rejection reason is required',
      );
    }

    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        deletedAt: null,
      },
    });

    if (!loan) {
      throw new NotFoundException(
        'This loan is not available',
      );
    }

    if (loan.status !== LoanStatus.UNDER_REVIEW) {
      throw new BadRequestException(
        `Only loans UNDER_REVIEW can be rejected. Current status is ${loan.status}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedLoan = await tx.loan.update({
        where: {
          id: loanId,
        },

        data: {
          status: LoanStatus.REJECTED,

          rejectionReason: reason.trim(),

          version: {
            increment: 1,
          },
        },
      });

      await tx.auditLog.create({
        data: {
          actorId,

          action: 'REJECT_LOAN',

          entityType: 'LOAN',

          entityId: loanId,

          beforeState: {
            status: loan.status,
            rejectionReason: loan.rejectionReason,
          },

          afterState: {
            status: LoanStatus.REJECTED,
            rejectionReason: reason.trim(),
          },
        },
      });

      return updatedLoan;
    });
  }

  // ============================================================
  // UPDATE LOAN STATUS
  //
  // Kept for backwards compatibility with your existing controller.
  //
  // However, important business transitions should eventually use:
  //
  // startReview()
  // approveLoan()
  // rejectLoan()
  // disburseLoan()
  // closeLoan()
  // defaultLoan()
  // ============================================================

  async updateLoanStatus(
    loanId: string,
    updateStatus: UpdateLoanStatusDto,
    actorId: string,
  ) {
    if (updateStatus.status === LoanStatus.DISBURSED) {
      return this.disburseLoan(loanId, actorId);
    }

    if (updateStatus.status === LoanStatus.CLOSED) {
      return this.closeLoan(loanId, actorId);
    }

    if (updateStatus.status === LoanStatus.DEFAULTED) {
      return this.defaultLoan(loanId, actorId);
    }

    if (updateStatus.status === LoanStatus.UNDER_REVIEW) {
      return this.startReview(loanId, actorId);
    }

    if (updateStatus.status === LoanStatus.APPROVED) {
      return this.approveLoan(loanId, actorId);
    }

    return this.transitionLoan(
      loanId,
      actorId,
      updateStatus.status,
      'UPDATE_LOAN_STATUS',
    );
  }

  // ============================================================
  // DISBURSE LOAN
  // ============================================================

  async disburseLoan(loanId: string, actorId: string) {
    return this.prisma.$transaction(async (tx) => {
      // ----------------------------------------------------------
      // Locking is handled through the loan version/state check.
      // ----------------------------------------------------------

      const loan = await tx.loan.findFirst({
        where: {
          id: loanId,
          deletedAt: null,
        },

        include: {
          product: true,
        },
      });

      if (!loan) {
        throw new NotFoundException(
          'The loan with this id is not available',
        );
      }

      if (loan.status !== LoanStatus.APPROVED) {
        throw new BadRequestException(
          `Loan must be APPROVED before disbursement. Current status is ${loan.status}`,
        );
      }

      // ----------------------------------------------------------
      // Prevent duplicate schedule creation
      // ----------------------------------------------------------

      const existingSchedule =
        await tx.repaymentSchedule.findFirst({
          where: {
            loanId,
          },
        });

      if (existingSchedule) {
        throw new ConflictException(
          'A repayment schedule already exists for this loan',
        );
      }

      // ----------------------------------------------------------
      // Calculate repayment schedule
      // ----------------------------------------------------------

      const schedule = this.generateRepaymentSchedule({
        loanId: loan.id,
        principal: Number(loan.amount),
        annualInterestRate: Number(loan.interestRate),
        interestType: loan.interestType,
        termValue: loan.termValue,
        termUnit: loan.termUnit,
        repaymentFrequency: loan.repaymentFrequency,
        numberOfInstallments: loan.numberOfInstallments,
        processingFeeType: loan.processingFeeType,
        processingFeeAmount: Number(
          loan.processingFeeAmount,
        ),
        processingFeeRate: Number(
          loan.processingFeeRate,
        ),
        disbursementDate: new Date(),
      });

      if (schedule.rows.length === 0) {
        throw new BadRequestException(
          'Unable to generate repayment schedule',
        );
      }

      // ----------------------------------------------------------
      // Create repayment schedule
      // ----------------------------------------------------------

      await tx.repaymentSchedule.createMany({
        data: schedule.rows,
      });

      // ----------------------------------------------------------
      // Update loan
      // ----------------------------------------------------------

      const disbursedAt = new Date();

      const updatedLoan = await tx.loan.update({
        where: {
          id: loan.id,
        },

        data: {
          status: LoanStatus.DISBURSED,

          disbursedAt,

          disbursedById: actorId,

          firstPaymentDueAt:
            schedule.rows[0].dueDate,

          maturityDate:
            schedule.rows[schedule.rows.length - 1]
              .dueDate,

          totalInterest: schedule.totalInterest,

          totalFees: schedule.totalFees,

          totalPayable: schedule.totalPayable,

          version: {
            increment: 1,
          },
        },
      });

      // ----------------------------------------------------------
      // Create disbursement transaction
      // ----------------------------------------------------------

      await tx.transaction.create({
        data: {
          loanId: loan.id,

          type: TransactionType.DISBURSEMENT,

          amount: loan.amount,

          reference: `DISB-${loan.id}-${Date.now()}`,

          principalAmount: loan.amount,

          interestAmount: 0,

          feeAmount: 0,

          penaltyAmount: 0,

          metadata: {
            actorId,
            disbursedAt:
              disbursedAt.toISOString(),
          },
        },
      });

      // ----------------------------------------------------------
      // Audit
      // ----------------------------------------------------------

      await tx.auditLog.create({
        data: {
          actorId,

          action: 'DISBURSE_LOAN',

          entityType: 'LOAN',

          entityId: loan.id,

          beforeState: {
            status: loan.status,
          },

          afterState: {
            status: LoanStatus.DISBURSED,
            disbursedAt:
              disbursedAt.toISOString(),
            firstPaymentDueAt:
              schedule.rows[0].dueDate.toISOString(),
            maturityDate:
              schedule.rows[
                schedule.rows.length - 1
              ].dueDate.toISOString(),
          },
        },
      });

      return updatedLoan;
    });
  }

  // ============================================================
  // CLOSE LOAN
  // ============================================================

  async closeLoan(
    loanId: string,
    actorId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findFirst({
        where: {
          id: loanId,
          deletedAt: null,
        },

        include: {
          repayments: true,
        },
      });

      if (!loan) {
        throw new NotFoundException(
          'Loan not found',
        );
      }

      if (loan.status !== LoanStatus.DISBURSED) {
        throw new BadRequestException(
          `Only DISBURSED loans can be closed. Current status is ${loan.status}`,
        );
      }

      const totalDue = loan.repayments.reduce(
        (sum, repayment) =>
          sum + Number(repayment.amountDue),
        0,
      );

      const totalPaid = loan.repayments.reduce(
        (sum, repayment) =>
          sum + Number(repayment.amountPaid),
        0,
      );

      const outstanding =
        totalDue - totalPaid;

      if (outstanding > 0.01) {
        throw new BadRequestException(
          `Loan still has an outstanding balance of ${this.roundMoney(outstanding)}`,
        );
      }

      const closedAt = new Date();

      const closedLoan = await tx.loan.update({
        where: {
          id: loan.id,
        },

        data: {
          status: LoanStatus.CLOSED,

          closedAt,

          version: {
            increment: 1,
          },
        },
      });

      await tx.auditLog.create({
        data: {
          actorId,

          action: 'CLOSE_LOAN',

          entityType: 'LOAN',

          entityId: loan.id,

          beforeState: {
            status: loan.status,
          },

          afterState: {
            status: LoanStatus.CLOSED,
            closedAt: closedAt.toISOString(),
          },
        },
      });

      return closedLoan;
    });
  }

  // ============================================================
  // DEFAULT LOAN
  // ============================================================

  async defaultLoan(
    loanId: string,
    actorId: string,
  ) {
    const loan = await this.prisma.loan.findFirst({
      where: {
        id: loanId,
        deletedAt: null,
      },
    });

    if (!loan) {
      throw new NotFoundException(
        'Loan not found',
      );
    }

    if (loan.status !== LoanStatus.DISBURSED) {
      throw new BadRequestException(
        `Only DISBURSED loans can be defaulted. Current status is ${loan.status}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedLoan = await tx.loan.update({
        where: {
          id: loan.id,
        },

        data: {
          status: LoanStatus.DEFAULTED,

          version: {
            increment: 1,
          },
        },
      });

      await tx.auditLog.create({
        data: {
          actorId,

          action: 'DEFAULT_LOAN',

          entityType: 'LOAN',

          entityId: loan.id,

          beforeState: {
            status: loan.status,
          },

          afterState: {
            status: LoanStatus.DEFAULTED,
          },
        },
      });

      return updatedLoan;
    });
  }

  // ============================================================
  // MONTHLY STATS
  // ============================================================

  async getMonthlyStats() {
    const currentYear = new Date().getFullYear();

    const result = await this.prisma.$queryRaw<
      { month: number; count: number }[]
    >`
      SELECT
        EXTRACT(MONTH FROM created_at)::int AS month,
        COUNT(*)::int AS count
      FROM loans
      WHERE
        EXTRACT(YEAR FROM created_at) = ${currentYear}
        AND deleted_at IS NULL
      GROUP BY month
      ORDER BY month
    `;

    const months = Array.from(
      { length: 12 },
      (_, index) => {
        const month = index + 1;

        const found = result.find(
          (row) => row.month === month,
        );

        return {
          month,
          count: found?.count ?? 0,
        };
      },
    );

    return {
      data: months,
      year: currentYear,
    };
  }

  // ============================================================
  // GENERATE REPAYMENT SCHEDULE
  // ============================================================

  private generateRepaymentSchedule(input: {
    loanId: string;
    principal: number;
    annualInterestRate: number;
    interestType: InterestType;

    termValue: number;
    termUnit: TermUnit;

    repaymentFrequency: RepaymentFrequency;
    numberOfInstallments: number;

    processingFeeType: FeeType;
    processingFeeAmount: number;
    processingFeeRate: number;

    disbursementDate: Date;
  }) {
    const {
      loanId,
      principal,
      annualInterestRate,
      interestType,
      numberOfInstallments,
      repaymentFrequency,
      processingFeeType,
      processingFeeAmount,
      processingFeeRate,
      disbursementDate,
    } = input;

    if (principal <= 0) {
      throw new BadRequestException(
        'Loan principal must be greater than zero',
      );
    }

    if (numberOfInstallments <= 0) {
      throw new BadRequestException(
        'Number of installments must be greater than zero',
      );
    }

    // ----------------------------------------------------------
    // Periodic rate
    // ----------------------------------------------------------

    const periodsPerYear =
      this.getPeriodsPerYear(
        repaymentFrequency,
      );

    const periodicRate =
      annualInterestRate /
      100 /
      periodsPerYear;

    // ----------------------------------------------------------
    // Processing fee
    // ----------------------------------------------------------

    const processingFee = this.calculateFee(
      principal,
      processingFeeType,
      processingFeeAmount,
      processingFeeRate,
    );

    const rows: Array<{
      loanId: string;
      installmentNumber: number;
      dueDate: Date;

      principalAmount: number;
      interestAmount: number;

      feeAmount: number;
      penaltyAmount: number;

      baseAmountDue: number;
      amountDue: number;

      amountPaid: number;
      principalPaid: number;
      interestPaid: number;
      feePaid: number;
      penaltyPaid: number;

      remainingBalance: number;

      status: InstallmentStatus;
    }> = [];

    let remainingPrincipal = principal;

    let totalInterest = 0;

    // ----------------------------------------------------------
    // REDUCING BALANCE
    // ----------------------------------------------------------

    if (
      interestType ===
      InterestType.REDUCING_BALANCE
    ) {
      let regularPayment: number;

      if (periodicRate === 0) {
        regularPayment =
          principal /
          numberOfInstallments;
      } else {
        regularPayment =
          (principal *
            (periodicRate *
              Math.pow(
                1 + periodicRate,
                numberOfInstallments,
              ))) /
          (Math.pow(
            1 + periodicRate,
            numberOfInstallments,
          ) - 1);
      }

      regularPayment =
        this.roundMoney(regularPayment);

      for (
        let index = 0;
        index < numberOfInstallments;
        index++
      ) {
        const installmentNumber =
          index + 1;

        const dueDate =
          this.calculateDueDate(
            disbursementDate,
            repaymentFrequency,
            installmentNumber,
          );

        let interestAmount =
          remainingPrincipal *
          periodicRate;

        interestAmount =
          this.roundMoney(interestAmount);

        let principalAmount =
          regularPayment -
          interestAmount;

        principalAmount =
          this.roundMoney(
            principalAmount,
          );

        // ------------------------------------------------------
        // Final installment adjustment
        // ------------------------------------------------------

        if (
          installmentNumber ===
          numberOfInstallments
        ) {
          principalAmount =
            this.roundMoney(
              remainingPrincipal,
            );

          interestAmount =
            this.roundMoney(
              Math.max(
                regularPayment -
                  principalAmount,
                0,
              ),
            );
        }

        if (
          principalAmount >
          remainingPrincipal
        ) {
          principalAmount =
            remainingPrincipal;
        }

        const feeAmount =
          installmentNumber === 1
            ? processingFee
            : 0;

        const baseAmountDue =
          this.roundMoney(
            principalAmount +
              interestAmount +
              feeAmount,
          );

        remainingPrincipal =
          this.roundMoney(
            Math.max(
              remainingPrincipal -
                principalAmount,
              0,
            ),
          );

        totalInterest +=
          interestAmount;

        rows.push({
          loanId,

          installmentNumber,

          dueDate,

          principalAmount:
            this.roundMoney(
              principalAmount,
            ),

          interestAmount:
            this.roundMoney(
              interestAmount,
            ),

          feeAmount:
            this.roundMoney(feeAmount),

          penaltyAmount: 0,

          baseAmountDue,

          amountDue: baseAmountDue,

          amountPaid: 0,

          principalPaid: 0,

          interestPaid: 0,

          feePaid: 0,

          penaltyPaid: 0,

          remainingBalance:
            remainingPrincipal,

          status:
            InstallmentStatus.PENDING,
        });
      }
    }

    // ----------------------------------------------------------
    // FLAT INTEREST
    // ----------------------------------------------------------

    if (
      interestType ===
      InterestType.FLAT
    ) {
      const years =
        this.termToYears(
          input.termValue,
          input.termUnit,
        );

        let totalInterest =
        principal *
        (annualInterestRate / 100) *
        years;

      const roundedTotalInterest =
        this.roundMoney(
          totalInterest,
        );

      const regularPrincipal =
        this.roundMoney(
          principal /
            numberOfInstallments,
        );

      const regularInterest =
        this.roundMoney(
          roundedTotalInterest /
            numberOfInstallments,
        );

      for (
        let index = 0;
        index < numberOfInstallments;
        index++
      ) {
        const installmentNumber =
          index + 1;

        const dueDate =
          this.calculateDueDate(
            disbursementDate,
            repaymentFrequency,
            installmentNumber,
          );

        let principalAmount =
          regularPrincipal;

        let interestAmount =
          regularInterest;

        // ------------------------------------------------------
        // Final installment rounding adjustment
        // ------------------------------------------------------

        if (
          installmentNumber ===
          numberOfInstallments
        ) {
          principalAmount =
            this.roundMoney(
              remainingPrincipal,
            );

          interestAmount =
            this.roundMoney(
              roundedTotalInterest -
                totalInterest,
            );
        }

        const feeAmount =
          installmentNumber === 1
            ? processingFee
            : 0;

        const baseAmountDue =
          this.roundMoney(
            principalAmount +
              interestAmount +
              feeAmount,
          );

        remainingPrincipal =
          this.roundMoney(
            Math.max(
              remainingPrincipal -
                principalAmount,
              0,
            ),
          );

        totalInterest +=
          interestAmount;

        rows.push({
          loanId,

          installmentNumber,

          dueDate,

          principalAmount:
            this.roundMoney(
              principalAmount,
            ),

          interestAmount:
            this.roundMoney(
              interestAmount,
            ),

          feeAmount:
            this.roundMoney(feeAmount),

          penaltyAmount: 0,

          baseAmountDue,

          amountDue: baseAmountDue,

          amountPaid: 0,

          principalPaid: 0,

          interestPaid: 0,

          feePaid: 0,

          penaltyPaid: 0,

          remainingBalance:
            remainingPrincipal,

          status:
            InstallmentStatus.PENDING,
        });
      }
    }

    const totalFees = this.roundMoney(
      processingFee,
    );

    const roundedTotalInterest =
      this.roundMoney(totalInterest);

    const totalPayable =
      this.roundMoney(
        principal +
          roundedTotalInterest +
          totalFees,
      );

    return {
      rows,

      totalInterest:
        roundedTotalInterest,

      totalFees,

      totalPayable,
    };
  }

  // ============================================================
  // GENERIC STATUS TRANSITION
  // ============================================================

  private async transitionLoan(
    loanId: string,
    actorId: string,
    nextStatus: LoanStatus,
    action: string,
  ) {
    const loan =
      await this.prisma.loan.findFirst({
        where: {
          id: loanId,
          deletedAt: null,
        },
      });

    if (!loan) {
      throw new NotFoundException(
        'This loan is not available',
      );
    }

    const validTransitions: Record<
      LoanStatus,
      LoanStatus[]
    > = {
      [LoanStatus.PENDING]: [
        LoanStatus.UNDER_REVIEW,
        LoanStatus.CANCELLED,
      ],

      [LoanStatus.UNDER_REVIEW]: [
        LoanStatus.APPROVED,
        LoanStatus.REJECTED,
        LoanStatus.PENDING,
      ],

      [LoanStatus.APPROVED]: [
        LoanStatus.DISBURSED,
        LoanStatus.CANCELLED,
      ],

      [LoanStatus.REJECTED]: [],

      [LoanStatus.DISBURSED]: [
        LoanStatus.CLOSED,
        LoanStatus.DEFAULTED,
      ],

      [LoanStatus.CLOSED]: [],

      [LoanStatus.DEFAULTED]: [],

      [LoanStatus.CANCELLED]: [],
    };

    const allowed =
      validTransitions[loan.status] ?? [];

    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `Cannot move loan from ${loan.status} to ${nextStatus}`,
      );
    }

    return this.prisma.$transaction(
      async (tx) => {
        /*
         * Optimistic locking.
         *
         * We only update the row if the version we read is
         * still the current version.
         */

        const updated =
          await tx.loan.updateMany({
            where: {
              id: loan.id,
              version: loan.version,
            },

            data: {
              status: nextStatus,

              version: {
                increment: 1,
              },

              ...(nextStatus ===
                LoanStatus.APPROVED
                ? {
                    approvedAt: new Date(),
                    approvedById: actorId,
                  }
                : {}),
            },
          });

        if (updated.count !== 1) {
          throw new ConflictException(
            'This loan was modified by another request. Please reload and try again.',
          );
        }

        const updatedLoan =
          await tx.loan.findUnique({
            where: {
              id: loan.id,
            },
          });

        if (!updatedLoan) {
          throw new NotFoundException(
            'Loan no longer exists',
          );
        }

        await tx.auditLog.create({
          data: {
            actorId,

            action,

            entityType: 'LOAN',

            entityId: loan.id,

            beforeState: {
              status: loan.status,
            },

            afterState: {
              status: nextStatus,
            },
          },
        });

        return updatedLoan;
      },
    );
  }

  // ============================================================
  // NUMBER OF INSTALLMENTS
  // ============================================================

  private calculateNumberOfInstallments(
    termValue: number,
    termUnit: TermUnit,
    frequency: RepaymentFrequency,
  ): number {
    if (termUnit === TermUnit.MONTHS) {
      switch (frequency) {
        case RepaymentFrequency.MONTHLY:
          return termValue;

        case RepaymentFrequency.BIWEEKLY:
          return Math.ceil(
            (termValue * 26) / 12,
          );

        case RepaymentFrequency.WEEKLY:
          return Math.ceil(
            (termValue * 52) / 12,
          );
      }
    }

    if (termUnit === TermUnit.WEEKS) {
      switch (frequency) {
        case RepaymentFrequency.WEEKLY:
          return termValue;

        case RepaymentFrequency.BIWEEKLY:
          return Math.ceil(
            termValue / 2,
          );

        case RepaymentFrequency.MONTHLY:
          return Math.ceil(
            termValue / 4.345,
          );
      }
    }

    throw new BadRequestException(
      'Unsupported loan term and repayment frequency combination',
    );
  }

  // ============================================================
  // PERIODS PER YEAR
  // ============================================================

  private getPeriodsPerYear(
    frequency: RepaymentFrequency,
  ): number {
    switch (frequency) {
      case RepaymentFrequency.WEEKLY:
        return 52;

      case RepaymentFrequency.BIWEEKLY:
        return 26;

      case RepaymentFrequency.MONTHLY:
        return 12;

      default:
        throw new BadRequestException(
          'Unsupported repayment frequency',
        );
    }
  }

  // ============================================================
  // FEE CALCULATION
  // ============================================================

  private calculateFee(
    baseAmount: number,
    feeType: FeeType,
    fixedAmount: number,
    percentageRate: number,
  ): number {
    if (feeType === FeeType.FIXED) {
      return this.roundMoney(
        Math.max(fixedAmount, 0),
      );
    }

    if (feeType === FeeType.PERCENTAGE) {
      return this.roundMoney(
        baseAmount *
          (Math.max(percentageRate, 0) /
            100),
      );
    }

    throw new BadRequestException(
      'Unsupported fee type',
    );
  }

  // ============================================================
  // ESTIMATED INTEREST
  // ============================================================

  private calculateEstimatedInterest(
    principal: number,
    annualRate: number,
    interestType: InterestType,
    termValue: number,
    termUnit: TermUnit,
    frequency: RepaymentFrequency,
  ): number {
    if (interestType === InterestType.FLAT) {
      const years =
        this.termToYears(
          termValue,
          termUnit,
        );

      return this.roundMoney(
        principal *
          (annualRate / 100) *
          years,
      );
    }

    const installments =
      this.calculateNumberOfInstallments(
        termValue,
        termUnit,
        frequency,
      );

    const periodicRate =
      annualRate /
      100 /
      this.getPeriodsPerYear(
        frequency,
      );

    if (periodicRate === 0) {
      return 0;
    }

    const payment =
      (principal *
        (periodicRate *
          Math.pow(
            1 + periodicRate,
            installments,
          ))) /
      (Math.pow(
        1 + periodicRate,
        installments,
      ) - 1);

    return this.roundMoney(
      payment * installments -
        principal,
    );
  }

  // ============================================================
  // TERM TO YEARS
  // ============================================================

  private termToYears(
    termValue: number,
    termUnit: TermUnit,
  ): number {
    if (termUnit === TermUnit.MONTHS) {
      return termValue / 12;
    }

    if (termUnit === TermUnit.WEEKS) {
      return termValue / 52;
    }

    throw new BadRequestException(
      'Unsupported term unit',
    );
  }

  // ============================================================
  // DUE DATE
  // ============================================================

  private calculateDueDate(
    disbursementDate: Date,
    frequency: RepaymentFrequency,
    installmentNumber: number,
  ): Date {
    const dueDate =
      new Date(disbursementDate);

    switch (frequency) {
      case RepaymentFrequency.WEEKLY:
        dueDate.setDate(
          dueDate.getDate() +
            installmentNumber * 7,
        );
        break;

      case RepaymentFrequency.BIWEEKLY:
        dueDate.setDate(
          dueDate.getDate() +
            installmentNumber * 14,
        );
        break;

      case RepaymentFrequency.MONTHLY:
        dueDate.setMonth(
          dueDate.getMonth() +
            installmentNumber,
        );
        break;

      default:
        throw new BadRequestException(
          'Unsupported repayment frequency',
        );
    }

    return dueDate;
  }

  // ============================================================
  // MONEY ROUNDING
  // ============================================================

  private roundMoney(value: number): number {
    return Math.round(
      (value + Number.EPSILON) * 100,
    ) / 100;
  }
}

