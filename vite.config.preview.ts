import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

/**
 * Preview-only build: bundles the ENTIRE app (including Three.js) into a single
 * self-contained index.html with everything inlined — no code-splitting, no
 * external requests — so it can be hosted as a standalone Artifact page.
 * Not for production (production uses vite.config.ts + prerendering).
 */
export default defineConfig({
  define: {
    "import.meta.env.VITE_SINGLEFILE": JSON.stringify("true"),
  },
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    target: "es2020",
    outDir: "dist-preview",
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000_000,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
