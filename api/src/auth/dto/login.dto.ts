import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+265991234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be a valid E.164 international format',
  })
  phone!: string;

  @ApiProperty({ example: 'Secret@123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
