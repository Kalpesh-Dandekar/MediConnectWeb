"use client"

import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10">

      {/* 🔥 CENTER GLOW */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 
        w-[500px] sm:w-[600px] md:w-[700px] 
        h-[500px] sm:h-[600px] md:h-[700px] 
        bg-orange-400/10 blur-[140px] md:blur-[180px] rounded-full" 
      />

      {/* 🔥 MAIN CONTAINER */}
      <div className="relative max-w-7xl mx-auto w-full">

        {/* CENTER WRAPPER */}
        <div className="flex justify-center">
          <div className="max-w-3xl w-full text-center">

            {/* TOP LABEL */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm tracking-widest text-gray-400"
            >
              NEXT GENERATION
            </motion.p>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
              font-semibold leading-tight text-white"
            >
              Digital{" "}
              <span className="text-orange-400">Healthcare</span>
            </motion.h1>

            {/* TAGLINE */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 sm:mt-5 
              text-base sm:text-xl md:text-2xl 
              font-medium text-blue-300"
            >
              Appointments. Records. Reminders.
            </motion.p>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 sm:mt-5 
              text-sm sm:text-base md:text-lg 
              text-gray-400 leading-relaxed px-2 sm:px-0"
            >
              All unified in one intelligent platform designed for patients,
              doctors, and caregivers.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-5"
            >
              <button className="
                w-full sm:w-auto
                px-6 sm:px-8 md:px-10 
                py-2.5 sm:py-3 
                rounded-xl font-medium 
                text-black text-sm sm:text-base md:text-lg
                bg-gradient-to-r from-[#FF9F1C] to-[#FFB703]
                hover:scale-105 active:scale-95
                transition-all duration-300
                shadow-lg shadow-orange-500/20
              ">
                Get Started
              </button>

              <button className="
                w-full sm:w-auto
                border border-white/20 
                px-6 sm:px-8 md:px-10 
                py-2.5 sm:py-3 
                rounded-xl 
                text-sm sm:text-base md:text-lg
                text-gray-300 hover:text-white
                hover:bg-white/10
                transition-all duration-300
              ">
                Learn More
              </button>
            </motion.div>

            {/* TRUST TEXT */}
            <div className="mt-8 sm:mt-10 text-xs sm:text-sm text-gray-500">
              Trusted by healthcare professionals & patients
            </div>

          </div>
        </div>

        {/* 🔥 HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 sm:mt-20 flex justify-center"
        >
          <div className="w-full max-w-xl 
            rounded-2xl bg-white/5 backdrop-blur-xl 
            border border-white/10 
            p-5 sm:p-6 md:p-7">

            <p className="text-xs sm:text-sm text-gray-400">
              Next Appointment
            </p>

            <h3 className="text-base sm:text-lg font-semibold mt-1 text-white">
              Dr. Sharma • Cardiologist
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Today • 4:30 PM
            </p>

            <div className="mt-4 sm:mt-5 flex justify-between items-center">
              <span className="text-green-400 text-xs sm:text-sm font-medium">
                Confirmed
              </span>

              <button className="text-orange-400 text-xs sm:text-sm font-medium hover:underline">
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