"use client"

const points = [
  {
    title: "Faster Emergency Response",
    desc: "Instant doctor access reduces response time during critical situations.",
  },
  {
    title: "Better Medication Adherence",
    desc: "Smart reminders and caregiver alerts ensure patients never miss doses.",
  },
  {
    title: "Seamless Communication",
    desc: "Connect patients, doctors, and caregivers in one unified platform.",
  },
]

const stats = [
  { value: "24/7", label: "Emergency Access" },
  { value: "100%", label: "Digital Records" },
  { value: "Real-time", label: "Doctor Availability" },
]

const ImpactSection = () => {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight">
            Why Choose{" "}
            <span className="text-orange-400">MediConnect</span>
          </h2>

          <p className="mt-4 sm:mt-5 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
            Built to simplify healthcare access, improve safety, and connect
            everyone in the healthcare ecosystem.
          </p>
        </div>

        {/* 💥 STATS */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">

          {stats.map((s, i) => (
            <div
              key={i}
              className="
                p-5 sm:p-6 md:p-8 rounded-2xl
                bg-white/[0.04] backdrop-blur-xl
                border border-white/10
                hover:border-orange-400/40
                transition-all duration-300
                hover:shadow-[0_10px_40px_rgba(255,159,28,0.15)]
              "
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-orange-400">
                {s.value}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400">
                {s.label}
              </p>
            </div>
          ))}

        </div>

        {/* 🔥 POINTS */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

          {points.map((p, i) => (
            <div
              key={i}
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
              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {p.title}
              </h3>

              {/* DESC */}
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                {p.desc}
              </p>

              {/* 🔥 ACCENT LINE */}
              <div className="
                mt-5 sm:mt-6 h-[2px] w-0
                bg-orange-400
                transition-all duration-300
                group-hover:w-16
              " />

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default ImpactSection