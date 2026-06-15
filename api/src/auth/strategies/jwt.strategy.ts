import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService
    ){
        super({
            //telling the passport where to look for the token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //xhecking the xpiration of the token
            ignoreExpiration: false,
            //checking if the token is valide/or not fake
            secretOrKey: config.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: {sub: string, email: string}) {
        //looking up for the real/actual credentials of the user in the database
        const user = await this.prisma.user.findUnique({
          where: { id: payload.sub },
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            role: true,
            kycStatus: true,
          },
        });
        if(!user) {
            throw new UnauthorizedException('user no longer exist')
        }

        return user;
    }
}