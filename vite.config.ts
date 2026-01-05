// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite configuration
 * - React plugin for JSX/TSX and HMR
 * - Tailwind CSS plugin v4
 * - Path alias "@" for cleaner imports
 */

const env = loadEnv('mode', process.cwd(), ['CLIENT_', 'SERVER_']);

export default defineConfig({

  plugins: [
    react(), // React support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Import like "@/components/Button"
    },
  },
  return: {
    define: {
      'import.meta.env.CLIENT_CLIENT_ID': JSON.stringify(env.CLIENT_CLIENT_ID),
      'import.meta.env.SERVER_API_KEY': JSON.stringify(env.SERVER_API_KEY),
    },
    plugins: [react()],
  },
});


