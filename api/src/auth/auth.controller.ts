import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

//login(@Request() req: Request)

@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {}
  

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOperation({ summary: 'loggin in' })
  @ApiResponse({ status: 201, description: 'logged in successfully' })
  @ApiResponse({ status: 409, description: 'invalid credentials' })
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
