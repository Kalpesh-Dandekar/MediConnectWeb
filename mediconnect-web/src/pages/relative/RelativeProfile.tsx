"use client";

import { useNavigate } from "react-router-dom";
import { User, Phone, Users, LogOut } from "lucide-react";

const RelativeProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-6 sm:space-y-10">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">

        {/* LEFT */}
        <div className="xl:col-span-4">

          <div className="rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center 
                          bg-gradient-to-br from-[#14283C] to-[#1a3654] 
                          border border-white/5 shadow-lg">

            {/* AVATAR */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl sm:text-2xl font-bold shadow-inner">
              RS
            </div>

            {/* INFO */}
            <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold">
              Rohan Sharma
            </h2>

            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Caregiver Account
            </p>

            {/* SUB INFO */}
            <div className="mt-4 sm:mt-6 w-full border-t border-white/10 pt-3 sm:pt-4 text-xs sm:text-sm text-white/60">
              Monitoring patient:
              <div className="text-white font-medium mt-1">
                Rahul Sharma
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="xl:col-span-8 space-y-4 sm:space-y-6">

          {/* ACCOUNT INFO */}
          <div>
            <SectionTitle title="Account Information" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">

              <InfoCard
                label="Relationship"
                value="Son"
                icon={Users}
              />

              <InfoCard
                label="Linked Patient"
                value="Rahul Sharma"
                icon={User}
              />

              <InfoCard
                label="Phone"
                value="9876543210"
                icon={Phone}
              />

            </div>
          </div>

          {/* LOGOUT */}
          <div className="pt-2 sm:pt-4">

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-xl 
                         bg-red-500/10 text-red-400 border border-red-500/20 
                         hover:bg-red-500/20 transition font-medium text-sm sm:text-base"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RelativeProfile;

/* SECTION TITLE */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-[10px] sm:text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* INFO CARD */

const InfoCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-xl flex items-center gap-3 sm:gap-4 
                    bg-[#14283C] border border-white/5 
                    hover:bg-[#1b3550] hover:scale-[1.02] 
                    transition">

      <div className="p-2 sm:p-3 bg-white/5 rounded-lg">
        <Icon size={16} className="text-purple-400" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs text-white/50">
          {label}
        </p>
        <p className="text-xs sm:text-sm font-medium mt-1 truncate">
          {value}
        </p>
      </div>

    </div>
  );
};