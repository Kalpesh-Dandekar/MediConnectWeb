const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-20 sm:mt-24 md:mt-32">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">

          {/* 🔥 LEFT (LOGO + TAGLINE) */}
          <div className="text-center md:text-left">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide">
              Medi<span className="text-orange-400">Connect</span>
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Smart Healthcare, Simplified
            </p>
          </div>

          {/* 🔹 CENTER LINKS */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-400">

            <button
              className="hover:text-white transition"
              type="button"
            >
              Features
            </button>

            <button
              className="hover:text-white transition"
              type="button"
            >
              About
            </button>

            <button
              className="hover:text-white transition"
              type="button"
            >
              Contact
            </button>

          </div>

          {/* 🔹 RIGHT */}
          <div className="text-gray-500 text-xs sm:text-sm text-center md:text-right">
            © 2026 MediConnect
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer