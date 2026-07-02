/*
  Warnings:

  - Added the required column `installment_number` to the `repayment_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest_amount` to the `repayment_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principal_amount` to the `repayment_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining_balance` to the `repayment_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repayment_schedules" ADD COLUMN     "installment_number" INTEGER NOT NULL,
ADD COLUMN     "interest_amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "principal_amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "remaining_balance" DECIMAL(15,2) NOT NULL;
