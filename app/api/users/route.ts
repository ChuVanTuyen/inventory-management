import { prisma } from '@/libs/backend/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      {
        message: error?.message ?? 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.users.create({
    data: body,
  });

  return NextResponse.json(user, { status: 201 });
}