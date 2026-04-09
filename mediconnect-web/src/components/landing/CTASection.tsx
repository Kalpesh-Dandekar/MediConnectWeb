"use client"

const CTASection = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

        {/* removed motion wrapper for performance */}
        <div
          className="
            relative overflow-hidden
            rounded-2xl sm:rounded-3xl
            bg-white/[0.04] backdrop-blur-xl
            border border-white/10
            px-5 sm:px-8 md:px-16 
            py-10 sm:py-14 md:py-20
            text-center
            shadow-[0_10px_60px_rgba(0,0,0,0.4)]
          "
        >

          {/* 🔶 ORANGE GLOW */}
          <div className="absolute -top-20 -left-20 
            w-[250px] sm:w-[300px] md:w-[350px] 
            h-[250px] sm:h-[300px] md:h-[350px] 
            bg-orange-400/10 blur-[120px] md:blur-[140px] rounded-full" 
          />

          {/* 🔷 BLUE GLOW */}
          <div className="absolute bottom-[-100px] right-[-100px] 
            w-[250px] sm:w-[300px] md:w-[350px] 
            h-[250px] sm:h-[300px] md:h-[350px] 
            bg-blue-400/10 blur-[120px] md:blur-[140px] rounded-full" 
          />

          {/* CONTENT */}
          <div className="relative z-10">

            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight">
              Take Control of Your{" "}
              <span className="text-orange-400">Healthcare</span> Today
            </h2>

            {/* SUBTEXT */}
            <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Join MediConnect and experience smarter healthcare management
              with real-time access, reminders, and emergency support.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

              {/* PRIMARY */}
              <button className="
                w-full sm:w-auto
                px-6 sm:px-8 md:px-10 
                py-2.5 sm:py-3 
                rounded-xl text-sm sm:text-base font-medium
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
                w-full sm:w-auto
                px-6 sm:px-8 md:px-10 
                py-2.5 sm:py-3 
                rounded-xl text-sm sm:text-base
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

        </div>

      </div>
    </section>
  )
}

export default CTASection