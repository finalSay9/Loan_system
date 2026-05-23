import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './Dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService

    ){}

    async createUser(dto: CreateUserDto) {
        //first check if the user with that email doesnt exist
        const existingUser = await this.prisma.user.findUnique({
            where: {email: dto.email}
        })
        if(existingUser) {
            throw new ConflictException('Email already in use');
        }
    }
}
