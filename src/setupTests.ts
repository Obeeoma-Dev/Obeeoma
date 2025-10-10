// setupTests.ts

// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";

// Add explicit types for Node.js global
declare global {
  interface Global {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
  }
}


