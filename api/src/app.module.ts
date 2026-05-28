import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← isGlobal makes ConfigService available everywhere
    PrismaModule,
    UsersModule,
  ],
})
export class AppModule {}
