import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async validateUser(phone: string, password:string): Promise<any>{
        const user = await this.prisma.user.findUnique({
            where: {phone: phone}
        });
        if(!user){
            throw new UnauthorizedException('invalid credentials')
        }
        //check password
        const checkPassword = await bcrypt.compare(password, user.passwordHash)
        //if wrong credentials provided
        if(!checkPassword) {
            throw new UnauthorizedException('invalid credentials')
        }
        return user;
        
    }

    async login(user: LoginDto){
        const payload = {phone: user.phone, sub: user.password};

        return {
            message: 'login successfull',
            access_token: this.jwtService.sign(payload)
        }

    }
    
}
