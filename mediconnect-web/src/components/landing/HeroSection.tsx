"use client"

import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10">

      {/* 🔥 CENTER GLOW */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-400/10 blur-[180px] rounded-full" />

      {/* 🔥 MAIN CONTAINER (ALIGNED WITH WHOLE SITE) */}
      <div className="relative max-w-7xl mx-auto w-full">

        {/* 🔥 PERFECT CENTER WRAPPER */}
        <div className="flex justify-center">
          <div className="max-w-3xl w-full text-center">

            {/* TOP LABEL */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm tracking-widest text-gray-400"
            >
              NEXT GENERATION
            </motion.p>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white"
            >
              Digital{" "}
              <span className="text-orange-400">Healthcare</span>
            </motion.h1>

            {/* TAGLINE */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-xl md:text-2xl font-medium text-blue-300"
            >
              Appointments. Records. Reminders.
            </motion.p>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-gray-400 text-lg leading-relaxed"
            >
              All unified in one intelligent platform designed for patients,
              doctors, and caregivers.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex justify-center gap-5"
            >
              <button className="
                px-10 py-3 rounded-xl font-medium text-black text-lg
                bg-gradient-to-r from-[#FF9F1C] to-[#FFB703]
                hover:scale-105 active:scale-95
                transition-all duration-300
                shadow-lg shadow-orange-500/20
              ">
                Get Started
              </button>

              <button className="
                border border-white/20 px-10 py-3 rounded-xl text-lg
                text-gray-300 hover:text-white
                hover:bg-white/10
                transition-all duration-300
              ">
                Learn More
              </button>
            </motion.div>

            {/* TRUST TEXT */}
            <div className="mt-10 text-sm text-gray-500">
              Trusted by healthcare professionals & patients
            </div>

          </div>
        </div>

        {/* 🔥 HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="w-full max-w-xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-7">

            <p className="text-sm text-gray-400">Next Appointment</p>

            <h3 className="text-lg font-semibold mt-1 text-white">
              Dr. Sharma • Cardiologist
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Today • 4:30 PM
            </p>

            <div className="mt-5 flex justify-between items-center">
              <span className="text-green-400 text-sm font-medium">
                Confirmed
              </span>

              <button className="text-orange-400 text-sm font-medium hover:underline">
                View Details →
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection