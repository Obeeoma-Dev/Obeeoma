
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// 💡 New Imports from the image/common React setup
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh"; 

// Using the define config wrapper from the image (optional, but good practice if available)
// import { defineFlatConfig } from 'eslint-define-config';

export default [
    // 1. Ignore Patterns (globalIgnores from the image, and your list)
    {
        ignores: ["build/", "dist/", "node_modules/"]
    },

    // 2. Base Configuration for ALL files (JS/General rules)
    pluginJs.configs.recommended,
    
    // 3. Main Configuration Block for all source files ({js,jsx,ts,tsx})
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        
        // Language Options
        languageOptions: {
            ecmaVersion: 2020, // From the image
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        
        // Base Plugins (The plugins key is often omitted in Flat Config when using plugin configs)
        // We ensure React config is included
        ...pluginReact.configs.flat.recommended,
        
        // 💡 NEW: React Hooks and React Refresh from the image
        ...pluginReactHooks.configs.recommended, // React Hooks rules
        
        // This is often an array, but we can spread it if your vite config returns one object
        // Assuming your setup uses the vite plugin correctly:
        ...pluginReactRefresh.configs.vite, 
        
        settings: {
            react: {
                version: "detect"
            }
        },
        
        rules: {
            // General React rules
            "react/react-in-jsx-scope": "off", // Common for React 17+ / Next.js
        }
    },

    // 4. TypeScript Overrides (Stricter rules for .ts and .tsx files)
    {
        files: ["**/*.ts", "**/*.tsx"],
        
        // Use the TS parser for these files
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                // Ensure project is set for rules requiring type information
                project: './tsconfig.json', 
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },

        // Extending TS recommended configurations
        ...tseslint.configs.recommended,
        
        rules: {
            // This is the rule that fixes your original error:
            "@typescript-eslint/no-explicit-any": "error", 
            
            // Turn off react/prop-types since TS handles it
            "react/prop-types": "off" 
        }
    },
];