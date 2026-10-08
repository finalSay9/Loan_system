
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { PenaltyService } from './penalties.service';
import { PenaltyScheduler } from './penalty.scheduler';

@Module({
  imports: [
    PrismaModule,
  ],

  providers: [
    PenaltyService,
    PenaltyScheduler,
  ],

  exports: [
    PenaltyService,
  ],
})
export class PenaltyModule {}

