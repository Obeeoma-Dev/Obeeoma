// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite configuration
 * - React plugin for JSX/TSX and HMR
 * - Tailwind CSS plugin v4
 * - Path alias "@" for cleaner imports
 */

export default defineConfig({
  plugins: [
    react(), // React support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Import like "@/components/Button"
    },
  },
});
