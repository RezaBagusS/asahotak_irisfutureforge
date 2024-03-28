'use server'

import prisma from "../libs/prisma";
import { hashLink } from "./URLhelpers";

export async function getInfoTest (id_user: number,id_tryout: string, id_material: number = 0) {
    
    const getIdTO = await prisma.tryout.findMany({
        select: {
            id_tryout: true
        }
    })  

    if (!getIdTO) {
        return {
            error: true,
            message: "Failed to get test data"
        }
    }

    const isMatch = getIdTO.filter((item) => hashLink(item.id_tryout.toString()) === id_tryout)

    if (isMatch.length === 0) {
        return {
            error: true,
            message: "Test not found"
        }
    }

    const getAccess = await prisma.userTOMaterial.findFirst({
        select: {
            userTO: {
                select: {
                    id_user: true,
                    id_tryout: true,
                    Tryout: {
                        select: {
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
                                    time: true,
                                },
                                where: {
                                    id_material: id_material
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            userTO: {
                id_user: id_user,
                id_tryout: isMatch[0].id_tryout
            },
            id_material: id_material
        }
    })

    if (!getAccess) {
        return {
            error: true,
            message: "You don't have access to this test"
        }
    }

    return {
        error: false,
        message: "You have access to this test",
        data: getAccess
    }

}

export async function isAccessTest (id_user: number,id_tryout: string, id_material: number) {

    const getIdTO = await prisma.tryout.findMany({
        select: {
            id_tryout: true
        }
    })

    if (!getIdTO) {
        return {
            error: true,
            message: "Failed to get test data"
        }
    }

    const isMatch = getIdTO.filter((item) => hashLink(item.id_tryout.toString()) === id_tryout)

    if (isMatch.length === 0) {
        return {
            error: true,
            message: "Test not found"
        }
    }

    const access = await prisma.userTOMaterial.findFirst({
        where: {
            userTO: {
                id_user: id_user,
                id_tryout: isMatch[0].id_tryout,
            },
            id_material: id_material
        }
    })

    if (!access) {
        return {
            error: true,
            message: "You don't have access to this test"
        }
    }

    const dateTryout = await prisma.tryout.findFirst({
        select: {
            start_date: true,
            end_date: true
        },
        where: {
            id_tryout: isMatch[0].id_tryout
        }
    })

    const isEnd = dateTryout && new Date(dateTryout.end_date).getTime() < new Date().getTime();

    if (isEnd) {
        return {
            error: true,
            message: "Test has ended"
        }
    }

    const isComplete = await prisma.userTOMaterial.findFirst({
        select: {
            isCompleted: true
        },
        where: {
            userTO: {
                id_user: id_user,
                id_tryout: isMatch[0].id_tryout
            },
            id_material: id_material
        
        }
    })

    if (isComplete && isComplete.isCompleted) {
        return {
            error: true,
            message: "You have completed this test"
        }
    }

    return {
        error: false,
        message: "You have access to this test"
    }

}

export async function getQuestion (id_material: number) {
    
    const getQuestion = await prisma.questions.findMany({
        select: {
            id_soal: true,
            soal: true,
            Material: {
                select: {
                    id_material: true,
                    name_material: true,
                }
            },
        },
        where: {
            id_material: id_material
        }
    })

    // console.log(getQuestion);
    

    if (!getQuestion) {
        return {
            error: true,
            message: "Failed to get question data"
        }
    }

    return {
        error: false,
        message: "Success get question data",
        data: getQuestion
    }
}

export async function getCountQuestion (id_material: number) {

    if (!id_material) {
        return {
            error: true,
            message: "Invalid parameter"
        }
    }

    const getQuestion = await prisma.questions.findMany({
        select: {
            id_soal: true,
            soal: true,
            id_material: true,
        },
        where: {
            id_material: id_material
        }
    })

    if (!getQuestion) {
        return {
            error: true,
            message: "Failed to get question data"
        }
    }

    return {
        error: false,
        message: "Success get question data",
        data: getQuestion
    }

}

export async function getAllDataTest (id_user:number, id_material:number) {

    if (!id_user || !id_material) {
        return {
            error: true,
            message: "Invalid parameter"
        }
    }

    const getAccess = await prisma.userTOMaterial.findFirst({
        select: {
            isCompleted: true,
        },
        where: {
            userTO: {
                id_user: id_user,
            },
            id_material: id_material
        }
    })

    if (getAccess?.isCompleted) {
        return {
            error: true,
            message: "You have completed this subtest"
        }
    }

    const getData = await prisma.userTOMaterial.findFirst({
        select: {
            userTO: {
                select: {
                    id_user: true,
                    id_tryout: true,
                    isCompleted: true,
                    resultTO: true,
                    Tryout: {
                        select: {
                            name: true, 
                            start_date: true,
                            end_date: true,
                            Material: {
                                select: {
                                    id_material: true,
                                    name_material: true,
                                    countQuestion: true,
                                    time: true,
                                    Questions: {
                                        select: {
                                            id_soal: true,
                                            soal: true,
                                        },
                                        where: {
                                            id_material: id_material
                                        }
                                    }
                                },
                                where: {
                                    id_material: id_material
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            userTO: {
                id_user: id_user,
            },
            id_material: id_material
        }
    })

    if (!getData) {
        return {
            error: true,
            message: "Failed to get test data"
        }
    }

    console.log("GET DATA :",getData);
    

    return {
        error: false,
        message: "Success get test data",
        data: getData
    }

}

export async function getAnswer (id_soal: number) {
    
    const getAnswer = await prisma.answer.findMany({
        select: {
            id_soal: true,
            id_answer: true,
            answer: true,
        },
        where: {
            id_soal: id_soal
        }
    })

    if (!getAnswer) {
        return {
            error: true,
            message: "Failed to get answer data"
        }
    }

    return {
        error: false,
        message: "Success get answer data",
        data: getAnswer
    }
}