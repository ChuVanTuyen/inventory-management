import { prisma } from '@/libs/backend/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc"
      }
    });

    const saleSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    });

    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    });

    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    });

    const expneseByCategory = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    });

    const expenseByCategorySumaryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc"
      }
    });

    const expenseByCategorySumary = expenseByCategorySumaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString()
    }));

    return NextResponse.json({
      popularProducts,
      saleSummary,
      expenseByCategorySumary,
      expneseByCategory,
      expenseSummary,
      purchaseSummary
    });
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