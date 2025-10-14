import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",               // Handle TS/TSX files
  testEnvironment: "jsdom",        // Needed for React + DOM APIs
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",  // Transform TS/TSX
    
     // Transform images
    "^.+\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileTransformer.cjs"
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-router-dom)" // transform react-router-dom if needed
  ],
  moduleNameMapper: {
    // Map @ alias to src folder
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock static assets
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.ts"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Your testing setup
};

export default config;
