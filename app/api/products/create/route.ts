import { prisma } from '@/libs/backend/prisma';
import { isValidNumber } from '@/libs/backend/valid-number';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, price, rating, stockQuantity } = await req.json();

    if (!name || !price || !isValidNumber(stockQuantity)) {
      return NextResponse.json(
        { message: 'name, price and stockQuantity are required' },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        productId: crypto.randomUUID(),
        name,
        price,
        rating: rating ?? null,
        stockQuantity: stockQuantity
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
