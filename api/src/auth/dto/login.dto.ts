import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class LoginDto {
    @IsString()
    phone: string


     @ApiProperty({
        example: 'Secret@123',
        description:
          'Min 8 chars, must include upper, lower, number and special character',
      })
    @IsString()
    password: string
}