import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh"; 

export default [
    // 1. Global Ignore Patterns
    {
        ignores: ["build/", "dist/", "node_modules/", "coverage/"]
    },

    // 2. Base Configurations (Loaded as separate arrays to be automatically flattened)
    
    // Standard ESLint recommended JS rules
    pluginJs.configs.recommended, 
    
    // Recommended TypeScript rules (CRITICAL FIX for "Unexpected key '0'")
    ...tseslint.configs.recommended,
    
    // Recommended React Hooks rules
    ...pluginReactHooks.configs.recommended, 
    
    // React Refresh/Vite rules
    ...pluginReactRefresh.configs.vite, 


    // 3. Main Configuration Block for all source files ({js,jsx,ts,tsx})
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        
        // Includes React JSX/component rules (from pluginReact)
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
