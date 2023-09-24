/*
  Warnings:

  - The primary key for the `Clips` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Clips` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Clips` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Clips` table. All the data in the column will be lost.
  - The `id` column on the `Clips` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodeNumber` to the `Episodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clips" DROP CONSTRAINT "Clips_pkey",
DROP COLUMN "content",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "link" TEXT,
ADD COLUMN     "title" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Clips_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Episodes" ADD COLUMN     "episodeNumber" INTEGER NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'https://firebasestorage.googleapis.com/v0/b/tsnproject-4c406.appspot.com/o/users%2FdefaultProfile.jpeg?alt=media&token=df272966-58f1-4a2f-bfa4-224d2a08b675';

-- CreateIndex
CREATE UNIQUE INDEX "Clips_id_key" ON "Clips"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Page_adminId_key" ON "Page"("adminId");
