
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({
    example: '7d9f5c1e-5c6d-4c3d-8f2e-123456789abc',
    description:
      'ID of the active loan product selected by the borrower',
  })
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty({
    example: 50000,
    description:
      'Loan amount requested in MWK. The amount must fall within the selected product limits.',
  })
  @Type(() => Number)
  @Min(1, {
    message: 'Loan amount must be greater than zero',
  })
  amount!: number;

  @ApiProperty({
    example: 12,
    description:
      'Requested loan term. The unit (weeks or months) comes from the selected loan product.',
  })
  @Type(() => Number)
  @IsInt({
    message: 'Term value must be a whole number',
  })
  @Min(1, {
    message: 'Loan term must be greater than zero',
  })
  termValue!: number;

  @ApiProperty({
    example: 'Business capital for my shop',
    description:
      'Purpose of the loan',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Loan purpose is required',
  })
  purpose!: string;

  @ApiPropertyOptional({
    example:
      'Funds will be used to purchase additional stock.',
    description:
      'Additional information about the loan application',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

