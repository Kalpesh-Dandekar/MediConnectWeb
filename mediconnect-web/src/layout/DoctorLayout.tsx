"use client";

import Sidebar from "../components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DoctorLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-[#0C1B2A] text-white">

      {/* SIDEBAR (AUTO ROLE BASED) */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0C1B2A] to-[#16263A]">

        {/* OPTIONAL CONTAINER FOR BETTER WIDTH */}
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>

      </main>

    </div>
  );
};

export default DoctorLayout;