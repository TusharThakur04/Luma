/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_userid_key" ON "Project"("userid");
