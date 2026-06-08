import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  //creating a user
  @Post('createUser')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }


  //getting a user by id
  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 201, description: 'User retrived successfully' })
  @ApiResponse({ status: 409, description: 'no user with this id exist' })
  async getUserById(@Param('id') userId: string) {
    return await this.usersService.findUserById(userId)
  }

  //find the user by email
  @Get('search')
  @ApiOperation({ summary: 'get user by email' })
  @ApiResponse({ status: 201, description: 'User retrived successfully' })
  @ApiResponse({ status: 409, description: 'no user with this email exist' })
  async getUserByEmail(@Query('email') email: string) {
    return await this.usersService.findUserByEmail(email)
  }
}
