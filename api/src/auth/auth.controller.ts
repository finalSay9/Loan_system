import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(){}

    @UseGuards(AuthGuard('local'))
    @Post()
    login(@Body() dto: LoginDto){
        return  this.login
    }
}
