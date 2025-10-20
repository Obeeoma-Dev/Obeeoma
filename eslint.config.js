import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks"; 
import reactRefresh from "eslint-plugin-react-refresh"; 

export default [
    // 1. Global Ignore Patterns
    {
        ignores: ["build/", "dist/", "node_modules/", "coverage/"]
    },

    // 2. Base Configurations (Loaded as separate arrays)
    pluginJs.configs.recommended, 
    ...tseslint.configs.recommended,
    
    // 3. Main Configuration Block for all source files ({js,jsx,ts,tsx})
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        
        // CRITICAL FIX: Define the plugins array here so all rules (including react-hooks) are recognized.
        plugins: {
            react: pluginReact, 
            "react-hooks": reactHooks, // ⬅️ FIX: Register the plugin
            "react-refresh": reactRefresh,
        },
        
        // Configuration extensions
        ...pluginReact.configs.flat.recommended, 
        ...reactRefresh.configs.vite,
        
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        
        settings: {
            react: {
                version: "detect"
            }
        },
        
        // 💡 Rules object: Manually list the React Hooks rules
        rules: {
            // React Hooks Rules (Manual Listing)
            "react-hooks/rules-of-hooks": "error",  // Enforces rules of Hooks
            "react-hooks/exhaustive-deps": "warn",   // Checks for exhaustive dependencies
            
            // Other Custom Rules
            "react/react-in-jsx-scope": "off", 
        }
    },

    // 4. TypeScript Specific Overrides
    {
        files: ["**/*.ts", "**/*.tsx"],
        
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json', 
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "error", 
            "react/prop-types": "off" 
        }
    },
];