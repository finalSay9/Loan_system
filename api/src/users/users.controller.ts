import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //creating a user
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  //   {
  //   "phone": "+265883341542",
  //   "password": "Evan@1234"
  // }

  //mr specif route find the user by email
  @Get('search')
  @ApiOperation({ summary: 'get user by email' })
  @ApiResponse({ status: 201, description: 'User retrived successfully' })
  @ApiResponse({ status: 409, description: 'no user with this email exist' })
  async getUserByEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  //getting a user by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current logged in user' })
  @ApiResponse({ status: 201, description: 'User retrived successfully' })
  @ApiResponse({ status: 409, description: 'no user with this id exist' })
  async getUserById(@Param('id') userId: string) {
    return await this.usersService.findUserById(userId);
  }
}
