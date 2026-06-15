import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateLoanDto {
  @ApiProperty({
    example: 50000.0,
    description: 'Loan amount requested in MWK',
  })
  @Type(() => Number)
  @Min(1000, { message: 'Minimum loan amount is MWK 1,000' })
  @Max(5000000, { message: 'Maximum loan amount is MWK 5,000,000' })
  amount!: number;

  @ApiProperty({ example: 12, description: 'Loan term in months' })
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Minimum term is 1 month' })
  @Max(60, { message: 'Maximum term is 60 months' })
  termMonths!: number;

  @ApiProperty({ example: 'Business capital for my shop' })
  @IsString()
  @IsNotEmpty()
  purpose!: string;

  @ApiPropertyOptional({ example: 'Additional context about the loan' })
  @IsString()
  @IsOptional()
  notes?: string;
}