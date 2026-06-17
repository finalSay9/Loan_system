import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  providers: [LoansService],
  controllers: [LoansController],
  exports: [LoansService]
})
export class LoansModule {}
