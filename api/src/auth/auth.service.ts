import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { phone: phone },
    });
    if (!user) {
      return null
    }
    //check password
    const checkPassword = await bcrypt.compare(password, user.passwordHash);
    //if wrong credentials provided
    if (!checkPassword) {
      return null;
    }
    // Strip out the password hash so it doesn't get passed around the app
    const { passwordHash, ...result } = user;

    return result;
  }

  //create an interface
  

  //  Called by AuthController after successful LocalStrategy validation
  async login(user: any) {
    // FIXED: Used the user ID for 'sub'.... and NOT passwords in the payload
    const payload = { phone: user.phone, sub: user.id };

   return {
     message: 'Login successful',
     access_token: await this.jwtService.signAsync(payload),
     data: {
       id: user.id,
       name: user.name,
       phone: user.phone,
       email: user.email,
       role: user.role,
     },
   };
  }
}
