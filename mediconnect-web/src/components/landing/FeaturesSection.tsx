"use client"

import { motion } from "framer-motion"
import { Calendar, Pill, Siren } from "lucide-react"

const features = [
  {
    title: "Appointment Booking",
    desc: "Book doctors with real-time availability and manage schedules seamlessly.",
    icon: Calendar,
  },
  {
    title: "Smart Medication",
    desc: "Automated reminders with caregiver alerts to ensure proper medication intake.",
    icon: Pill,
  },
  {
    title: "Emergency Support",
    desc: "Instant access to doctors during emergencies with faster response time.",
    icon: Siren,
  },
]

const FeaturesSection = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-32">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight">
            Everything You Need for{" "}
            <span className="text-orange-400">Better Healthcare</span>
          </h2>

          <p className="mt-4 sm:mt-5 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
            MediConnect brings together appointments, medication tracking,
            emergency support, and digital records — all in one unified platform.
          </p>
        </div>

        {/* 🔥 FEATURE CARDS */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

          {features.map((f, i) => {
            const Icon = f.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="
                  group relative
                  p-5 sm:p-6 md:p-8 rounded-2xl
                  bg-white/[0.04] backdrop-blur-xl
                  border border-white/10
                  hover:border-orange-400/40
                  transition-all duration-300
                  hover:shadow-[0_10px_40px_rgba(255,159,28,0.15)]
                "
              >

                {/* 🔶 ICON */}
                <div className="
                  w-12 h-12 sm:w-14 sm:h-14 
                  flex items-center justify-center
                  rounded-xl
                  bg-orange-400/10 text-orange-400
                  mb-4 sm:mb-6
                  transition-all duration-300
                  group-hover:scale-110 group-hover:bg-orange-400/20
                ">
                  <Icon size={22} className="sm:w-[26px] sm:h-[26px]" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {f.title}
                </h3>

                {/* DESC */}
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {f.desc}
                </p>

                {/* 🔥 HOVER ACCENT LINE */}
                <div className="
                  mt-5 sm:mt-6 h-[2px] w-0
                  bg-orange-400
                  transition-all duration-300
                  group-hover:w-16
                " />

              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  )
}

export default FeaturesSection