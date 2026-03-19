"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const RelativeLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white">

      {/* ===== SIDEBAR ===== */}
      <Sidebar />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">

        {/* FULL WIDTH CONTENT */}
        <div className="w-full">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default RelativeLayout;