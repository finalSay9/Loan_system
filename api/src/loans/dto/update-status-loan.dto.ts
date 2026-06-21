import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoanStatus } from '../../../prisma/generated/prisma';

export class UpdateLoanStatusDto {
  @ApiProperty({ enum: LoanStatus, example: LoanStatus.APPROVED })
  @IsEnum(LoanStatus)
  @IsNotEmpty()
  status!: LoanStatus;

  @ApiPropertyOptional({ example: 'Rejected due to insufficient income proof' })
  @IsString()
  @IsOptional()
  reason?: string; // required when rejecting.....___optional otherwise
}