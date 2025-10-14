import type { Config } from "jest";

const config: Config = {
  // Transform JS/TS with Babel
  transform: {
  "^.+\\.(ts|tsx)$": "ts-jest",
  "^.+\\.(js|jsx)$": "babel-jest",
  "\\.(css|less|scss|sass|png|jpg|jpeg|gif|webp|svg|ttf|eot)$": "jest-transform-stub", // Handles both CSS and images
},

  // Test environment simulating browser
  testEnvironment: "jsdom",

  // Recognize these extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Mock paths and assets
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",              // Alias "@"
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS    
  },

  // Ignore these folders
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],

  // Setup files like jest-dom
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Coverage config
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts", "!src/**/index.{ts,tsx}"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "json-summary"],

  verbose: true,
};

export default config;
