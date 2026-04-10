import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // ✅ Auto handle GitHub Pages vs Vercel
  base:
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL !== "1"
      ? "/MediConnectWeb/" // GitHub Pages
      : "/", // Vercel / local

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },
});