'use server'

import prisma from "../libs/prisma";

export const updateProfile = async (id: number, data: any) => {
    
    const res = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            ...data
        }
    });

    if (!res) {
        return {
            error: true,
            message: "Update Profile Failed"
        }
    }
    

    return {
        error: false,
        message: "Update Profile Success",
        data: {
            id: res.id,
            username: res.username,
            email: res.email,
        }
    };
}