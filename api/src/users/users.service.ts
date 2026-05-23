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
        //dual uniqueness check email and phone number
        const clauses: any[] = [{phone: dto.phone}];
        if(dto.email) {
            clauses.push({email: dto.email})
        }
      
        //checking for the existing user
        const existingUser = await this.prisma.user.findFirst({
            where: {OR: clauses}
        })

        if(existingUser) {
            if(existingUser.phone === dto.phone)
            throw new ConflictException('phone number already exist');
        };

        if(dto.email && existingUser.email === dto.email) {
            throw new ConflictException('email already exist')

        }
        //hash the password
        const hash_password = await bcrypt.hash(dto.password, 10);
        
        //database operations with explicit mapping
        const { password, ...userFields } = dto

        const user = await this.prisma.user.create({
            data: {
               ...userFields,
               hash_password
            },
        });
        //token staff
        const token = await this.signToken(user.id!, user.email!)
        return {
          message: 'User Created Successfully',
          access_token: token
          data: {
            name: user.email,
            address: user.address,
            occupation: user.occupation,
            phone: user.phone,
            email: user.email,
            role: dto.role,
          },
        };
    }
    private async signToken(userId: string, email: string): Promise<string> {
        const payload = {sub: userId, email};
        return this.jwtService.signAsync(payload, {
          secret: this.config.get<string>('JWT_SECRET'),
          expiresIn: '7d',
        });
        

    }
}
