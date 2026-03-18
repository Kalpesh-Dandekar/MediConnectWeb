"use client"

import { motion } from "framer-motion"
import { User, Stethoscope, Users, BadgeCheck } from "lucide-react"

const icons: any = {
  Patient: User,
  Doctor: Stethoscope,
  Caregiver: Users,
  Staff: BadgeCheck,
}

interface Props {
  title: string
  selected: boolean
  onClick: () => void
}

const RoleCard = ({ title, selected, onClick }: Props) => {
  const Icon = icons[title]

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative cursor-pointer
        p-6 md:p-7 rounded-2xl
        border transition-all duration-300

        ${
          selected
            ? "border-orange-400 bg-white/5 shadow-lg shadow-orange-500/20"
            : "border-white/10 bg-white/5 hover:border-white/20"
        }
      `}
    >

      {/* 🔥 glow when selected */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-orange-400/10 blur-xl opacity-40" />
      )}

      <div className="relative z-10 flex flex-col items-center">

        <div className={`
          w-12 h-12 flex items-center justify-center rounded-xl mb-4

          ${
            selected
              ? "bg-orange-400/20 text-orange-400"
              : "bg-white/10 text-gray-400"
          }
        `}>
          <Icon size={22} />
        </div>

        <p className={`
          text-sm md:text-base font-medium

          ${
            selected ? "text-orange-400" : "text-gray-300"
          }
        `}>
          {title}
        </p>

      </div>

    </motion.div>
  )
}

export default RoleCard