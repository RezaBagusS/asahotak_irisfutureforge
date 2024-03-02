import { queryDb } from '../../../database/iniDb';
import { NextResponse } from 'next/server'
import { generateAccessToken } from "@/app/helpers/jwt";

export async function POST(request: Request) {

  const data = await request.json();

  const { email, password } = data;
  
  try {
    const results: any = await queryDb({
      query: `SELECT id, username, email, isInsentif, role FROM tb1_user WHERE email = '${email}' AND password = '${password}'`,
    });

    console.log("Results : ", results);

    if (results.length === 0) {
      return NextResponse.json({ 
        error: true,
        message: 'User not found.'
       }, { status: 404 })
    }

    const payload = {
      username: results[0].username,
      email: results[0].email,
    };

    const accessToken = generateAccessToken(payload);

    return NextResponse.json({
      payload,
      accessToken,
      message: 'User Found'
    },{ status: 200 })

  } catch (error) {
    return NextResponse.json({ 
      error: true,
      message: 'Authentication failed. Please try again.'
     }, { status: 500 })
  }
}
