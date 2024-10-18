/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `Key` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Key` table. All the data in the column will be lost.
  - You are about to drop the column `active_expires` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `idle_expires` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,providerUserId]` on the table `Key` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `Key` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerUserId` to the `Key` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Key` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Key" DROP CONSTRAINT "Key_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropIndex
DROP INDEX "Key_id_key";

-- DropIndex
DROP INDEX "Key_user_id_idx";

-- DropIndex
DROP INDEX "Session_id_key";

-- DropIndex
DROP INDEX "Session_user_id_idx";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Key" DROP COLUMN "hashed_password",
DROP COLUMN "user_id",
ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "providerUserId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "active_expires",
DROP COLUMN "idle_expires",
DROP COLUMN "user_id",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Key_providerId_providerUserId_key" ON "Key"("providerId", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
