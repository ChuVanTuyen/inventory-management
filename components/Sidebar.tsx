"use client";

import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <div>
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-extrabold text-2xl">EDSTOCK</h1>
        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => {}}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="grow mt-8">{/* LINK HERE */}</div>

      {/* FOOTER */}
      <div>
        <p>&copy; 2025 Tuyencv</p>
      </div>
    </div>
  );
}
