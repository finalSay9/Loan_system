import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanQueryDto } from './dto/loan-query.dto';
import { UpdateLoanStatusDto } from './dto/update-status-loan.dto';
import { LoanStatus } from 'prisma/generated/prisma';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  //applying for the loan
  async applyForLoan(createLoan: CreateLoanDto, userId: string) {
    const loan = await this.prisma.loan.create({
      data: {
        amount: createLoan.amount,
        purpose: createLoan.purpose,
        termMonths: createLoan.termMonths,
        interestRate: 10.5,
        userId: userId,
      },
    });
    return loan;
  }

  //get my loans
  async getMyLoans(userId: string, queryDto: LoanQueryDto) {
    //looking for thr loans of the uyser
    const userLoans = await this.prisma.loan.findMany({
      where: { userId: userId },
    });

    //check if the loans are available
    if (userLoans.length === 0) {
      throw new NotFoundException('no available loans at the moment');
    }
    return userLoans;
  }

  //getting a loan by id
  async getLoanById(loanId: string, userId: string) {
    //check if a loan by that id is available
    const userLoan = await this.prisma.loan.findUnique({
      where: {
        id: loanId,
        userId: userId,
      },
    });

    //if the loan is not available
    if (!userLoan) {
      throw new NotFoundException('loan with this id not available');
    }

    return userLoan;
  }

  //getting all loans applied by users for admins only
  async getAllLoans(queryDto: LoanQueryDto) {
    //looking up in the database
    const allAppliedLoans = await this.prisma.loan.findMany({});

    //check if loans are available
    if (allAppliedLoans.length === 0) {
      throw new NotFoundException('no loans available at the moment');
    }

    return allAppliedLoans;
  }

  //loan officer sees any loan in deatil
  async adminGetLoanById(loanId: string) {
    //looking for the loan in the database
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });
    //if no loan
    if (!loan) {
      throw new NotFoundException('no loan with this id exist');
    }

    return loan;
  }

  // Update loan status
  async updateLoanStatus(
    loanId: string,
    updateStatus: UpdateLoanStatusDto,
    actorId: string,
  ) {
    //console.log('Loan ID:', loanId);
    // Look for the loan in the database
    const appliedLoan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    // Stop execution if loan does not exist
    if (!appliedLoan) {
      throw new NotFoundException('This loan is not available');
    }

    // Define valid loan status transitions
    const validTransitions: Record<LoanStatus, LoanStatus[]> = {
      // New application can only move to review
      PENDING: [LoanStatus.UNDER_REVIEW],

      // During review, it can be approved or sent back to pending
      UNDER_REVIEW: [LoanStatus.APPROVED, LoanStatus.PENDING],

      // Once approved, funds can be released
      APPROVED: [LoanStatus.DISBURSED],

      // After disbursement, loan can be completed or defaulted
      DISBURSED: [LoanStatus.CLOSED, LoanStatus.DEFAULTED],

      // Final states
      CLOSED: [],
      DEFAULTED: [],
    };

    /**
     * Example:
     * loan.status = APPROVED
     *
     * allowed = [DISBURSED]
     */
    const allowed = validTransitions[appliedLoan.status];

    /**
     * Validate requested transition
     *
     * Example:
     * Current = PENDING
     * Requested = DISBURSED
     *
     * DISBURSED is not in:
     * [UNDER_REVIEW]
     *
     * Therefore throw an error.
     */
    if (!allowed.includes(updateStatus.status)) {
      throw new BadRequestException(
        `Cannot move loan from ${appliedLoan.status} to ${updateStatus.status}`,
      );
    }

    // Execute all operations in a transaction
    return this.prisma.$transaction(async (tx) => {
      /**
       * Update loan status
       */
      const statusUpdate = await tx.loan.update({
        where: {
          id: loanId,
        },
        data: {
          // New status requested
          status: updateStatus.status,

          // Optimistic locking version increment
          version: {
            increment: 1,
          },
        },
      });

      /**
       * Create audit log
       *
       * Records:
       * - Who made the change
       * - What changed
       * - Previous value
       * - New value
       */
      await tx.auditLog.create({
        data: {
          // User who performed action
          actorId,

          // Action performed
          action: 'UPDATE_LOAN_STATUS',

          // Entity modified
          entityType: 'LOAN',

          // Loan ID
          entityId: loanId,

          // Previous status
          beforeState: {
            status: appliedLoan.status,
          },

          // New status
          afterState: {
            status: updateStatus.status,
          },
        },
      });

      // Return updated loan
      return statusUpdate;
    });
  }

  //system disburse loan
  async disburseLoan(
    loanId: string, // the id of the loan
  ) {
    /**
     * looking up
     * for the loan
     */
    const approvedLoan = await this.prisma.loan.findUnique({
      where: {id: loanId}
    })

    /**
     * if its not
     * available
     */
    if(!approvedLoan) {
      throw new NotFoundException('the loan is not available');
    }

    /**
     * lets define the valid state
     * for system to disburse the loan
     */
    // Define valid loan status transitions
    const validatedState: Record<LoanStatus, LoanStatus[]> = {
      // New application can only move to review
      PENDING: [LoanStatus.UNDER_REVIEW],

      // During review, it can be approved or sent back to pending
      UNDER_REVIEW: [LoanStatus.APPROVED, LoanStatus.PENDING],

      // Once approved, funds can be released
      APPROVED: [LoanStatus.DISBURSED],

      // After disbursement, loan can be completed or defaulted
      DISBURSED: [LoanStatus.CLOSED, LoanStatus.DEFAULTED],

      // Final states
      CLOSED: [],
      DEFAULTED: [],
    };

    //permited
    const permitedState = validatedState[approvedLoan.status];

    /**
     * validating id it contens
     * the approved state
     */
    if(!permitedState) {
      throw new BadRequestException(`Cannot disburse loan from ${approvedLoan.status} to ${LoanStatus.DISBURSED}`); 
    }

    
}
}
