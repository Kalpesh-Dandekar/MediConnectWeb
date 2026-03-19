"use client";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4">

        {/* AVATAR */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-400 flex items-center justify-center text-black font-bold text-sm sm:text-lg">
          DR
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base sm:text-lg truncate">
            Dr. Michael Smith
          </p>

          <p className="text-xs sm:text-sm text-gray-400">
            Gastroenterologist
          </p>

          <div className="mt-1 sm:mt-2 inline-block px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-green-500/20 text-green-400">
            On Duty
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
            License ID: DOC-78623
          </p>
        </div>
      </div>

      {/* PROFESSIONAL INFO */}
      <Section title="Professional Information">
        <Info label="Experience" value="8 Years" />
        <Info label="Qualification" value="MD, MBBS" />
        <Info label="Department" value="Gastroenterology" />
        <Info label="Hospital" value="City Care Hospital" />
        <Info label="Email" value="doctor@mediconnect.com" />
      </Section>

      {/* AVAILABILITY */}
      <Section title="Availability">
        <Info label="Days" value="Mon - Sat" />
        <Info label="Time" value="10:00 AM - 5:00 PM" />
        <Info label="Consultation Fee" value="₹800" />
      </Section>

      {/* ACCOUNT */}
      <Section title="Account">

        <Action
          title="Edit Profile"
          onClick={() => alert("Edit Profile")}
        />

        <Action
          title="Change Password"
          onClick={() => alert("Change Password")}
        />

        <Action
          title="Logout"
          danger
          onClick={handleLogout}
        />

      </Section>

    </div>
  );
};

export default Profile;

/* ================= COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <div className="mb-6 sm:mb-8">
    <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 tracking-wider uppercase">
      {title}
    </p>
    <div className="space-y-2">{children}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 rounded-xl text-xs sm:text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const Action = ({
  title,
  onClick,
  danger = false,
}: {
  title: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm transition ${
      danger
        ? "text-red-400 bg-red-500/10 hover:bg-red-500/20"
        : "bg-white/5 hover:bg-white/10"
    }`}
  >
    {title}
  </button>
);