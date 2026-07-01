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
    /**
     * pagnation
     */
    const page = queryDto.page ?? 1;
    const limit = queryDto.limit ?? 10;
    //looking for thr loans of the uyser
    const userLoans = await this.prisma.loan.findMany({
      where: { 
        userId: userId,
        ...(queryDto.status && {status: queryDto.status}),
       },
       skip: (page - 1) * limit,
       take: limit,
       orderBy: {createdAt: 'desc'}
    });

    
    return {
      data: userLoans,
      meta: {page, limit, count: userLoans.length}
    }

  }

  //getting a loan by id
  async getLoanById(loanId: string, userId: string) {
    /**
     * used the findFirst so that i can combine the two
     * fields...without any problem
     * unlike findUniques that requires 2 unique identifier
     * forming a compound unique to check for user
     */
    const userLoan = await this.prisma.loan.findFirst({
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

    /**
     * pagination
     */
    const page = queryDto.page ?? 1;
    const limit = queryDto.limit ?? 10;
    //looking up in the database
    const allAppliedLoans = await this.prisma.loan.findMany({
      where: {
        ...(queryDto.status && { status: queryDto.status }),
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {createdAt: 'desc'}
    });

    

    return {
      data: allAppliedLoans,
      meta: {page, limit, count: allAppliedLoans.length}
    };
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


  /**
   * now the system disburse the loan
   */
  async disburseLoan(loanId: string) {
    //look for loan in the database
    const approvedLoan = await this.prisma.loan.findUnique({
      where: {id: loanId},
    });

    //if not available
    if(!approvedLoan) {
      throw new NotFoundException('the loan with this id not available')
    };

    /**
     * now the approved loan can be 
     * disbursed by the system if and olny if the 
     * the condition status can be met
     */
    if(approvedLoan.status !== LoanStatus.APPROVED) {
      throw new BadRequestException(
        `Loan must be APPROVED before disbursement. Current status is ${approvedLoan.status}`,)
    }

    /**
     * audit log
     */
    return this.prisma.$transaction(async (tx) => {
      const disbursed = await tx.loan.update({
        where: {id: loanId},
        data: {
          status: LoanStatus.DISBURSED
        }
      })
    })

    /**
     * now disburse loan
     * after meeting the above condition
     */
    const disburseLoan = await this.prisma.loan.update({
      where: {id: loanId},
      data: {
        status: LoanStatus.DISBURSED,
        version: {
          increment: 1
        }
      }
    })

    return disburseLoan;
  }
}
