import { queryDb } from '../../../database/iniDb';
import { NextResponse } from 'next/server'
import { generateAccessToken } from "@/app/helpers/jwt";
import prisma from '@/app/libs/prisma';

export async function GET(request: Request) {

  try {
    const data = await prisma.user.findMany();

    // const data: any = await queryDb({
    //   query: `SELECT * FROM user`,
    // });
  
    return NextResponse.json({ 
      message: 'Hello World',
      data: data 
    })
    
  } catch (error:any) {
    return NextResponse.json({
      error: true,
      message: error.message,
      db: process.env.DATABASE_URL
    },{ status: 500
    })
  }
}

export async function POST(request: Request) {

  const data = await request.json();

  const { email, password } = data;
  
  const results = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
    where: {
      email: email,
      password: password
    }
  })
  
  console.log("Results : ", results);

  if (!results) {
    return NextResponse.json({
      error: true,
      message: 'Authentication failed. Please try again.'
    },{ status: 500 })
  }

  if (results.length === 0) {
    return NextResponse.json({ 
      error: true,
      message: 'User not found.'
     }, { status: 404 })
  }

  const payload = {
    id: results[0].id,
    username: results[0].username,
    email: results[0].email,
  };

  const accessToken = generateAccessToken(payload);

  return NextResponse.json({
    payload,
    accessToken,
    message: 'User Found'
  },{ status: 200 })

  // try {
  //   // const results: any = await queryDb({
  //   //   query: `SELECT id, username, email, isInsentif, role FROM tb1_user WHERE email = '${email}' AND password = '${password}'`,
  //   // });


  // } catch (error) {
  //   return NextResponse.json({ 
  //     error: true,
  //     message: 'Authentication failed. Please try again.'
  //    }, { status: 500 })
  // }
}
