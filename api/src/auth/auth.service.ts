import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async validateUser(phone: string, password:string){
        const user = await this.prisma.user.findUnique({
            where: {phone: phone}
        });
        if(!user){
            throw new UnauthorizedException('invalid credentials')
        }
        //check password
        const checkPassword = await bcrypt.compare(password, user.passwordHash)
        //if long credentials provided
        if(!checkPassword) {
            throw new UnauthorizedException('invalid credentials')
        }
        
    }

    async login(user: LoginDto){
        const payload = {phone: user.phone, sub: user.password};

        return {
            access_token: this.jwtService.sign(payload)
        }

    }
    
}
