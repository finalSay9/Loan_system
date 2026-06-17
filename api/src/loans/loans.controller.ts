import { 
    Body,
    Controller, 
    Post,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Query,
    UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan-dto';

@Controller('loans')
export class LoansController {

    constructor(private loanService: LoansService){}

    @Post('applying')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'Email already in use' })
    async createLoan(@Param('id')userId: string, @Body() loanDto: CreateLoanDto ) {
        return await this.loanService.applyForLoan(userId, loanDto)
    }


}
