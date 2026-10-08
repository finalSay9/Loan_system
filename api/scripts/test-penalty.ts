import 'dotenv/config';

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PrismaModule } from '../src/prisma/prisma.module';
import { PenaltyService } from '../src/penalties/penalties.service';

@Module({
  imports: [PrismaModule],
  providers: [PenaltyService],
})
class PenaltyTestModule {}

async function main() {
  const app = await NestFactory.createApplicationContext(
    PenaltyTestModule,
  );

  try {
    const penaltyService =
      app.get(PenaltyService);

    const result =
      await penaltyService.assessOverduePenalties();

    console.log('\nPenalty assessment result:');
    console.dir(result, { depth: null });
  } finally {
    await app.close();
  }
}

main().catch((error) => {
  console.error('\nPenalty test failed:');
  console.error(error);
  process.exit(1);
});