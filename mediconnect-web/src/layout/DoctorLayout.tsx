"use client";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  User,
  LogOut,
} from "lucide-react";

const DoctorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Home", icon: LayoutDashboard, path: "/doctor/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/doctor/appointments" },
    { label: "Patients", icon: Users, path: "/doctor/patients" },
    { label: "Profile", icon: User, path: "/doctor/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0C1B2A] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0E1F31] border-r border-white/10 p-6 flex flex-col">

        {/* LOGO */}
        <div className="mb-10 text-lg font-semibold">
          Doctor Panel
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;

            // ✅ FIXED ACTIVE STATE
            const active = location.pathname.startsWith(item.path);

            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active
                    ? "bg-white/10 text-teal-300"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/auth/login");
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="flex-1 px-8 py-6 max-w-[1400px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;