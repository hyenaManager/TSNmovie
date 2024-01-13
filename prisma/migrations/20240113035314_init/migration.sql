/*
  Warnings:

  - You are about to drop the column `likes` on the `Clips` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `holder` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Clips" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "content",
ADD COLUMN     "holder" TEXT NOT NULL,
ADD COLUMN     "holderId" INTEGER,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "ratedBy" TEXT[],
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "search" TEXT,
ADD COLUMN     "viewedBy" TEXT[],
ADD COLUMN     "viewedCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "genre" TEXT,
ADD COLUMN     "releasedDate" TEXT,
ADD COLUMN     "viewedBy" TEXT[],
ADD COLUMN     "viewedCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'no bio',
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "image" SET DEFAULT 'https://firebasestorage.googleapis.com/v0/b/tsnproject-4c406.appspot.com/o/users%2F1.svg?alt=media&token=a6d8ef94-0696-401c-b5d1-24a03bd521d3&_gl=1*1x2c3qd*_ga*MTUwMzg0NTkxMS4xNjg0ODU2NzUw*_ga_CW55HF8NVT*MTY5ODMzMzIxMC40OS4xLjE2OTgzMzMyMjcuNDMuMC4w';

-- CreateTable
CREATE TABLE "Suspended" (
    "id" TEXT NOT NULL,
    "suspendedUserEmail" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Suspended_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "telegram" TEXT,
    "whatsapp" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "totalLike" INTEGER NOT NULL,
    "holderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "repliedToUserId" TEXT,
    "userId" TEXT NOT NULL,
    "userImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clipId" INTEGER,
    "parentId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_follow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_like" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Suspended_suspendedUserEmail_key" ON "Suspended"("suspendedUserEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_pageId_key" ON "Contact"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_holderId_key" ON "Likes"("holderId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_follow_AB_unique" ON "_follow"("A", "B");

-- CreateIndex
CREATE INDEX "_follow_B_index" ON "_follow"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_like_AB_unique" ON "_like"("A", "B");

-- CreateIndex
CREATE INDEX "_like_B_index" ON "_like"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likes_AB_unique" ON "_likes"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_B_index" ON "_likes"("B");

-- AddForeignKey
ALTER TABLE "Suspended" ADD CONSTRAINT "Suspended_suspendedUserEmail_fkey" FOREIGN KEY ("suspendedUserEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_repliedToUserId_fkey" FOREIGN KEY ("repliedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Clips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_follow" ADD CONSTRAINT "_follow_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_follow" ADD CONSTRAINT "_follow_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_like" ADD CONSTRAINT "_like_A_fkey" FOREIGN KEY ("A") REFERENCES "Clips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_like" ADD CONSTRAINT "_like_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD CONSTRAINT "_likes_A_fkey" FOREIGN KEY ("A") REFERENCES "Likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD CONSTRAINT "_likes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
