'use client';

import { useGetDashboardMetricsQuery } from '@/libs/frontend/services/dashboard';
import CardPopularProducts from './CardPopularProducts';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardSalesSummary from './CardSalesSummary';
import CardExpenseSummary from './CardExpenseSummary';

export default function Dashboard() {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();
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
      <div className="bg-gray-500 md:row-span-1 xl:row-span-2"></div>
      <div className="bg-gray-500 md:row-span-1 xl:row-span-2"></div>
      <div className="bg-gray-500 md:row-span-1 xl:row-span-2"></div>
    </div>
  );
}
