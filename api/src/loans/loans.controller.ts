import { Body, Controller, Post } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan-dto';

@Controller('loans')
export class LoansController {

    constructor(private loanService: LoansService){}

    @Post()
    async createLoan(@Body() loanDto: CreateLoanDto, userId: string) {
        return await this.loanService.applyForLoan(loanDto, userId)
    }


}
