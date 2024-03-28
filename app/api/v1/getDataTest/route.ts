import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import { getAllDataTest } from '@/app/helpers/testHelpers';

export async function POST(request: Request) {

    try {
        const req = await request.json();

        const { id_user, id_material } = req;

        console.log('id_user', id_user);
        console.log('id_material', id_material);

        const data = await getAllDataTest(id_user, id_material);

        console.log('DATA', data);
    
        if (data.error) {
            return NextResponse.json({
                error: true,
                message: data.message
            }, { status: 400 })
        }

        return NextResponse.json({
            error: false,
            message: data.message,
            data: data.data 
        }, { status: 200 })
        
    } catch (error:any) {
        return NextResponse.json({
        error: true,
        message: error.message,
        },{ status: 500
        })
    }

}

