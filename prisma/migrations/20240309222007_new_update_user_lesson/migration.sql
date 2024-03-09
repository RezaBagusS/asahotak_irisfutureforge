/*
  Warnings:

  - You are about to drop the column `inTensif` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `inTensif`,
    ADD COLUMN `getAccess` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `intensif` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `codeCourse` VARCHAR(191) NOT NULL,
    `countCourse` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Course_codeCourse_key`(`codeCourse`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lesson` (
    `id_lesson` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `codeLesson` VARCHAR(191) NOT NULL,
    `link_ppt` VARCHAR(191) NULL,
    `link_video` VARCHAR(191) NULL,
    `link_quiz` VARCHAR(191) NULL,
    `openLesson` BOOLEAN NOT NULL DEFAULT false,
    `id_course` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Lesson_codeLesson_key`(`codeLesson`),
    UNIQUE INDEX `Lesson_id_course_id_lesson_key`(`id_course`, `id_lesson`),
    PRIMARY KEY (`id_lesson`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,
    `percentage` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `userCourse_id_course_fkey`(`id_course`),
    UNIQUE INDEX `userCourse_id_user_id_course_key`(`id_user`, `id_course`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userLesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_lesson` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `userLesson_id_lesson_fkey`(`id_lesson`),
    INDEX `userLesson_id_course_fkey`(`id_course`),
    UNIQUE INDEX `userLesson_id_user_id_lesson_id_course_key`(`id_user`, `id_lesson`, `id_course`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userCourse` ADD CONSTRAINT `userCourse_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userCourse` ADD CONSTRAINT `userCourse_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userLesson` ADD CONSTRAINT `userLesson_ibfk_1` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `userLesson` ADD CONSTRAINT `userLesson_id_lesson_fkey` FOREIGN KEY (`id_lesson`) REFERENCES `Lesson`(`id_lesson`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userLesson` ADD CONSTRAINT `userLesson_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
