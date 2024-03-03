import { verifyToken } from '@/app/helpers/jwt';
import { queryDb } from '../../../database/iniDb';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {

    const authorizationHeader = req.headers.get('Authorization');
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';

    const decode = verifyToken(token);

    if (!decode) {
        return NextResponse.json({ 
            error: true,
            message: 'Invalid token. Please Login Again'
        }, { status: 401 });
    }

    const data = await req.json();

    const { username, email, password } = data;

    try {
        const results: any = await queryDb({
          query: `UPDATE tb1_user SET username = '${username}', email = '${email}', password = '${password}' WHERE email = '${email}'`,
        });
    
        console.log("Results : ", results);
    
        return NextResponse.json({
          message: 'User information updated successfully'
        },{ status: 200 })
    
      } catch (error) {
        return NextResponse.json({ 
          error: true,
          message: 'Updating failed. Please try again.'
         }, { status: 500 })
      }

}