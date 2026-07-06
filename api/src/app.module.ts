import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoansModule } from './loans/loans.module';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    LoansModule,
    FeedbackModule,
    PaymentsModule,
  ],
  providers: [FeedbackService],
})
export class AppModule {}
