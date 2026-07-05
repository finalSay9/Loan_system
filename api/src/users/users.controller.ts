import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';


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

  /**
   *
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get()
  async getAllUsers(
    @Query() query: { page?: number; limit?: number; search?: string },
  ) {
    return this.usersService.getAllUsers(query);
  }

  /**
   * endpoint for the pofile
   */
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png|webp)/)) {
          cb(new Error('Only image files allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
  ) {
    return this.usersService.updateAvatar(
      userId,
      `/uploads/avatars/${file.filename}`,
    );
  }

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
