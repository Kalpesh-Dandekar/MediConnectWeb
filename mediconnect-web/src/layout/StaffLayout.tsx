"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const StaffLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">
        <Outlet />
      </main>

    </div>
  );
};

export default StaffLayout;