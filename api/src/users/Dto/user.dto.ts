import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsString()
    @MinLength(2)
    name!: string

    @IsString()
    address!: string

    @IsString()
    occupation!: string

    @IsString()
    phone!: string

    @IsEmail()
    email!: string

    @IsString()
    @MinLength(6)
    passwordHash!: string

}