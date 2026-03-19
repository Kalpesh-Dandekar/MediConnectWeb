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

      // ✅ DO NOT override role here
      const role = localStorage.getItem("role");

      if (!role) {
        alert("Role not selected. Please restart flow.");
        navigate("/auth/role");
        return;
      }

      // ✅ go to details
      navigate("/auth/details");

    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A] text-white flex items-center justify-center px-6 lg:px-20 overflow-hidden">

      <div className="w-full max-w-[1400px] grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex flex-col justify-center"
        >
          <div className="absolute -top-20 left-0 w-[400px] h-[400px] bg-orange-400/10 blur-[140px] rounded-full" />

          <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl font-bold">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                MediConnect
              </span>
            </h1>

            <p className="mt-6 text-gray-400">
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
          <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-3xl p-10">

            <h2 className="text-3xl font-semibold">Login</h2>

            <div className="mt-8 space-y-5">

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              />

            </div>

            <button
              onClick={handleSubmit}
              className="mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black flex justify-center"
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