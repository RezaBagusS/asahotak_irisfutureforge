'use server'

import prisma from "../libs/prisma";

export const getFutureTryout = async (id_user: number) => {
    const res = await prisma.tryout.findMany({
        select: {
            id_tryout: true,
            name: true,
            start_date: true,
            end_date: true,
            countMaterial: true,
        },
        orderBy: {
            start_date: 'asc'
        },
        where: {
            isMiniTO: false,
            end_date: {
                gte: new Date()
            }
        }
    });

    if (!res) {
        return [];
    }

    const resClaimed = await prisma.userTO.findMany({
        select: {
            id_tryout: true
        },
        where: {
            id_user: id_user
        }
    });

    if (!resClaimed) {
        return [];
    }

    return res.map((item) => {
        return {
            id_tryout: item.id_tryout,
            name: item.name,
            start_date: item.start_date,
            end_date: item.end_date,
            countMaterial: item.countMaterial,
            isClaimed: resClaimed.find((claimed) => claimed.id_tryout === item.id_tryout) ? true : false
        }
    });
}

export const getHaveTryout = async (id_user: number) => {
    
    const res = await prisma.userTO.findMany({
        select: {
            id_userTO: true,
            id_user: true,
            id_tryout: true,
        },
        where: {
            id_user: id_user
        }
    });

    if (!res) {
        return {};
    }

    const resTryout = await prisma.tryout.findMany({
        select: {
            id_tryout: true,
            name: true,
            start_date: true,
            end_date: true,
            countMaterial: true,
            isMiniTO: true
        },
        where: {
            id_tryout: {
                in: res.map((item) => item.id_tryout)
            }
        }
    });

    if (!resTryout) {
        return {};
    }

    return {
        id_user: id_user,
        tryout: resTryout.map((item) => {
            return {
                id_tryout: item.id_tryout,
                name: item.name,
                start_date: item.start_date,
                end_date: item.end_date,
                countMaterial: item.countMaterial,
                isMiniTO: item.isMiniTO
            }
        })
    }

}
