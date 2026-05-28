import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../prisma/generated/prisma';

export class CreateUserDto {
  @ApiProperty({ example: 'peter Banda', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @ApiProperty({
    example: 'Area 49, Lilongwe',
    description: 'Physical address',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  address!: string;

  @ApiProperty({ example: 'Software Engineer', description: 'Occupation' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  occupation!: string;

  @ApiProperty({
    example: '+265991234567',
    description: 'Phone in E.164 format',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be a valid E.164 international format',
  })
  phone!: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Email address',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email?: string;

  @ApiProperty({
    example: 'Secret@123',
    description:
      'Min 8 chars, must include upper, lower, number and special character',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password!: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.BORROWER,
    description: 'User role',
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.BORROWER;
}
