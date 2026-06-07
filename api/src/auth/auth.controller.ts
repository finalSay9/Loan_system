import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';


@Controller('auth')
export class AuthController {

    constructor(){}

    @UseGuards(LocalGuard)
    @Post()
    login(@Body() dto: LoginDto){
        return  this.login
    }
}
