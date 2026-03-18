

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../../components/auth/AuthLayout"
import RoleCard from "../../components/auth/RoleCard"

const roles = ["Patient", "Doctor", "Caregiver", "Staff"]

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!selectedRole) return
    localStorage.setItem("role", selectedRole)
    navigate("/auth/register")
  }

  return (
    <AuthLayout>

      {/* 🔥 WRAPPER */}
      <div className="relative w-full max-w-5xl mx-auto">

        {/* 🌌 BACKGROUND GLOWS (SUBTLE DEPTH ONLY) */}
        <div className="absolute -top-32 left-[-200px] w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full" />
        <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-orange-400/10 blur-[180px] rounded-full" />

        {/* ✨ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-gray-500">
            SELECT ROLE
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mt-4 text-white leading-tight">
            How will you use <br />
            <span className="text-orange-400">MediConnect?</span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-base">
            Choose your role to personalize your experience and unlock features tailored just for you.
          </p>
        </motion.div>

        {/* 💥 ROLE GRID */}
        <div className="grid grid-cols-2 gap-10 max-w-3xl mx-auto">
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

        {/* 🚀 BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-col items-center"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              relative overflow-hidden
              w-72 py-4 rounded-full font-semibold tracking-wide text-sm
              transition-all duration-300

              ${
                selectedRole
                  ? "bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {selectedRole && (
              <span className="absolute inset-0 bg-white/10 blur-xl opacity-20" />
            )}

            <span className="relative z-10">
              CONTINUE
            </span>
          </button>

          {/* 🧠 TRUST LINE */}
          <p className="mt-6 text-sm text-gray-500">
            Trusted by 250+ healthcare professionals
          </p>
        </motion.div>

      </div>

    </AuthLayout>
  )
}

export default RoleSelectionPage