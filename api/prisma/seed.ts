
import 'dotenv/config';

import { randomBytes } from 'node:crypto';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not defined.',
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const SYSTEM_USER_ID =
  '00000000-0000-4000-8000-000000000001';

const SYSTEM_PHONE = 'SYSTEM-ACTOR';
const SYSTEM_EMAIL =
  'system@loan-system.internal';

async function main() {
  /*
   * Internal system actor.
   *
   * This user exists so automated operations such as:
   *
   * - overdue penalty assessment
   * - scheduled financial jobs
   * - automated compliance operations
   *
   * can have a real actorId in AuditLog.
   */

  const systemPassword =
    randomBytes(32).toString('hex');

  /*
   * We don't need to expose the password.
   *
   * The system account should never be used
   * through the normal authentication flow.
   */
  const passwordHash =
    await import('bcrypt').then(({ hash }) =>
      hash(systemPassword, 12),
    );

  const systemUser =
    await prisma.user.upsert({
      where: {
        id: SYSTEM_USER_ID,
      },

      update: {
        name: 'SYSTEM',
        role: 'SUPER_ADMIN',
        kycStatus: 'VERIFIED',
      },

      create: {
        id: SYSTEM_USER_ID,
        name: 'SYSTEM',
        address: 'INTERNAL',
        occupation: 'SYSTEM',
        phone: SYSTEM_PHONE,
        email: SYSTEM_EMAIL,
        passwordHash,
        role: 'SUPER_ADMIN',
        kycStatus: 'VERIFIED',
      },
    });

  console.log(
    `System actor ready: ${systemUser.id}`,
  );

  console.log(
    `SYSTEM_USER_ID=${systemUser.id}`,
  );
}

main()
  .catch((error) => {
    console.error(
      'Database seed failed:',
      error,
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

