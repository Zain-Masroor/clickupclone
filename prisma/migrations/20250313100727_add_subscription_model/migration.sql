/*
  Warnings:

  - You are about to drop the column `isActive` on the `Subscription` table. All the data in the column will be lost.
  - The `plan` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "isActive",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "plan",
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'FREE';
