import type { Config } from "@jest/types";

/**
 * Jest configuration for a React + TypeScript + Vite project.
 * This ensures:
 *  - TypeScript/TSX files are transformed correctly using ts-jest
 *  - CSS and image imports don’t break tests
 *  - Module alias "@" maps to your src directory
 *  - React DOM environment (jsdom) is used
 */
const config: Config.InitialOptions = {
  // Use ts-jest preset to handle TypeScript and TSX files
  preset: "ts-jest",

  // Simulate a browser-like environment (needed for React components)
  testEnvironment: "jsdom",

  // Recognized file extensions for modules
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // Transform rules tell Jest how to process different file types
  transform: {
    // Use ts-jest to compile .ts and .tsx files
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Tell Jest which modules inside node_modules to ignore during transformation
  transformIgnorePatterns: [
    // Allow react-router-dom (ESM) to be transformed if necessary
    "node_modules/(?!react-router-dom)",
  ],

  // Map special import paths and mock non-JS modules
  moduleNameMapper: {
    // Path alias: allows using "@/something" instead of long relative paths
    "^@/(.*)$": "<rootDir>/src/$1",

    // Mock all CSS/SCSS imports so Jest doesn’t try to read CSS files
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Mock static asset imports like images or fonts
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$":
      "<rootDir>/__mocks__/fileMock.ts",
  },

  // Files to load before running tests — good for setting up Testing Library
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Ignore build folders when running tests
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Collect coverage info from your src folder
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],

  // Coverage report output format
  coverageReporters: ["text", "lcov"],
};

// Export the configuration object
export default config;
