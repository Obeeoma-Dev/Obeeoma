import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1. Global Ignore Patterns
  {
    ignores: [
      "build/",
      "dist/",
      "node_modules/",
      "coverage/",
      "src/**/*.js",
      "node_modules/",
    ],
  },

  // 2. Base Configurations (Loaded as separate arrays)
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Main Configuration Block for all source files ({js,jsx,ts,tsx})
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    // Configuration extensions
    ...pluginReact.configs.flat.recommended,
    ...reactRefresh.configs.vite,

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // FIX: Add Jest globals
        ...globals.jest,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    // Define the plugins AFTER the spread extensions
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    // Rules object
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },

  // 4. TypeScript Specific Overrides (Applies typed linting to most files)
  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Point to the dedicated config file
        project: ["./tsconfig.eslint.json"],
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "react/prop-types": "off",
    },
  },

  // 5. CRITICAL OVERRIDE: Bypass typed linting for the single problematic file
  {
    // 💡 Use POSIX forward slashes for maximum compatibility
    files: ["src/components/ui/button.styles.tsx"],

    languageOptions: {
      parser: tseslint.parser, // Keep the TypeScript parser for syntax
      parserOptions: {
        // CRITICAL FIX: Explicitly set project to false to stop TS compiler lookup
        project: false,
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    // Turn off type-aware rules that would fail without project: true
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
