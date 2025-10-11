import type { Config } from "jest";

const config: Config = {
  // Transform JS/TS with Babel
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },

  // Test environment simulating browser
  testEnvironment: "jsdom",

  // Recognize these extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Mock paths and assets
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",              // Alias "@"
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS
    "\\.(png|jpg|jpeg|gif|webp|svg|ttf|eot)$": "<rootDir>/__mocks__/fileMock.ts", // Mock images
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
