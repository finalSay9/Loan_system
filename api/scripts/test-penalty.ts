import 'dotenv/config';

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PrismaModule } from '../src/prisma/prisma.module';
import { PenaltyService } from '../src/penalties/penalties.service';
import { PrismaService } from '../src/prisma/prisma.service';
import 'reflect-metadata';
import { PARAMTYPES_METADATA } from '@nestjs/common/constants';

@Module({
  imports: [PrismaModule],
  providers: [PenaltyService],
})
class PenaltyTestModule {}

async function main() {
  const app = await NestFactory.createApplicationContext(
    PenaltyTestModule,
    
  );
  console.log(
  'Constructor dependencies:',
  Reflect.getMetadata(
    PARAMTYPES_METADATA,
    PenaltyService,
  )?.map((dependency: unknown) =>
    typeof dependency === 'function'
      ? dependency.name
      : dependency,
  ),
);

console.log(
  'PenaltyService Prisma token matches imported token:',
  Reflect.getMetadata(
    PARAMTYPES_METADATA,
    PenaltyService,
  )?.[0] === PrismaService,
);

console.log(
  'PrismaService registered in module:',
  app.get(PrismaService, { strict: false })?.constructor?.name,
);

  try {
    const penaltyService =
      app.get(PenaltyService);
       console.log(
    'Resolved PrismaService:',
    app.get(PrismaService) instanceof PrismaService,
  );

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