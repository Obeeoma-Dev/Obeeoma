// .config.ts
import type { Config } from "css";

/**
 *  CSS v4 configuration
 * - Fully TypeScript
 * - Scans all TS/TSX files in src
 * - Extends theme with your design system
 */

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", //  scans all React TS/TSX files
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [], // No extra plugins needed now
};

export default config;
