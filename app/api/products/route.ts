import { prisma } from '@/libs/backend/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search');
    const products = await prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search
            }
          }
        : undefined
    });

    return NextResponse.json(products);
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { message: error?.message ?? 'Internal Server Error' },
      { status: 500 }
    );
  }
}
