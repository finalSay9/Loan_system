import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PaymentsService } from './payments.service';
import { CreateRepaymentDto } from './dto/create-repayment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {

    constructor(private paymentsService: PaymentsService){}


  // payments.controller.ts
  @UseGuards(JwtAuthGuard)
  @Post('repay')
  async makeRepayment(
    @Body() dto: CreateRepaymentDto,
    @GetUser('id') userId: string,
  ) {
    return this.paymentsService.makeRepayment(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-transactions')
  async getMyTransactions(@GetUser('id') userId: string) {
    return this.paymentsService.getMyTransactions(userId);
  }


@UseGuards(JwtAuthGuard)
@Get('balance/:loanId')
@ApiBearerAuth('access-token')
@ApiOperation({ summary: 'Get outstanding balance for a loan' })
async getLoanBalance(
  @Param('loanId', ParseUUIDPipe) loanId: string,
  @GetUser('id') userId: string,
) {
  return this.paymentsService.getLoanBalance(userId, loanId)
}
}
