import {
  Body,
  Controller,
  Get,
  Param,
  SetMetadata,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LoanProductsService } from './loan-products.service';
import { CreateLoanProductDto } from './dto/create-loan-product.dto';
import { UpdateLoanProductDto } from './dto/update-loan-product.dto';

import { JwtAuthGuard }  from 'src/auth/guards/jwt.guard'
import { RolesGuard } from  'src/common/guards/roles.guard'


@ApiTags('Loan Products')
@Controller('loan-products')
export class LoanProductsController {
  constructor(
    private readonly loanProductsService: LoanProductsService,
  ) {}

  /**
   * Borrowers need this endpoint when applying for a loan.
   *
   * Only active products are returned.
   */
  @Get()
  @ApiOperation({
    summary: 'Get active loan products',
  })
  async getActiveProducts() {
    return this.loanProductsService.getActiveProducts();
  }

  /**
   * Get a specific active product.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get an active loan product',
  })
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.loanProductsService.getProductById(
      id,
    );
  }

  /**
   * Admin: get all products including inactive products.
   */
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all loan products',
  })
  async getAllProducts() {
    return this.loanProductsService.getAllProducts();
  }

  /**
   * Admin: create a loan product.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a loan product',
  })
  async createProduct(
    @Body() dto: CreateLoanProductDto,
  ) {
    return this.loanProductsService.createProduct(
      dto,
    );
  }

  /**
   * Admin: update a loan product.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update a loan product',
  })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLoanProductDto,
  ) {
    return this.loanProductsService.updateProduct(
      id,
      dto,
    );
  }

  /**
   * Admin: activate a product.
   */
  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Activate a loan product',
  })
  async activateProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.loanProductsService.activateProduct(
      id,
    );
  }

  /**
   * Admin: deactivate a product.
   */
  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Deactivate a loan product',
  })
  async deactivateProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.loanProductsService.deactivateProduct(
      id,
    );
  }
}
