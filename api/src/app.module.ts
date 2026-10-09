import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoansModule } from './loans/loans.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PaymentsModule } from './payments/payments.module';
import { EventsModule } from './events/events.module';
import { LoanProductsModule } from './loan-products/loan-products.module';
import { FeedbackService } from './feedback/feedback.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PenaltyModule } from './penalties/penalty.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),

    PrismaModule,

    UsersModule,
    AuthModule,
    NotificationsModule,

    LoanProductsModule,
    LoansModule,

    FeedbackModule,
    PaymentsModule,
    EventsModule,
    PenaltyModule,
  ],

  providers: [FeedbackService],
})
export class AppModule {}
