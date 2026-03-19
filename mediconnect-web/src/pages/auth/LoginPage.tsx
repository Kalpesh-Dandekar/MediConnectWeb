"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log(form);

    setTimeout(() => {
      setLoading(false);

      const role = localStorage.getItem("role");

      if (!role) {
        alert("Role not selected. Please restart flow.");
        navigate("/auth/role");
        return;
      }

      navigate("/auth/details");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A] text-white flex items-center justify-center px-4 sm:px-6 lg:px-20 overflow-x-hidden">

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex flex-col justify-center text-center lg:text-left"
        >
          <div className="absolute -top-16 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 
            w-[250px] sm:w-[300px] md:w-[400px] 
            h-[250px] sm:h-[300px] md:h-[400px] 
            bg-orange-400/10 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full" 
          />

          <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                MediConnect
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-400">
              Continue managing healthcare seamlessly
            </p>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-md sm:max-w-lg bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">

            <h2 className="text-2xl sm:text-3xl font-semibold text-center lg:text-left">
              Login
            </h2>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base outline-none focus:border-orange-400"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base outline-none focus:border-orange-400"
              />

            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black flex justify-center hover:scale-[1.02] active:scale-95 transition"
            >
              {loading ? "..." : "Login"}
            </button>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;