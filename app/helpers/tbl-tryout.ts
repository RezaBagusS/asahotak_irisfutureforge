'use server'

import prisma from "../libs/prisma";
import { hashLink } from "./URLhelpers";

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

export const userAccessTO = async (id_user: number, id_tryout: number) => {
    const res = await prisma.userTO.findMany({
        where: {
            id_user: id_user,
            id_tryout: id_tryout
        }
    });

    console.log("==============");
    
    console.log({
        id_user: id_user,
        id_tryout: id_tryout,
        res: res
    });
    
    console.log("==============");

    if (res.length > 0) {
        return true;
    }

    return false;

}

export const getDetailTryout = async (id_user:number, search: string) => {

    const res = await prisma.tryout.findMany({
        select: {
            id_tryout: true,
            name: true,
            countMaterial: true,
            start_date: true,
            end_date: true,
            isMiniTO: true,
            Material: {
                select: {
                    id_material: true,
                    name_material: true,
                    countQuestion: true,
                }
            }
        },
    });

    if (!res) {
        return {
            error: true,
            message: "Unsuccessfull Fetch Data"
        };
    }

    const getDatabySearch = res.filter((item) => hashLink(item.id_tryout.toString()) === search);

    if (getDatabySearch.length === 0) {
        return {
            error: true,
            message: "Data Not Found"
        };
    }

    const isAccess = await userAccessTO(id_user, getDatabySearch[0].id_tryout);

    if (!isAccess) {
        return {
            error: true,
            message: "You don't have access tryout like this"
        };
    }

    return {
        error: false,
        message: "Successfull Fetch Data",
        data: getDatabySearch[0]
    }
}
