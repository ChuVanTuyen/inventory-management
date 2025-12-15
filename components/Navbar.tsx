"use client";

import { Bell, Menu, Sun } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full mb-7">
      {/* Left side  */}
      <div className="flex items-center justify-between gap-5">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => { }}>
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <input
          type="search"
          placeholder="Search products"
          className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Bell className="text-gray-500" size={20} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="hidden md:flex items-center justify-between gap-5">
          <div>
            <button className="cursor-pointer" onClick={() => { }}>
              <Sun className="text-gray-500" size={24} />
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" />
            <span
              className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full"
            >
              2
            </span>
          </div>
          <hr className="w-0 h-7 border-r border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer"></div>
        </div>
      </div>https://youtu.be/ddKQ8sZo_v8?si=5gPnAdEOqcdS0Gyb&t=2543
    </div>
  );
}