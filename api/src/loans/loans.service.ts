import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';

@Injectable()
export class LoansService {

    constructor(
        private prisma: PrismaService
    ){}

    //applying for the loan 
    async applyForLoan(createLoan: CreateLoanDto) {
        const loan = await this.prisma.loan.create({
            
        })

    }
}
