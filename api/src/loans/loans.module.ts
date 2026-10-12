import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [LoansService],
  controllers: [LoansController],
  exports: [LoansService]
})
export class LoansModule {}
