import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, } from 'class-validator'; import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeeType, InterestType, LateFeeType, RepaymentFrequency, TermUnit, } from '../../../prisma/generated/prisma'
  


export class CreateLoanProductDto {
    
    @ApiProperty({ example: 'Business Loan', })
    @IsString() @IsNotEmpty() name!: string; 
    @ApiPropertyOptional({ example: 'Short-term financing for small businesses.', }) 
    @IsString() 
    @IsOptional() 
    description?: string;
    
    
    @ApiProperty({ example: 10000, description: 'Minimum loan amount in MWK.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(1) 
    minAmount!: number;
    
    
    @ApiProperty({ example: 1000000, description: 'Maximum loan amount in MWK.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(1) 
    maxAmount!: number; 


    @ApiProperty({ example: 12.5, description: 'Annual interest rate percentage.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(0) 
    @Max(100) 
    interestRate!: number;
    
    
    @ApiProperty({ enum: InterestType, example: InterestType.REDUCING_BALANCE, }) 
    @IsEnum(InterestType) 
    interestType!: InterestType;
    
    
    @ApiProperty({ example: 3, description: 'Minimum allowed term.', }) 
    @Type(() => Number) 
    @IsInt() 
    @Min(1) 
    minTermValue!: number; 
    
    @ApiProperty({ example: 24, description: 'Maximum allowed term.', }) 
    @Type(() => Number) 
    @IsInt() 
    @Min(1) 
    maxTermValue!: number; 
    
    @ApiProperty({ enum: TermUnit, example: TermUnit.MONTHS, }) 
    @IsEnum(TermUnit) 
    termUnit!: TermUnit; 

    @ApiProperty({
    example: 3,
    description: 'Number of grace-period days before late fees apply.',
    default: 0,
    })
    @Type(() => Number)
    @IsInt()
    @Min(0)
    gracePeriodDays!: number;
        
    @ApiProperty({ enum: RepaymentFrequency, example: RepaymentFrequency.MONTHLY, }) 
    @IsEnum(RepaymentFrequency) 
    repaymentFrequency!: RepaymentFrequency; 
    
    @ApiProperty({ enum: FeeType, example: FeeType.FIXED, }) 
    @IsEnum(FeeType) 
    processingFeeType!: FeeType; 
    
    @ApiPropertyOptional({ example: 5000, description: 'Fixed processing fee in MWK.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(0) 
    processingFeeAmount?: number; 
    
    @ApiPropertyOptional({ example: 2.5, description: 'Processing fee percentage.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(0) 
    @Max(100) 
    processingFeeRate?: number; 
    
    @ApiProperty({ enum: LateFeeType, example: LateFeeType.FIXED, }) 
    @IsEnum(LateFeeType) 
    lateFeeType!: LateFeeType; 
    
    @ApiPropertyOptional({ example: 1000, description: 'Fixed late fee in MWK.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(0) 
    lateFeeAmount?: number; 
    
    @ApiPropertyOptional({ example: 1, description: 'Late fee percentage.', }) 
    @Type(() => Number) 
    @IsNumber() 
    @Min(0) 
    @Max(100) 
    lateFeeRate?: number; 
}