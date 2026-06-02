import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // Built-in Node.js module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Directs Recharts and other packages to use clean, modern ES module utilities
      lodash: "lodash-es",
    },
  },
  // Removed optimizeDeps.exclude entirely so Vite can process Recharts correctly
  build: {
    target: "es2018",
    modulePreload: false,
  },
});
