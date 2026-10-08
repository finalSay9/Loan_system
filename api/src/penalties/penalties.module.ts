
import { Module } from '@nestjs/common';

import { PenaltyService } from './penalties.service';
import { PenaltyScheduler } from './penalty.scheduler';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    PenaltyService,
    PenaltyScheduler,
  ],

  exports: [
    PenaltyService,
  ],
})
export class PenaltyModule {}
