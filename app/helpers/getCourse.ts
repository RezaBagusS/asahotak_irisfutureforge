'use server'

import prisma from "@/app/libs/prisma";

export async function getAllCourse() {
    const dataCourse = await prisma.course.findMany();

    if (!dataCourse) {
        return [];
    }

    return dataCourse;
}

export async function getCourseBySlug(params: string, name: string, userId: number) {

    if (params === "none") {
        return {
            error: true,
            message: "Course not found"
        }
    }

    const userCourse = await prisma.userCourse.findMany({
        where: {
            id_user: userId,
            id_course: parseInt(params)
        }
    });

    if (!userCourse) {
        return {
            error: true,
            message: "You don't have access to this course"
        }
    }

    const userLesson = await prisma.userLesson.findMany({
        where: {
            id_user: userId
        }
    });

    if (!userLesson) {
        return {
            error: true,
            message: "You don't have access to this course"
        }
    }

    const course = await prisma.course.findUnique({
        select: {
            title: true,
            description: true,
            codeCourse: true,
            countCourse: true,
        },
        where: {
            id: parseInt(params)
        }
    });

    const modifiedPath = name.toString().split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    if (course?.title !== modifiedPath) {
        return {
            error: true,
            message: "Course not found"
        }
    }

    const lesson = await prisma.lesson.findMany({
        where: {
            id_course: parseInt(params)
        }
    })

    if (!course || !lesson) {
        return {
            error: true,
            message: "Course not found"
        };
    }

    const getLesson = lesson.map((item) => {
        return {
            id_lesson: item.id_lesson,
            title: item.title,
            codeLesson: item.codeLesson,
            link_ppt: item.link_ppt,
            link_video: item.link_video,
            link_quiz: item.link_quiz,
            openLesson: item.openLesson,
            id_course: item.id_course,
            isDone: userLesson.filter((userItem) => {
                if (userItem.id_lesson === item.id_lesson) {
                    return userItem.isDone;
                }
            })[0],
            createdAt: item.createdAt
        }
    })

    const { title, description, codeCourse, countCourse } = course;

    return {
        error: false,
        title: title,
        description: description,
        codeCourse: codeCourse,
        countCourse: countCourse,
        percentage: userCourse[0].percentage,
        lesson: getLesson
    };
}

export async function getLessonById(id_course: number) {
    const lesson = await prisma.lesson.findMany({
        where: {
            id_course: id_course
        }
    });

    if (!lesson) {
        return [];
    }

    return lesson;
}

export async function getUserCourse(userId: number) {
    const userCourse = await prisma.userCourse.findMany({
        where: {
            id_user: userId
        }
    });

    if (!userCourse) {
        return [];
    }

    return userCourse;
}
