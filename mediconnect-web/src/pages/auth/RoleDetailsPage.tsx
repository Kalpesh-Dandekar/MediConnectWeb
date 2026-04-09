"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { saveRoleDetails } from "../../services/authService";

/* ================= TYPES ================= */

type FormType = {
  [key: string]: string;
};

type InputProps = {
  label: string;
  onChange: (value: string) => void;
};

type SelectProps = {
  label: string;
  options: string[];
  onChange: (value: string) => void;
};

/* ================= COMPONENT ================= */

const RoleDetailsPage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "Patient";

  const [form, setForm] = useState<FormType>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("User not logged in");
        navigate("/auth/login");
        return;
      }

      // 🔥 SAVE PROFILE (same as Flutter backend)
      await saveRoleDetails(user.uid, form);

      // 🔥 REDIRECT BASED ON ROLE
      let path = "";

      if (role === "Patient") path = "/patient/dashboard";
      else if (role === "Doctor") path = "/doctor/dashboard";
      else if (role === "Staff") path = "/staff/dashboard";
      else if (role === "Caregiver") path = "/relative/dashboard";
      else path = "/auth/login";

      navigate(path);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A] text-white flex items-center justify-center px-4 sm:px-6 lg:px-20 overflow-x-hidden">

      <div className="w-full max-w-[1400px]">

        <div className="mb-8 sm:mb-10 text-center lg:text-left">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-white mb-4"
          >
            ← Back
          </button>

          <p className="text-[10px] sm:text-xs tracking-widest text-gray-500">
            PROFILE DETAILS
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            Complete your{" "}
            <span className="text-orange-400">{role}</span> Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative text-center lg:text-left"
          >
            <div className="absolute -top-16 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 
              w-[250px] sm:w-[300px] 
              h-[250px] sm:h-[300px] 
              bg-orange-400/10 blur-[100px] sm:blur-[120px] rounded-full"
            />

            <div className="relative z-10 max-w-md mx-auto lg:mx-0">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Almost there 🚀
              </h2>

              <p className="text-sm sm:text-base text-gray-400">
                Complete your profile to unlock full access to MediConnect features tailored for your role.
              </p>

              <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                <p>✔ Personalized dashboard</p>
                <p>✔ Secure data handling</p>
                <p>✔ Role-based features</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">

              <div className="space-y-4 sm:space-y-5">
                {renderFields(role, handleChange)}
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black hover:scale-[1.02] transition flex justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Finish Registration"
                )}
              </button>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default RoleDetailsPage;

/* ================= FIELD RENDER ================= */

function renderFields(role: string, handleChange: (k: string, v: string) => void) {
  switch (role) {

    case "Patient":
      return (
        <>
          <Input label="Age" onChange={(v) => handleChange("age", v)} />
          <Select label="Gender" options={["Male", "Female", "Other"]} onChange={(v) => handleChange("gender", v)} />
          <Select label="Blood Group" options={["A+", "A-", "B+", "O+", "AB+"]} onChange={(v) => handleChange("bloodGroup", v)} />
          <Input label="Emergency Contact" onChange={(v) => handleChange("emergency", v)} />
          <Input label="City" onChange={(v) => handleChange("city", v)} />
        </>
      );

    case "Doctor":
      return (
        <>
          <Input label="Specialization" onChange={(v) => handleChange("specialization", v)} />
          <Input label="Experience (Years)" onChange={(v) => handleChange("experience", v)} />
          <Input label="License Number" onChange={(v) => handleChange("license", v)} />
          <Input label="Contact Number" onChange={(v) => handleChange("phone", v)} />
        </>
      );

    case "Caregiver":
      return (
        <>
          <Select label="Relation Type" options={["Father", "Mother", "Spouse"]} onChange={(v) => handleChange("relation", v)} />
          <Input label="Patient Name" onChange={(v) => handleChange("patientName", v)} />
          <Input label="Patient Contact" onChange={(v) => handleChange("patientPhone", v)} />
        </>
      );

    case "Staff":
      return (
        <>
          <Select label="Designation" options={["Nurse", "Admin", "Technician"]} onChange={(v) => handleChange("designation", v)} />
          <Input label="Department" onChange={(v) => handleChange("department", v)} />
          <Input label="Staff ID" onChange={(v) => handleChange("staffId", v)} />
          <Input label="Contact Number" onChange={(v) => handleChange("phone", v)} />
        </>
      );

    default:
      return null;
  }
}

/* ================= INPUT ================= */

function Input({ label, onChange }: InputProps) {
  return (
    <input
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none"
    />
  );
}

/* ================= SELECT ================= */

function Select({ label, options, onChange }: SelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#16263A] border border-white/10 text-sm sm:text-base text-white focus:border-orange-400 outline-none"
      defaultValue=""
    >
      <option value="" disabled>{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}