const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-32">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* 🔥 LEFT (LOGO + TAGLINE) */}
          <div className="text-center md:text-left">
            <h1 className="text-lg md:text-xl font-semibold text-white tracking-wide">
              Medi<span className="text-orange-400">Connect</span>
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Smart Healthcare, Simplified
            </p>
          </div>

          {/* 🔹 CENTER LINKS */}
          <div className="flex gap-8 text-sm text-gray-400">

            <span className="hover:text-white cursor-pointer transition">
              Features
            </span>

            <span className="hover:text-white cursor-pointer transition">
              About
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Contact
            </span>

          </div>

          {/* 🔹 RIGHT */}
          <div className="text-gray-500 text-sm text-center md:text-right">
            © 2026 MediConnect
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer