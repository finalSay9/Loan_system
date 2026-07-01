import {
  Body,
  Controller,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoanQueryDto } from './dto/loan-query.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateLoanStatusDto } from './dto/update-status-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private loanService: LoansService) {}

  //creating the loans
  @UseGuards(JwtAuthGuard)
  @Post('applying')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async createLoan(
    @Body() loanDto: CreateLoanDto,
    @GetUser('id') userId: string,
  ) {
    return await this.loanService.applyForLoan(loanDto, userId);
  }

  /**
   * a user getting 
   * thier loans
   */
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'getting loans' })
  @ApiResponse({ status: 200, description: 'loans retrived successfully' })
  @ApiResponse({ status: 409, description: 'no loans available' })
  async getAllLoans(
    @GetUser('id') userId: string,
    @Query() loanQuery: LoanQueryDto
    ) {
    return await this.loanService.getMyLoans(userId, loanQuery);
  }

  /**
   * an officer getting
   * all applied loans
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get('all-loans')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'getting loans' })
  @ApiResponse({ status: 200, description: 'loans retrived successfully' })
  @ApiResponse({ status: 409, description: 'no loans available' })
  async getAllAppliedLoans(@Query() loanQuery: LoanQueryDto) {
    return await this.loanService.getAllLoans(loanQuery);
  }

  //getting a loan by id
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get('admin/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'getting a loan by id' })
  @ApiResponse({ status: 200, description: 'loan retrived successfully' })
  @ApiResponse({ status: 409, description: 'no loan with that id available' })
  async adminGetLoanById(
    @Param('id', ParseUUIDPipe) loanId: string) {
    return this.loanService.adminGetLoanById(loanId);
  }

  //admin looking loan in details  by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'getting a loan by id' })
  @ApiResponse({ status: 200, description: 'loan retrived successfully' })
  @ApiResponse({ status: 409, description: 'no loan with that id available' })
  async getLoanById(
    @Param('id') loanId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.loanService.getLoanById(loanId, userId);
  }


  //updating the loan status
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/update_status')
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'getting a loan by id' })
  @ApiResponse({ status: 200, description: 'loan retrived successfully' })
  @ApiResponse({ status: 409, description: 'no loan with that id available' })
  async updatingLoanStatus(
    @Param('id') loanId: string,
    @Body() status: UpdateLoanStatusDto, 
    @GetUser('id') actorId: string, 
  ) {
    return await this.loanService.updateLoanStatus(loanId, status, actorId);
  }

  /**
   * now disburse the
   * loan
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/disburse-loan')
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'disbursing the loan' })
  @ApiResponse({ status: 200, description: 'the operation worked successfully' })
  @ApiResponse({ status: 409, description: 'no loan with that id available' })
  async disburseLoan(@Param('id') loanId: string) {
    return this.loanService.disburseLoan(loanId);
  }

}
