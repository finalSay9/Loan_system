import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy, LocalStrategy } from './strategies/jwt.strategy';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async validateUser(){}
    
}
