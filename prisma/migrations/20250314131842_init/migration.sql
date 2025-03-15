/*
  Warnings:

  - The `status` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `action` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('VIEWED', 'UPDATED', 'DELETED', 'CREATED');

-- AlterTable
ALTER TABLE "History" DROP COLUMN "action",
ADD COLUMN     "action" "ActionType" NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "plan",
ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'FREE';
