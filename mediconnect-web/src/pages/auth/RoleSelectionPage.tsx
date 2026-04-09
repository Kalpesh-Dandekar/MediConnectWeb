"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import RoleCard from "../../components/auth/RoleCard";

const roles = ["Patient", "Doctor", "Caregiver", "Staff"];

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    /* 🔥 NORMALIZE ROLE */
    let role = selectedRole.toLowerCase();

    // 🔥 FIX (Caregiver → Relative)
    if (role === "caregiver") role = "relative";

    /* 🔥 SAVE ROLE */
    localStorage.setItem("role", role);

    /* 🔥 GO TO REGISTER */
    navigate("/auth/register");
  };

  return (
    <AuthLayout>

      <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto px-4">

        {/* BACKGROUND */}
        <div className="absolute -top-32 left-[-150px] w-[400px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-20 right-[-150px] w-[400px] h-[400px] bg-orange-400/10 blur-[150px] rounded-full" />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-gray-500">
            SELECT ROLE
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
            How will you use <br />
            <span className="text-orange-400">
              MediConnect?
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-md mx-auto text-sm">
            Choose your role to continue.
          </p>
        </motion.div>

        {/* ROLES */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {roles.map((role, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <RoleCard
                title={role}
                selected={selectedRole === role}
                onClick={() => setSelectedRole(role)}
              />
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col items-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              w-full max-w-xs py-3 rounded-full font-semibold text-sm
              transition-all duration-300
              ${
                selectedRole
                  ? "bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black hover:scale-105"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            CONTINUE
          </button>

          <p className="mt-5 text-xs text-gray-500 text-center">
            Trusted by 250+ healthcare professionals
          </p>
        </motion.div>

      </div>

    </AuthLayout>
  );
};

export default RoleSelectionPage;