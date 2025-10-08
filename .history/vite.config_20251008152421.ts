// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * Vite configuration
 * - React plugin for JSX/TSX and HMR
 * - Tailwind CSS plugin v4
 * - Path alias "@" for cleaner imports
 */

export default defineConfig({
  plugins: [
    react(),       // React support
    tailwindcss(), // Tailwind v4 integration
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Import like "@/components/Button"
      import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {}, // Ensures Rollup compatibility
  },
  optimizeDeps: {
    esbuildOptions: {}, // Forces esbuild instead of Rolldown
  },
});

    },
  },
});
