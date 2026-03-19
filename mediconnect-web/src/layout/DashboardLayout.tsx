"use client";

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white overflow-hidden">

      {/* SIDEBAR (handles mobile internally) */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          overflow-y-auto
          bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]
          
          /* 🔥 RESPONSIVE PADDING */
          p-4 sm:p-6 lg:p-8

          /* 🔥 IMPORTANT: prevent overlap */
          w-full
        "
      >
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;