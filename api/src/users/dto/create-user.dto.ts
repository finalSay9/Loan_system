import { Transform } from 'class-transformer';
import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Matches, 
  MinLength 
} from 'class-validator';
import { Role } from '../../prisma/generated/prisma';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'name must be at least 2 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  address!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  occupation!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be a valid E.164 international format',
  })
  phone!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.BORROWER;
}