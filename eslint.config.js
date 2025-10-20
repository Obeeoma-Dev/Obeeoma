
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// 💡 CRITICAL FIX: Change to import the default/primary export for these plugins
import reactHooks from "eslint-plugin-react-hooks"; 
import reactRefresh from "eslint-plugin-react-refresh"; 

export default [
    // 1. Global Ignore Patterns
    {
        ignores: ["build/", "dist/", "node_modules/", "coverage/"]
    },

    // 2. Base Configurations (Loaded as separate arrays to be automatically flattened)
    
    // Standard ESLint recommended JS rules
    pluginJs.configs.recommended, 
    
    // Recommended TypeScript rules
    ...tseslint.configs.recommended,
    
    // 💡 FIX 1: React Hooks recommended config is often spread directly (no 'configs' property)
    // We access the rules directly on the imported object if it's not an array.
    {
        // Add the rules from the plugin
        rules: reactHooks.configs.recommended.rules // Access the rules object directly
    },
    
    // 💡 FIX 2: React Refresh/Vite rules
    // Include the React Refresh config object directly
    reactRefresh.configs.vite, 


    // 3. Main Configuration Block for all source files ({js,jsx,ts,tsx})
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        
        // Includes React standard configs
        ...pluginReact.configs.flat.recommended, 
        
        languageOptions: {
            // Set language features
            ecmaVersion: 2020,
            sourceType: "module",
            // Define global environments
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        
        settings: {
            // Configure React version detection
            react: {
                version: "detect"
            }
        },
        
        rules: {
            // Common React rule adjustments
            "react/react-in-jsx-scope": "off", 
        }
    },

    // 4. TypeScript Specific Overrides (Applies TS Parser and specific TS rules)
    {
        files: ["**/*.ts", "**/*.tsx"],
        
        languageOptions: {
            // Use the TypeScript parser
            parser: tseslint.parser,
            parserOptions: {
                // IMPORTANT: Enables rules that require type checking
                project: './tsconfig.json', 
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },

        rules: {
            // Enforce explicit types for 'any' usage
            "@typescript-eslint/no-explicit-any": "error", 
            
            // Turn off react/prop-types as TypeScript handles this validation
            "react/prop-types": "off" 
        }
    },
];