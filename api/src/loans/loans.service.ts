import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';

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
    async getMyLoans(loanId: string, userId: string) {
      //first check if there are loans available
      const checkAvailableLoans = await this.prisma.loan.findMany({
        where: {}
      })

    }
}
