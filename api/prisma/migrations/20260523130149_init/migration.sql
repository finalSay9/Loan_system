-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BORROWER', 'LOAN_OFFICER', 'ACCOUNTANT', 'COMPLIANCE_OFFICER', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'DISBURSED', 'CLOSED', 'DEFAULTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BORROWER',
    "kyc_status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "interest_rate" DECIMAL(5,2) NOT NULL,
    "term_months" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repayment_schedules" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount_due" DECIMAL(15,2) NOT NULL,
    "amount_paid" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "penalty" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repayment_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "reference" TEXT NOT NULL,
    "provider_ref" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "before_state" JSONB,
    "after_state" JSONB,
    "ip_address" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_reference_key" ON "transactions"("reference");

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayment_schedules" ADD CONSTRAINT "repayment_schedules_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
