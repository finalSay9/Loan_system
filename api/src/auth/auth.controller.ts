import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {

    constructor(){}

    @UseGuards(LocalGuard)
    @Post()
    @ApiOperation({ summary: 'loggin in' })
    @ApiResponse({ status: 201, description: 'logged in successfully' })
    @ApiResponse({ status: 409, description: 'invalid credentials' })
    login(@Request() req, @Body() dto: LoginDto){
        return  req.user;
    }
}
