import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate, Min, Max } from "class-validator";

export class LoanResponseDto {
    @ApiProperty({
        example: 50000.0,
        description: 'Loan amount requested in MWK',
      })
      @Type(() => Number)
      @Min(1000, { message: 'Minimum loan amount is MWK 1,000' })
      @Max(5000000, { message: 'Maximum loan amount is MWK 5,000,000' })
      amount!: number;
}