'use server'

import prisma from "../libs/prisma";

export async function uploadSoal(data: any) {
    const res = await prisma.questions.create({
        data: {
            soal: data.soal,
            id_material: parseInt(data.id_material),
        }
    })

    if (!res) {
        return {
            error: true,
            message: "Failed to upload question"
        }
    }

    return {
        error: false,
        message: "Success upload question"
    };
}