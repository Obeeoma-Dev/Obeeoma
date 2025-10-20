import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// 💡 Import plugin object to define it later
import reactHooks from "eslint-plugin-react-hooks"; 
import reactRefresh from "eslint-plugin-react-refresh"; 

export default [
    // 1. Global Ignore Patterns
    {
        ignores: ["build/", "dist/", "node_modules/", "coverage/"]
    },

    // 2. Base Configurations (Loaded as separate arrays to be automatically flattened)
    pluginJs.configs.recommended, 
    ...tseslint.configs.recommended,
    
    // 3. CRITICAL FIX: Explicitly register plugins and apply their rules
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        
        // 💡 CRITICAL FIX: Define the plugins array here
        plugins: {
            // The 'react' plugin is required for 'pluginReact.configs.flat.recommended'
            react: pluginReact, 
            
            // This is the FIX for "could not find plugin 'react-hooks'"
            "react-hooks": reactHooks,
            
            // Define other custom plugins
            "react-refresh": reactRefresh,
        },
        
        // Configuration extensions
        ...pluginReact.configs.flat.recommended, 
        
        // Apply React Hooks rules using the correct access pattern (rules-only object)
        rules: {
            ...reactHooks.configs.recommended.rules, // Apply specific rules
            
            // Custom Rules
            "react/react-in-jsx-scope": "off", 
        },

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