import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MinLength } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateRepaymentDto {
  @ApiProperty({ example: 'uuid-of-the-loan' })
  @IsUUID()
  @IsNotEmpty()
  loanId!: string

  @ApiProperty({ example: 5167.50 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive({ message: 'Amount must be greater than zero' })
  amount!: number

  @ApiProperty({ example: 'MPESA-12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  reference!: string
}