import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LoansService } from './loans.service';

import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanQueryDto } from './dto/loan-query.dto';

import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { ParseUUIDPipe } from '@nestjs/common';

import { UpdateLoanStatusDto } from './dto/update-status-loan.dto';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loanService: LoansService) {}

  /**
   * ============================================================
   * BORROWER
   * ============================================================
   */

  /**
   * Apply for a new loan
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Apply for a new loan',
    description:
      'Creates a new loan application using an active loan product.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Loan application created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid loan amount, term, or product configuration.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Loan product not found.',
  })
  async createLoan(
    @Body() loanDto: CreateLoanDto,
    @GetUser('id') userId: string,
  ) {
    return this.loanService.applyForLoan(loanDto, userId);
  }

  /**
   * Get current user's loans
   */
  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get my loans',
    description: 'Returns the authenticated borrower loans with pagination.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loans retrieved successfully.',
  })
  async getMyLoans(
    @GetUser('id') userId: string,
    @Query() loanQuery: LoanQueryDto,
  ) {
    return this.loanService.getMyLoans(userId, loanQuery);
  }

  /**
   * Get one of the authenticated user's loans
   */
  @UseGuards(JwtAuthGuard)
  @Get('my/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get my loan details',
    description:
      'Returns detailed information about a loan belonging to the authenticated borrower.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Loan not found.',
  })
  async getLoanById(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') userId: string,
  ) {
    return this.loanService.getLoanById(loanId, userId);
  }

  /**
   * ============================================================
   * LOAN OFFICER / ADMIN
   * ============================================================
   */

  /**
   * Get all loan applications
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all loans',
    description:
      'Returns all loan applications with pagination and filtering.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loans retrieved successfully.',
  })
  async getAllAppliedLoans(@Query() loanQuery: LoanQueryDto) {
    return this.loanService.getAllLoans(loanQuery);
  }

  /**
   * Get detailed loan information for staff
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get('admin/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get loan details as staff',
    description:
      'Returns detailed loan information including borrower, repayments, transactions and allocations.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Loan not found.',
  })
  async adminGetLoanById(
    @Param('id', ParseUUIDPipe) loanId: string,
  ) {
    return this.loanService.adminGetLoanById(loanId);
  }

  /**
   * Get monthly loan statistics
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get('stats/monthly')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get monthly loan statistics',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monthly loan statistics retrieved successfully.',
  })
  async getMonthlyStats() {
    return this.loanService.getMonthlyStats();
  }

  /**
   * ============================================================
   * LOAN REVIEW
   * ============================================================
   */

  /**
   * Move a pending loan into review
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/review')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Start loan review',
    description:
      'Moves a pending loan application into the UNDER_REVIEW state.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan moved to review successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Loan cannot be moved into review from its current state.',
  })
  async startReview(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.startReview(loanId, actorId);
  }

  /**
   * Approve a loan
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/approve')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Approve a loan',
    description:
      'Approves a loan that is currently under review.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan approved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Loan cannot be approved from its current state.',
  })
  async approveLoan(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.approveLoan(loanId, actorId);
  }

  /**
   * Reject a loan
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/reject')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Reject a loan',
    description:
      'Rejects a loan application and records the rejection reason.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan rejected successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Loan cannot be rejected from its current state.',
  })
  async rejectLoan(
    @Param('id', ParseUUIDPipe) loanId: string,
    @Body('reason') reason: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.rejectLoan(
      loanId,
      reason,
      actorId,
    );
  }

  /**
   * ============================================================
   * DISBURSEMENT
   * ============================================================
   */

  /**
   * Disburse an approved loan
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Post(':id/disburse')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Disburse a loan',
    description:
      'Disburses an approved loan, creates the repayment schedule and records the disbursement transaction.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan disbursed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Loan cannot be disbursed from its current state.',
  })
  async disburseLoan(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.disburseLoan(
      loanId,
      actorId,
    );
  }

  /**
   * ============================================================
   * LOAN COMPLETION
   * ============================================================
   */

  /**
   * Close a fully repaid loan
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/close')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Close a loan',
    description:
      'Closes a disbursed loan after all outstanding amounts have been fully repaid.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan closed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Loan cannot be closed because it still has an outstanding balance.',
  })
  async closeLoan(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.closeLoan(
      loanId,
      actorId,
    );
  }

  /**
   * Mark a loan as defaulted
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/default')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Default a loan',
    description:
      'Marks a disbursed loan as defaulted.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan marked as defaulted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Loan cannot be marked as defaulted from its current state.',
  })
  async defaultLoan(
    @Param('id', ParseUUIDPipe) loanId: string,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.defaultLoan(
      loanId,
      actorId,
    );
  }

  /**
   * ============================================================
   * LEGACY / COMPATIBILITY ENDPOINT
   * ============================================================
   *
   * Keep this temporarily if your frontend already depends on
   * PATCH /loans/:id/status.
   *
   * For new frontend code, prefer the explicit endpoints above.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Patch(':id/status')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update loan status',
    description:
      'Compatibility endpoint for updating loan status. Prefer explicit lifecycle endpoints for new integrations.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan status updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'The requested status transition is not allowed.',
  })
  async updateLoanStatus(
    @Param('id', ParseUUIDPipe) loanId: string,
    @Body() status: UpdateLoanStatusDto,
    @GetUser('id') actorId: string,
  ) {
    return this.loanService.updateLoanStatus(
      loanId,
      status,
      actorId,
    );
  }
}

