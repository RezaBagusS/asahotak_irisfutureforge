'use server'

import prisma from "../libs/prisma";

// id: number;
//     id_course: number;
//     commit_message: string;
//     admin: string;
//     createdAt: Date;
//     link: string;

export const getAllUpdateInfo = async () => {
    const res = await prisma.updateInfo.findMany();
    const resCourse = await prisma.course.findMany();

    if (!res) {
        return [];
    }

    return res.map((item) => {
        return {
            id: item.id,
            id_course: item.id_course,
            course: resCourse.find((course) => course.id === item.id_course)?.title,
            commit_message: item.commit_message,
            admin: item.admin,
            createdAt: item.createdAt,
            link: item.link
        }
    });
}