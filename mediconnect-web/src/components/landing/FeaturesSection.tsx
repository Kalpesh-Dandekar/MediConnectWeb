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
    <section className="relative py-32">

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            Everything You Need for{" "}
            <span className="text-orange-400">Better Healthcare</span>
          </h2>

          <p className="mt-5 text-gray-400 text-lg leading-relaxed">
            MediConnect brings together appointments, medication tracking,
            emergency support, and digital records — all in one unified platform.
          </p>
        </div>

        {/* 🔥 FEATURE CARDS */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">

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
                  p-8 rounded-2xl
                  bg-white/[0.04] backdrop-blur-xl
                  border border-white/10
                  hover:border-orange-400/40
                  transition-all duration-300
                  hover:shadow-[0_10px_40px_rgba(255,159,28,0.15)]
                "
              >

                {/* 🔶 ICON */}
                <div className="
                  w-14 h-14 flex items-center justify-center
                  rounded-xl
                  bg-orange-400/10 text-orange-400
                  mb-6
                  transition-all duration-300
                  group-hover:scale-110 group-hover:bg-orange-400/20
                ">
                  <Icon size={26} />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-white">
                  {f.title}
                </h3>

                {/* DESC */}
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {f.desc}
                </p>

                {/* 🔥 HOVER ACCENT LINE */}
                <div className="
                  mt-6 h-[2px] w-0
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