import {
  ExpenseByCategorySummary,
  ExpenseSummary,
  Product,
  PurchaseSummary,
  SalesSummary
} from '../types/global.type';
import { baseApi } from './baseApi';

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics']
    })
  })
});

export const { useGetDashboardMetricsQuery } = dashboardApi;
