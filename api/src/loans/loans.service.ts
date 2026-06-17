import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { NotFoundError } from 'rxjs';

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
    async getMyLoans(userId: string) {
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
}
