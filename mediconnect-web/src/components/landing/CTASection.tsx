"use client"

import { motion } from "framer-motion"

const CTASection = () => {
  return (
    <section className="relative py-36">

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            relative overflow-hidden
            rounded-3xl
            bg-white/[0.04] backdrop-blur-xl
            border border-white/10
            px-10 md:px-16 py-16 md:py-20
            text-center
            shadow-[0_10px_60px_rgba(0,0,0,0.4)]
          "
        >

          {/* 🔶 ORANGE GLOW */}
          <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-orange-400/10 blur-[140px] rounded-full" />

          {/* 🔷 BLUE GLOW */}
          <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-400/10 blur-[140px] rounded-full" />

          {/* CONTENT */}
          <div className="relative z-10">

            {/* HEADING */}
            <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              Take Control of Your{" "}
              <span className="text-orange-400">Healthcare</span> Today
            </h2>

            {/* SUBTEXT */}
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Join MediConnect and experience smarter healthcare management
              with real-time access, reminders, and emergency support.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

              {/* PRIMARY */}
              <button className="
                px-10 py-3 rounded-xl text-base font-medium
                text-black
                bg-gradient-to-r from-[#FF9F1C] to-[#FFB703]
                hover:scale-105 active:scale-95
                transition-all duration-300
                shadow-lg shadow-orange-500/20
                hover:shadow-orange-500/40
              ">
                Register Now
              </button>

              {/* SECONDARY */}
              <button className="
                px-10 py-3 rounded-xl text-base
                border border-white/20
                text-gray-300
                hover:text-white
                hover:bg-white/10
                transition-all duration-300
              ">
                Learn More
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default CTASection