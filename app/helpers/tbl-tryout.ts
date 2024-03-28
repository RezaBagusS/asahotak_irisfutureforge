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
            Material: {
                select: {
                    id_material: true,
                    name_material: true,
                    countQuestion: true,
                    time: true,
                }
            }
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
            totalMinutes: item.Material.reduce((acc, curr) => acc + curr.time, 0),
            isClaimed: resClaimed.find((claimed) => claimed.id_tryout === item.id_tryout) ? true : false
        }
    });
}

export const getHaveTryout = async (id_user: number) => {
    
    const res = await prisma.userTO.findMany({
        select: {
            id_userTO: true,
            id_user: true,
            Tryout: {
                select: {
                    id_tryout: true,
                    name: true,
                    start_date: true,
                    end_date: true,
                    countMaterial: true,
                    isMiniTO: true,
                }
            },
            userTOMaterial: {
                select: {
                    Material: {
                        select: {
                            id_material: true,
                            name_material: true,
                            countQuestion: true,
                            time: true,
                        }
                    }
                }
            },
            isCompleted: true,
            resultTO: true,
        },
        where: {
            id_user: id_user
        }
    });

    if (!res) {
        return {};
    }

    return {
        error: false,
        message: "Successfull Fetch Data",
        data: res.map((item) => {
            return {
                id_userTO: item.id_userTO,
                id_user: item.id_user,
                Tryout: {
                    id_tryout: item.Tryout.id_tryout,
                    name: item.Tryout.name,
                    start_date: item.Tryout.start_date,
                    end_date: item.Tryout.end_date,
                    countMaterial: item.Tryout.countMaterial,
                    isMiniTO: item.Tryout.isMiniTO,
                },
                totalMinutes: item.userTOMaterial.reduce((acc, curr) => {
                    return acc + curr.Material.time;
                }, 0),
                isCompleted: item.isCompleted,
                resultTO: item.resultTO
            }
        })
    };

}

export const userAccessTO = async (id_user: number, id_tryout: number) => {
    const res = await prisma.userTO.findMany({
        where: {
            id_user: id_user,
            id_tryout: id_tryout
        }
    });

    if (res.length > 0) {
        return true;
    }

    return false;

}

export const getDetailTryout = async (id_user:number, search: string) => {

    const resData = await prisma.userTO.findMany({
        select: {
            id_userTO: true,
            id_user: true,
            id_tryout: true,
            isCompleted: true,
            Tryout: {
                select: {
                    id_tryout: true,
                    name: true,
                    start_date: true,
                    end_date: true,
                    countMaterial: true,
                    isMiniTO: true,
                    Material: {
                        select: {
                            id_material: true,
                            name_material: true,
                            countQuestion: true,
                        }
                    },
                },
            }
        },
        where: {
            id_user: id_user,
        }
    })

    if (!resData) {
        return {
            error: true,
            message: "Unsuccessfull Fetch Data"
        };
    }

    const filteredData = resData.filter((item) => {
        return hashLink(item.Tryout.id_tryout.toString()) === search;
    })

    // console.log("FILTERED DATA : ",filteredData);
    

    if (filteredData.length === 0) {
        return {
            error: true,
            message: "You don't have access this tryout"
        };
    }

    return {
        error: false,
        message: "Successfull Fetch Data",
        data: filteredData[0]
    }

}

export const getStatusMaterial = async (id_user:number, search: string) => {

    if (!id_user || !search) {
        return {
            error: true,
            message: "Invalid Parameter"
        }
    }

    const res = await prisma.tryout.findMany();

    if (!res) {
        return {
            error: true,
            message: "Unsuccessfull Fetch Data"
        };
    }

    const filteredData = res.filter((item) => {
        return hashLink(item.id_tryout.toString()) === search;
    })

    if (filteredData.length === 0) {
        return {
            error: true,
            message: "You don't have access this tryout"
        };
    }

    const resData = await prisma.userTOMaterial.findMany({
        select: {
            id_material: true,
            isCompleted: true,
            userTO: {
                select: {
                    id_user: true,
                    id_tryout: true,
                }
            }
        },
        where: {
            userTO: {
                id_user: id_user,
                id_tryout: filteredData[0].id_tryout
            }
        }
    })

    if (!resData) {
        return {
            error: true,
            message: "Unsuccessfull Fetch Data"
        };
    }

    return {
        error: false,
        message: "Successfull Fetch Data",
        data: resData
    }
}

export const getResultBoard = async (id_user: number) => {

    const res = await prisma.userTO.findMany({
        select: {
            id_user: true,
            Tryout : {
                select: {
                    id_tryout: true,
                    name: true,
                    start_date: true,
                    end_date: true,
                    countMaterial: true,
                }
            },
            isCompleted: true,
            resultTO: true,
        },
        where: {
            id_user: id_user
        }
    })

    const getCompleted = res.filter((item) => item.isCompleted === true);
    const getUpcomingTryout = res.filter((item) => item.Tryout.start_date > new Date());
    let getScoreTryout = 0;

    for (let index = 0; index < res.length; index++) {
        getScoreTryout += res[index].resultTO;
    }

    if (!res) {
        return {
            error: true,
            message: "Unsuccessfull Fetch Data",
        }
    }

    return {
        error: false,
        message: "Successfull Fetch Data",
        data: [
            {
                title: "Your Score",
                score: getScoreTryout,
              },
              {
                title: "Complete Try Out",
                score: getCompleted.length,
              },
              {
                title: "Upcoming Try Out",
                score: getUpcomingTryout.length,
              },
        ]
    }

}
