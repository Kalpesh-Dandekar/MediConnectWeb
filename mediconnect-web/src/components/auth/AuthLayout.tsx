"use client"

import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      text-white
      relative overflow-hidden
      bg-gradient-to-br from-[#0C1B2A] to-[#16263A]
    ">

      {/* 🔶 ORANGE GLOW */}
      <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] bg-orange-400/10 blur-[140px] rounded-full" />

      {/* ⚪ WHITE GLOW */}
      <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md px-6">
        {children}
      </div>

    </div>
  )
}

export default AuthLayout