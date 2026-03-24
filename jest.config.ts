import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // Handle TS/TSX files
  testEnvironment: "jsdom", // Needed for React + DOM APIs
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/pages/landingpage/hero.test.js", // ✅ Explicitly exclude problematic file
    "<rootDir>/node_modules/"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TS/TSX
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JS/JSX
    // Transform images to mock files
    "^.+\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileTransformer.cjs",
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-router-dom)",
    ".*\\.test\\.js$", // Ignore problematic .js test files
  ],
  moduleNameMapper: {
    // Map @ alias to src folder
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock static assets - handle all image extensions
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(ttf|eot)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Your testing setup
};

export default config;
