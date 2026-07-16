import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  // Base path is "/" in production (custom domain) but is set to the repo
  // sub-path for GitHub Pages preview builds via VITE_BASE (e.g. /FlyWorldIndia/).
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    // Keep Three.js out of the main bundle. It only ships when the globe
    // is actually rendered (lazy Suspense import in Home). See CLAUDE.md.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/react")) return "react-vendor";
        },
      },
    },
  },
});
