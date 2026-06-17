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
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('loans')
export class LoansController {
  constructor(private loanService: LoansService) {}

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
}
