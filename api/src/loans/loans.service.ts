import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanQueryDto } from './dto/loan-query.dto';
import { UpdateLoanStatusDto } from './dto/update-status-loan.dto';
import { LoanStatus } from 'prisma/generated/prisma';

@Injectable()
export class LoansService {

    constructor(
        private prisma: PrismaService
    ){}

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
        return loan

    }

    //get my loans
    async getMyLoans(userId: string, queryDto: LoanQueryDto) {
      //looking for thr loans of the uyser
      const userLoans = await this.prisma.loan.findMany({
        where: {userId: userId}
      })

      //check if the loans are available
      if(userLoans.length ===0) {
        throw new NotFoundException('no available loans at the moment')
      }
      return userLoans
    }

    //getting a loan by id
  async getLoanById(loanId: string, userId: string){
    //check if a loan by that id is available
    const userLoan = await this.prisma.loan.findUnique({
      where:{
        id: loanId,
        userId: userId
      }
    })

    //if the loan is not available
    if(!userLoan){
      throw new NotFoundException('loan with this id not available')
    }

    return userLoan;
  }

  //getting all loans applied by users for admins only
  async getAllLoans(queryDto: LoanQueryDto) {
    //looking up in the database
    const allAppliedLoans = await this.prisma.loan.findMany({
    
    })

    //check if loans are available
    if(allAppliedLoans.length === 0) {
      throw new NotFoundException('no loans available at the moment')
    }

    return allAppliedLoans;
  }

  //loan officer sees any loan in deatil
  async adminGetLoanById(loanId: string){
    //looking for the loan in the database
    const loan = await this.prisma.loan.findUnique({
      where: {id: loanId}
    })
    //if no loan
    if(!loan){
      throw new NotFoundException('no loan with this id exist')
    }

    return loan;
  }

  //update loan status 
  async updateLoanStatus(
    loanId: string,
    updateStatus: UpdateLoanStatusDto,
    actorId: string) {
    const updateLoan = updateStatus;
    //looking up for the loan
    const appliedLoan = await this.prisma.loan.update({
      where:{LoanStatus: status}
      
    })

    if(!appliedLoan) {
      throw new NotFoundException('this loan is not available');
    }
    return appliedLoan;
  }




  //system disburse loan
  async disburseLoan(
    loanId: string, // the id of the loan
    borrowerId: string, //the user who received the money
    officerId: string, // the officer responsible for the approval of the loan
    amount: number, // the amount disbursed
  ) {

  }



}
