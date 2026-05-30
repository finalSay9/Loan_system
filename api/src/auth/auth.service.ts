import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async validateUser(dto: LoginDto){
        
    }
    
}
