'use server'

import prisma from "@/app/libs/prisma";

export async function setCompleteLesson(courseId: number, lessonId: number, userId: number) {

    const response = await prisma.userLesson.findFirst({
        where: {
            id_user: userId,
            id_lesson: lessonId
        }
    });

    if (!response) {

        const transaction = await prisma.$transaction(
            async (tx) => {

                const res = await tx.userLesson.create({
                    data: {
                        id_user: userId,
                        id_lesson: lessonId,
                        id_course: courseId,
                        isDone: true
                    }
                })
        
                if (!res) {
                    return {
                        status: false,
                        message: "Failed while creating user lesson"
                    }
                } else {
        
                    const getCountCourse = await tx.course.findFirst({
                        where: {
                            id: courseId
                        }
                    })
        
                    if (!getCountCourse) {
                        return {
                            status: false,
                            message: "Failed while getting count course"
                        }
                    }
        
                    // TARGET: countCourse
                    const countCourse = getCountCourse.countCourse;
        
                    const getCountLessonCompleted = await tx.userLesson.findMany({
                        where: {
                            id_user: userId,
                            id_course: courseId,
                        }
                    })

                    if (!getCountLessonCompleted) {
                        return {
                            status: false,
                            message: "Failed while getting count lesson completed"
                        }
                    }
        
                    const setPercentage = await tx.userCourse.update({
                        where: {
                            id_user_id_course: {
                                id_user: userId,
                                id_course: courseId
                            }
                        },
                        data: {
                            percentage: (getCountLessonCompleted.length / countCourse) * 100
                        }
                    })
        
                    if (!setPercentage) {
                        return {
                            status: false,
                            message: "Failed while updating percentage user course"
                        }
                    }
        
                    return {
                        status: true,
                        message: "Lesson completed"
                    }
                }
            }
        )

        return transaction;

    } else {
        return {
            status: false,
            message: "Lesson already completed"
        }
    }
    
}