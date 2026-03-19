"use client";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Pill,
  AlertTriangle,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const rawRole = localStorage.getItem("role");
  let role = rawRole?.trim().toLowerCase() || "patient";

  if (role === "caregiver") role = "relative";

  /* ===== MOBILE NAV (PATIENT ONLY FOR NOW) ===== */

  const mobileMenu = [
    { icon: LayoutDashboard, path: "/patient/dashboard", label: "Home" },
    { icon: CalendarDays, path: "/patient/appointments", label: "Appointments" },
    { icon: AlertTriangle, path: "/patient/emergency", label: "Emergency" },
    { icon: Pill, path: "/patient/medicines", label: "Medicines" },
    { icon: FileText, path: "/patient/reports", label: "Reports" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">
        {children}
      </main>

      {/* MOBILE BOTTOM NAV */}
      {role === "patient" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E1F31] border-t border-white/10 flex justify-around items-center py-2 lg:hidden">

          {mobileMenu.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 text-[10px] transition
                  ${
                    isActive
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
              >
                <Icon size={20} />

                {/* LABEL */}
                <span className="leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default DashboardLayout;