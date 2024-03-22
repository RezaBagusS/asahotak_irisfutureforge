'use server'

import prisma from "../libs/prisma";

export const matchVoucher = async (id_user: number, voucher: string) => {

    let alreadyUsed = await prisma.userVoucher.findFirst({
        where: {
            id_user: id_user,
        }
    })

    if (alreadyUsed) {
        return {
            error: true,
            message: "You already used voucher before"
        }
    }

    let res = await prisma.voucher.findFirst({
        where: {
            kode_voucher: voucher,
        }
    });
    
    if (res) {
        let transaction = await prisma.$transaction(
            async (tx) => {

                if (res && res.maxUsage === 0) {
                    return {
                        error: true,
                        message: "Voucher over usage"
                    }
                }

                if (res && res.expired < new Date()) {
                    return {
                        error: true,
                        message: "Voucher expired"
                    }
                }

                let resUserVoucher = await tx.userVoucher.create({
                    data: {
                        id_user: id_user,
                        id_voucher: res?.id_voucher || 0,
                    }
                })

                if (!resUserVoucher) {
                    return {
                        error: true,
                        message: "Failed while creating user voucher"
                    }
                }

                let getUpdateVoucher = await tx.voucher.update({
                    select: {
                        id_voucher: true,
                        id_tryout: true,
                        expired: true,
                        maxUsage: true
                    },
                    where: {
                        id_voucher: res?.id_voucher
                    },
                    data: {
                        maxUsage: (res?.maxUsage ?? 0) - 1
                    }
                })

                if (!getUpdateVoucher) {
                    return {
                        error: true,
                        message: "Failed while updating voucher"
                    }
                }

                let addUserTryout = await tx.userTO.create({
                    data: {
                        id_user: id_user,
                        isCompleted: false,
                        resultTO: 0,
                        id_tryout: getUpdateVoucher.id_tryout,
                    }
                })

                if (!addUserTryout) {
                    return {
                        error: true,
                        message: "Failed while adding user tryout"
                    }
                }

                let getMaterialbyTryout = await tx.material.findMany({
                    where: {
                        id_tryout: getUpdateVoucher.id_tryout
                    }
                })

                if (!getMaterialbyTryout) {
                    return {
                        error: true,
                        message: "Failed while getting material by tryout"
                    }
                }

                let addUserTOMaterial = async(id_material: number) => { 
                    await tx.userTOMaterial.create({
                        data: {
                            id_userTO: addUserTryout.id_userTO,
                            id_material: 1,
                            nilaiMaterial: 0,
                        }
                    }
                )}
                
                for (const item of getMaterialbyTryout) {
                    await addUserTOMaterial(item.id_material);
                }

                let addUserResult = await tx.userResult.create({
                    data: {
                        id_user: id_user,
                        id_tryout: getUpdateVoucher.id_tryout,
                        resultTO: 0,
                    }
                })

                if (!addUserResult) {
                    return {
                        error: true,
                        message: "Failed while adding user result"
                    }
                }
            })
    } else {
        return {
            error: true,
            message: "Voucher not found"
        }
    }

    return {
        error: false,
        message: "Voucher successfully used"
    }
}