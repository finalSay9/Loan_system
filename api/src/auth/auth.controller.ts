import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';


@Controller('auth')
export class AuthController {

    constructor(){}

    @UseGuards(LocalGuard)
    @Post()
    login(@Request() req, @Body() dto: LoginDto){
        return  req.user;
    }
}
