'use client';

import { useGetDashboardMetricsQuery } from '@/libs/frontend/services/dashboardApi';
import CardPopularProducts from './CardPopularProducts';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardSalesSummary from './CardSalesSummary';
import CardExpenseSummary from './CardExpenseSummary';
import StatCard from './StartCard';
import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();
  const statCards = [
    {
      title: 'Customer & Expenses',
      primaryIcon: <Package className="text-blue-600 w-6 h-6" />,
      dateRange: '22 - 29 October 2023',
      details: [
        {
          title: 'Customer Growth',
          amount: '175.00',
          changePercentage: 131,
          IconComponent: TrendingUp
        },
        {
          title: 'Expenses',
          amount: '10.00',
          changePercentage: -56,
          IconComponent: TrendingDown
        }
      ]
    },
    {
      title: 'Dues & Pending Orders',
      primaryIcon: <CheckCircle className="text-blue-600 w-6 h-6" />,
      dateRange: '22 - 29 October 2023',
      details: [
        {
          title: 'Dues',
          amount: '250.00',
          changePercentage: 131,
          IconComponent: TrendingUp
        },
        {
          title: 'Pending Orders',
          amount: '147',
          changePercentage: -56,
          IconComponent: TrendingDown
        }
      ]
    },
    {
      title: 'Sales & Discount',
      primaryIcon: <Tag className="text-blue-600 w-6 h-6" />,
      dateRange: '22 - 29 October 2023',
      details: [
        {
          title: 'Sales',
          amount: '1000.00',
          changePercentage: 20,
          IconComponent: TrendingUp
        },
        {
          title: 'Discount',
          amount: '200.00',
          changePercentage: -10,
          IconComponent: TrendingDown
        }
      ]
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts
        popularProducts={dashboardMetrics?.popularProducts ?? []}
        isLoading={isLoading}
      />
      <CardSalesSummary
        salesData={dashboardMetrics?.salesSummary ?? []}
        isLoading={isLoading}
        isError={isError}
      />
      <CardPurchaseSummary
        purchaseSummary={dashboardMetrics?.purchaseSummary || []}
        isLoading={isLoading}
      />
      <CardExpenseSummary
        expenseSummarys={dashboardMetrics?.expenseSummary ?? []}
        expenseByCategorySummary={dashboardMetrics?.expenseByCategorySummary ?? []}
        isLoading={isLoading}
      />
      {statCards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          primaryIcon={card.primaryIcon}
          dateRange={card.dateRange}
          details={card.details}
        />
      ))}
    </div>
  );
}
