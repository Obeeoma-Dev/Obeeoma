import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    // Example of applying TS rules correctly via overrides
    // Targetting only TypeScript files
    overrides: [
      {
        "files": ["**/*.ts", "**/*.tsx"], 
        "extends": [
          "plugin:@typescript-eslint/recommended"
        ],
        "rules": {
          "@typescript-eslint/no-explicit-any": "error"
        }
      }
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
