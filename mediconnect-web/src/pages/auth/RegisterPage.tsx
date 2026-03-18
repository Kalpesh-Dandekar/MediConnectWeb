"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const role = localStorage.getItem("role") || "User";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A] text-white flex items-center justify-center px-6 lg:px-20 overflow-hidden">

      {/* MAIN GRID */}
      <div className="w-full max-w-[1400px] grid lg:grid-cols-2 gap-20 items-center">

        {/* 🔥 LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col justify-center"
        >
          {/* Glow Effects */}
          <div className="absolute -top-20 left-0 w-[400px] h-[400px] bg-orange-400/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Join{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                MediConnect
              </span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg">
              A unified healthcare platform to manage patients, streamline workflows, and unlock intelligent insights — all in one place.
            </p>

            <div className="mt-10 space-y-3 text-gray-300">
              <p>✔ Smart appointment scheduling</p>
              <p>✔ Secure medical records</p>
              <p>✔ AI-powered insights</p>
            </div>
          </div>
        </motion.div>

        {/* 🚀 RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/30">

            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={() => navigate("/auth/role")}
              className="text-sm text-gray-400 hover:text-white mb-6"
            >
              ← Back
            </button>

            <p className="text-xs tracking-widest text-gray-500">
              REGISTER
            </p>

            <h2 className="text-3xl font-semibold mt-2">
              Create Account
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Register as{" "}
              <span className="text-orange-400">{role}</span>
            </p>

            {/* FORM */}
            <div className="mt-8 space-y-5">

              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition"
              />

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition"
              />

              <input
                name="confirm"
                type="password"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 outline-none transition"
              />

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black hover:scale-[1.02] active:scale-95 transition shadow-lg shadow-orange-500/20"
            >
              Create Account
            </button>

            {/* LOGIN REDIRECT */}
            <p className="mt-6 text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-orange-400 hover:underline"
              >
                Login
              </button>
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default RegisterPage;