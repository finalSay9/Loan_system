
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { KycStatus } from 'prisma/generated/prisma';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Create a new borrower account.
   */
  async createUser(dto: CreateUserDto) {
    // Phone is required, email is optional.
    // Check both unique fields before attempting the insert
    // so we can return useful domain errors.
    const clauses: { phone?: string; email?: string }[] = [
      { phone: dto.phone },
    ];

    if (dto.email) {
      clauses.push({ email: dto.email });
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: clauses,
      },
    });

    if (existingUser) {
      if (existingUser.phone === dto.phone) {
        throw new ConflictException('Phone number already exists');
      }

      if (dto.email && existingUser.email === dto.email) {
        throw new ConflictException('Email already exists');
      }
    }

    // Never store the user's plain-text password.
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Remove password before constructing the Prisma data object.
    const { password, ...userFields } = dto;

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

    // Every user creation is audited.
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

    const token = await this.signToken(
      user.id,
      user.email ?? '',
    );

    return {
      message: 'User created successfully',
      access_token: token,
      data: user,
    };
  }

  /**
   * Find a user by ID together with their loans and repayment information.
   *
   * Used by admin/backoffice views where a user's loan history
   * and repayment balance are required.
   */
  async findUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
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
        updatedAt: true,
        deletedAt: true,
        avatarUrl: true,

        loans: {
          select: {
            id: true,
            amount: true,
            purpose: true,
            status: true,

            // New loan schema
            termValue: true,
            termUnit: true,

            interestRate: true,
            interestType: true,
            repaymentFrequency: true,

            numberOfInstallments: true,

            totalInterest: true,
            totalFees: true,
            totalPayable: true,

            createdAt: true,
            approvedAt: true,
            disbursedAt: true,
            closedAt: true,

            repayments: {
              select: {
                id: true,
                installmentNumber: true,
                dueDate: true,

                principalAmount: true,
                interestAmount: true,
                feeAmount: true,
                penaltyAmount: true,

                baseAmountDue: true,
                amountDue: true,

                amountPaid: true,
                principalPaid: true,
                interestPaid: true,
                feePaid: true,
                penaltyPaid: true,

                remainingBalance: true,
                status: true,
                paidAt: true,
              },

              orderBy: {
                installmentNumber: 'asc',
              },
            },
          },

          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    /**
     * Prisma Decimal values need to be converted to numbers
     * before exposing them to the frontend.
     */
    const loansWithBalance = user.loans.map((loan) => {
      const totalDue = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountDue),
        0,
      );

      const totalPaid = loan.repayments.reduce(
        (sum, repayment) => sum + Number(repayment.amountPaid),
        0,
      );

      const outstanding = Math.max(
        totalDue - totalPaid,
        0,
      );

      const progressPercent =
        totalDue > 0
          ? Math.min(
              Math.round((totalPaid / totalDue) * 100),
              100,
            )
          : 0;

      return {
        ...loan,

        // Convert Prisma Decimal values to JSON-friendly numbers.
        amount: Number(loan.amount),
        interestRate: Number(loan.interestRate),

        totalInterest: Number(loan.totalInterest),
        totalFees: Number(loan.totalFees),
        totalPayable: Number(loan.totalPayable),

        repayments: loan.repayments.map((repayment) => ({
          ...repayment,

          principalAmount: Number(repayment.principalAmount),
          interestAmount: Number(repayment.interestAmount),
          feeAmount: Number(repayment.feeAmount),
          penaltyAmount: Number(repayment.penaltyAmount),

          baseAmountDue: Number(repayment.baseAmountDue),
          amountDue: Number(repayment.amountDue),

          amountPaid: Number(repayment.amountPaid),
          principalPaid: Number(repayment.principalPaid),
          interestPaid: Number(repayment.interestPaid),
          feePaid: Number(repayment.feePaid),
          penaltyPaid: Number(repayment.penaltyPaid),

          remainingBalance: Number(
            repayment.remainingBalance,
          ),
        })),

        balance: {
          totalDue,
          totalPaid,
          outstanding,
          progressPercent,
        },
      };
    });

    return {
      ...user,
      loans: loansWithBalance,
    };
  }

  /**
   * Find a user by email.
   */
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User with this email does not exist',
      );
    }

    const { passwordHash, ...result } = user;

    return result;
  }

  /**
   * Generate JWT access token.
   */
  private async signToken(
    userId: string,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),

      expiresIn: (this.config.get<string>(
        'JWT_EXPIRES_IN',
      ) ?? '7d') as any,
    });
  }

  /**
   * Update user's avatar.
   */
  async updateAvatar(
    userId: string,
    avatarUrl: string,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        avatarUrl,
      },

      select: {
        id: true,
        avatarUrl: true,
      },
    });

    return {
      message: 'Avatar updated',
      data: user,
    };
  }

  /**
   * Get paginated borrowers.
   *
   * Includes their loan history for admin/backoffice views.
   */
  async getAllUsers(query: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const page = Math.max(
      Number(query.page ?? 1),
      1,
    );

    const limit = Math.min(
      Math.max(Number(query.limit ?? 50), 1),
      100,
    );

    const search = query.search?.trim() ?? '';

    const users = await this.prisma.user.findMany({
      where: {
        role: 'BORROWER',
        deletedAt: null,

        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  phone: {
                    contains: search,
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },

      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        occupation: true,
        avatarUrl: true,
        kycStatus: true,
        role: true,
        createdAt: true,

        loans: {
          select: {
            id: true,
            amount: true,
            purpose: true,
            status: true,

            // New schema
            termValue: true,
            termUnit: true,

            interestRate: true,
            interestType: true,
            repaymentFrequency: true,

            numberOfInstallments: true,

            totalInterest: true,
            totalFees: true,
            totalPayable: true,

            createdAt: true,
            approvedAt: true,
            disbursedAt: true,
            closedAt: true,
          },

          orderBy: {
            createdAt: 'desc',
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },

      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: {
        page,
        limit,
        count: users.length,
      },
    };
  }




  async getUsersByKycStatus(status: KycStatus) {
  const users = await this.prisma.user.findMany({
    where: { kycStatus: status, role: 'BORROWER', deletedAt: null },
    select: { id: true, name: true, phone: true, email: true, address: true, occupation: true, avatarUrl: true, kycStatus: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return { data: users }
}

async getAllBorrowersKYC() {
  const users = await this.prisma.user.findMany({
    where: { role: 'BORROWER', deletedAt: null },
    select: { id: true, name: true, phone: true, email: true, address: true, occupation: true, avatarUrl: true, kycStatus: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
  return { data: users }
}

async updateKycStatus(userId: string, status: KycStatus, actorId: string, reason?: string) {
  const user = await this.prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundException('User not found')
  if (user.kycStatus !== 'PENDING') throw new BadRequestException(`KYC is already ${user.kycStatus}`)

  const updated = await this.prisma.user.update({
    where: { id: userId },
    data: { kycStatus: status },
  })

  await this.prisma.auditLog.create({
    data: {
      actorId,
      action: status === 'VERIFIED' ? 'KYC_APPROVED' : 'KYC_REJECTED',
      entityType: 'User',
      entityId: userId,
      beforeState: { kycStatus: 'PENDING' },
      afterState: { kycStatus: status, ...(reason ? { reason } : {}) },
    },
  })

  return { message: `KYC ${status === 'VERIFIED' ? 'approved' : 'rejected'}`, data: updated }
}




}
