/*
  Warnings:

  - Added the required column `weekDays` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "weekDays" TEXT NOT NULL;
