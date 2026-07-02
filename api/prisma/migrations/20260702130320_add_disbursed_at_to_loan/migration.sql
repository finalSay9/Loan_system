-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "disbursed_at" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rejection_reason" TEXT,
ALTER COLUMN "interest_rate" SET DEFAULT 24.00;
