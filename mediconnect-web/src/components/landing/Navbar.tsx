"use client"

import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 sm:px-6 md:px-10">

      {/* removed motion wrapper for faster first paint */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* 🔥 LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="
            text-lg sm:text-xl md:text-2xl font-semibold tracking-wide
            text-white cursor-pointer
            transition-all duration-300
            hover:text-orange-300
          "
        >
          Medi<span className="text-orange-400">Connect</span>
        </h1>

        {/* 🚀 CTA */}
        <button
          onClick={() => navigate("/auth/role")}
          className="
            px-5 sm:px-6 md:px-8
            py-2 sm:py-2.5 md:py-3
            rounded-xl
            text-xs sm:text-sm md:text-base font-medium

            text-black
            bg-gradient-to-r from-[#FF9F1C] to-[#FFB703]

            transition-all duration-300
            hover:scale-105 active:scale-95

            shadow-md shadow-orange-500/20
            hover:shadow-orange-500/40
          "
        >
          Get Started
        </button>

      </div>

    </div>
  )
}

export default Navbar