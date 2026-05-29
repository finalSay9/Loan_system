import {Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy } from 'passport-local';
import { AuthService } from '../auth.service';



@Injectable()
export class LocalStretegy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
  //telling the passport strategy to accepting the phone number instead of email
        super({usernameField: 'phone'})
    }

    async validate(phone: string, password: string) {
        const user = await this.authService.validateUser(phone, password)
        
        if(!user) {
            throw new UnauthorizedException('invalid phone or password')
        }
        return user
    }
}