import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async validateUser(dto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {phone: dto.phone}
        });
        if(!user){
            throw new UnauthorizedException('invalid credentials')
        }
        //check password
        const checkPassword = await bcrypt.compare(dto.password, user.passwordHash)
        //if long credentials provided
        if(!checkPassword) {
            throw new UnauthorizedException('invalid credentials')
        }
        
    }
    
}
