
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateLoanProductDto } from './dto/create-loan-product.dto';
import { UpdateLoanProductDto } from './dto/update-loan-product.dto';

@Injectable()
export class LoanProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get all active loan products.
   *
   * This is the endpoint borrowers use when applying for a loan.
   */
  async getActiveProducts() {
    return this.prisma.loanProduct.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get every product.
   *
   * Intended for administrators.
   */
  async getAllProducts() {
    return this.prisma.loanProduct.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Get a single product.
   *
   * Only active products should normally be exposed to borrowers.
   */
  async getProductById(
    productId: string,
    includeInactive = false,
  ) {
    const product =
      await this.prisma.loanProduct.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      throw new NotFoundException(
        'Loan product not found',
      );
    }

    if (!includeInactive && !product.isActive) {
      throw new NotFoundException(
        'Loan product is not available',
      );
    }

    return product;
  }

  /**
   * Create a new loan product.
   */
  async createProduct(
    dto: CreateLoanProductDto,
  ) {
    this.validateProductRules(dto);

    const existing =
      await this.prisma.loanProduct.findFirst({
        where: {
          name: {
            equals: dto.name,
            mode: 'insensitive',
          },
        },
      });

    if (existing) {
      throw new ConflictException(
        'A loan product with this name already exists',
      );
    }

    return this.prisma.loanProduct.create({
      data: {
        name: dto.name.trim(),
        description: dto.description?.trim(),

        minAmount: dto.minAmount,
        maxAmount: dto.maxAmount,

        interestRate: dto.interestRate,
        interestType: dto.interestType,

        minTermValue: dto.minTermValue,
        maxTermValue: dto.maxTermValue,
        termUnit: dto.termUnit,

        repaymentFrequency:
          dto.repaymentFrequency,

        processingFeeType:
          dto.processingFeeType,

        processingFeeAmount:
          dto.processingFeeAmount ?? 0,

        processingFeeRate:
          dto.processingFeeRate ?? 0,

        lateFeeType: dto.lateFeeType,

        lateFeeAmount:
          dto.lateFeeAmount ?? 0,

        lateFeeRate:
          dto.lateFeeRate ?? 0,

        gracePeriodDays:
          dto.gracePeriodDays,

        isActive: true,
      },
    });
  }

  /**
   * Update an existing loan product.
   */
  async updateProduct(
    productId: string,
    dto: UpdateLoanProductDto,
  ) {
    const existing =
      await this.prisma.loanProduct.findUnique({
        where: {
          id: productId,
        },
      });

    if (!existing) {
      throw new NotFoundException(
        'Loan product not found',
      );
    }

    /**
     * Build the effective configuration after the update.
     *
     * This allows us to validate the final product rather
     * than validating only the fields supplied in PATCH.
     */
    const effective = {
      ...existing,
      ...dto,
    };

    this.validateProductRules(effective);

    if (
      dto.name &&
      dto.name.toLowerCase() !==
        existing.name.toLowerCase()
    ) {
      const duplicate =
        await this.prisma.loanProduct.findFirst({
          where: {
            name: {
              equals: dto.name,
              mode: 'insensitive',
            },
            NOT: {
              id: productId,
            },
          },
        });

      if (duplicate) {
        throw new ConflictException(
          'A loan product with this name already exists',
        );
      }
    }

    return this.prisma.loanProduct.update({
      where: {
        id: productId,
      },

      data: {
        ...(dto.name !== undefined && {
          name: dto.name.trim(),
        }),

        ...(dto.description !== undefined && {
          description: dto.description?.trim(),
        }),

        ...(dto.minAmount !== undefined && {
          minAmount: dto.minAmount,
        }),

        ...(dto.maxAmount !== undefined && {
          maxAmount: dto.maxAmount,
        }),

        ...(dto.interestRate !== undefined && {
          interestRate: dto.interestRate,
        }),

        ...(dto.interestType !== undefined && {
          interestType: dto.interestType,
        }),

        ...(dto.minTermValue !== undefined && {
          minTermValue: dto.minTermValue,
        }),

        ...(dto.maxTermValue !== undefined && {
          maxTermValue: dto.maxTermValue,
        }),

        ...(dto.termUnit !== undefined && {
          termUnit: dto.termUnit,
        }),

        ...(dto.repaymentFrequency !==
          undefined && {
          repaymentFrequency:
            dto.repaymentFrequency,
        }),

        ...(dto.processingFeeType !== undefined && {
          processingFeeType:
            dto.processingFeeType,
        }),

        ...(dto.processingFeeAmount !==
          undefined && {
          processingFeeAmount:
            dto.processingFeeAmount,
        }),

        ...(dto.processingFeeRate !==
          undefined && {
          processingFeeRate:
            dto.processingFeeRate,
        }),

        ...(dto.lateFeeType !== undefined && {
          lateFeeType: dto.lateFeeType,
        }),

        ...(dto.lateFeeAmount !== undefined && {
          lateFeeAmount: dto.lateFeeAmount,
        }),

        ...(dto.lateFeeRate !== undefined && {
          lateFeeRate: dto.lateFeeRate,
        }),

        ...(dto.gracePeriodDays !== undefined && {
          gracePeriodDays:
            dto.gracePeriodDays,
        }),
      },
    });
  }

  /**
   * Activate a loan product.
   */
  async activateProduct(productId: string) {
    const product =
      await this.prisma.loanProduct.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      throw new NotFoundException(
        'Loan product not found',
      );
    }

    if (product.isActive) {
      return product;
    }

    return this.prisma.loanProduct.update({
      where: {
        id: productId,
      },

      data: {
        isActive: true,
      },
    });
  }

  /**
   * Deactivate a loan product.
   *
   * Existing loans are NOT affected because the loan
   * stores a snapshot of the product configuration.
   */
  async deactivateProduct(productId: string) {
    const product =
      await this.prisma.loanProduct.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      throw new NotFoundException(
        'Loan product not found',
      );
    }

    if (!product.isActive) {
      return product;
    }

    return this.prisma.loanProduct.update({
      where: {
        id: productId,
      },

      data: {
        isActive: false,
      },
    });
  }

  /**
   * Validate business-level product rules.
   */
  private validateProductRules(product: {
  minAmount: unknown;
  maxAmount: unknown;
  interestRate: unknown;
  minTermValue: number;
  maxTermValue: number;

  processingFeeType: string;
  processingFeeAmount?: unknown;
  processingFeeRate?: unknown;

  lateFeeType: string;
  lateFeeAmount?: unknown;
  lateFeeRate?: unknown;

  gracePeriodDays: number;
}) {
  if (Number(product.minAmount) > Number(product.maxAmount)) {
    throw new BadRequestException(
      'Minimum loan amount cannot exceed maximum loan amount',
    );
  }

  if (product.minTermValue > product.maxTermValue) {
    throw new BadRequestException(
      'Minimum term cannot exceed maximum term',
    );
  }

  if (Number(product.interestRate) < 0) {
    throw new BadRequestException(
      'Interest rate cannot be negative',
    );
  }

  if (
    product.processingFeeType === 'FIXED' &&
    Number(product.processingFeeAmount ?? 0) < 0
  ) {
    throw new BadRequestException(
      'Processing fee cannot be negative',
    );
  }

  if (
    product.processingFeeType === 'PERCENTAGE' &&
    Number(product.processingFeeRate ?? 0) > 100
  ) {
    throw new BadRequestException(
      'Processing fee rate cannot exceed 100%',
    );
  }

  if (
    product.lateFeeType === 'FIXED' &&
    Number(product.lateFeeAmount ?? 0) < 0
  ) {
    throw new BadRequestException(
      'Late fee cannot be negative',
    );
  }

  if (
    product.lateFeeType === 'PERCENTAGE' &&
    Number(product.lateFeeRate ?? 0) > 100
  ) {
    throw new BadRequestException(
      'Late fee rate cannot exceed 100%',
    );
  }

  if (product.gracePeriodDays < 0) {
    throw new BadRequestException(
      'Grace period cannot be negative',
    );
  }
}
}








