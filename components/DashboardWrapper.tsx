'use client';

import { useAppSelector } from '@/lib/store/hooks';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const isSidebaseCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div
      className={`${isDarkMode ? 'dark' : 'light'} flex bg-gray-50 text-gray-900 min-h-screen w-full`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full px-7 py-9 bg-gray-50 ${isSidebaseCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}
