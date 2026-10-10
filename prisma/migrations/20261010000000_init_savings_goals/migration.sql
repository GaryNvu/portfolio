-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "SavingsGoal" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(70) NOT NULL,
    "targetCents" INTEGER NOT NULL,
    "savedCents" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavingsGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavingsGoal_updatedAt_idx" ON "SavingsGoal"("updatedAt");