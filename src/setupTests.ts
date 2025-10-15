// setupTests.ts

// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";

// Add explicit types for Node.js global
declare global {
   
  var TextEncoder: typeof TextEncoder;
   
  var TextDecoder: typeof TextDecoder;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.TextDecoder = TextDecoder as any;