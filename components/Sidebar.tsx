'use client';

import { useAppDispatch, useAppSelector } from '@/libs/frontend/store/hooks';
import { setSidebarCollapsed } from '@/libs/frontend/store/slices/global.slice';
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === href || (pathName === '/' && href === '/dashboard');

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive && 'bg-blue-200 text-white'
        }`}
      >
        <Icon className="w-6 h-6 text-gray-700!" />
        <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium text-gray-700`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const toggleSidebar = () => {
    dispatch(setSidebarCollapsed(!isSidebarCollapsed));
  };

  const SIDEBAR_LINKS = [
    {
      href: '/dashboard',
      icon: Layout,
      label: 'Dashboard',
    },
    {
      href: '/inventory',
      icon: Archive,
      label: 'Inventory',
    },
    {
      href: '/products',
      icon: Clipboard,
      label: 'Products',
    },
    {
      href: '/users',
      icon: User,
      label: 'Users',
    },
    {
      href: '/settings',
      icon: SlidersHorizontal,
      label: 'Settings',
    },
    {
      href: '/expenses',
      icon: CircleDollarSign,
      label: 'expenses',
    }
  ];

  return (
    <div
      className={`fixed flex flex-col ${
        isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
      } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`}
    >
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}
      >
        <div>logo</div>
        <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>
          EDSTOCK
        </h1>
        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="grow mt-8">
        {SIDEBAR_LINKS.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className={`mb-10 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
        <p className="text-center text-xs text-gray-500">&copy; 2025 Tuyencv</p>
      </div>
    </div>
  );
}
