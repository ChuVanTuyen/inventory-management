import { prisma } from '@/libs/backend/prisma';
import { serializeBigInt } from '@/libs/backend/serialize-bigInt';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary
    ] = await Promise.all([
      prisma.products.findMany({
        take: 15,
        orderBy: { stockQuantity: 'desc' }
      }),
      prisma.salesSummary.findMany({
        take: 5,
        orderBy: { date: 'desc' }
      }),
      prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: { date: 'desc' }
      }),
      prisma.expenseSummary.findMany({
        take: 5,
        orderBy: { date: 'desc' }
      }),
      prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: { date: 'desc' }
      })
    ]);

    return NextResponse.json(
      serializeBigInt({
        popularProducts,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategorySummary
      })
    );
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { message: error?.message ?? 'Internal Server Error' },
      { status: 500 }
    );
  }
}
