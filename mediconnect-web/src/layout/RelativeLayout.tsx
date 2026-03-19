"use client";

import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {
  LayoutDashboard,
  Pill,
  FileText,
  User,
} from "lucide-react";

const RelativeLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { icon: LayoutDashboard, label: "Home", path: "/relative/dashboard" },
    { icon: Pill, label: "Medications", path: "/relative/medications" },
    { icon: FileText, label: "Reports", path: "/relative/reports" },
    { icon: User, label: "Profile", path: "/relative/profile" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 pb-20 lg:pb-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">
        <div className="w-full max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E1F31] border-t border-white/10 flex justify-around items-center py-2 lg:hidden">

        {menu.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center text-[10px] transition ${
                isActive ? "text-purple-400" : "text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default RelativeLayout;