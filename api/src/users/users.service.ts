import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async createUser(dto: CreateUserDto) {
    // Dual uniqueness check — phone is required, email is optional
    const clauses: { phone?: string; email?: string }[] = [
      { phone: dto.phone },
    ];
    if (dto.email) {
      clauses.push({ email: dto.email });
    }

    const existingUser = await this.prisma.user.findFirst({
      where: { OR: clauses },
    });

    if (existingUser) {
      if (existingUser.phone === dto.phone) {
        throw new ConflictException('Phone number already exists');
      }
      if (dto.email && existingUser.email === dto.email) {
        throw new ConflictException('Email already exists');
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Strip plain password before hitting the database
    const { password, ...userFields } = dto;

    // Create user — select only safe fields back
    const user = await this.prisma.user.create({
      data: {
        ...userFields,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        address: true,
        occupation: true,
        phone: true,
        email: true,
        role: true,
        kycStatus: true,
        createdAt: true,
      },
    });

    // Audit log — every user creation must be recorded
    await this.prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'USER_CREATED',
        entityType: 'User',
        entityId: user.id,
        afterState: {
          id: user.id,
          phone: user.phone,
          role: user.role,
        },
      },
    });

    // Sign JWT
    const token = await this.signToken(user.id, user.email ?? '');

    return {
      message: 'User created successfully',
      access_token: token,
      data: user,
    };
  }

  private async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: (this.config.get<string>('JWT_EXPIRES_IN') ?? '7d') as any,
    });
  }
}
