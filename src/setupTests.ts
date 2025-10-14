// setupTests.ts

// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";

// Add explicit types for Node.js global
declare global {
  // eslint-disable-next-line no-var
  var TextEncoder: typeof TextEncoder;
  // eslint-disable-next-line no-var
  var TextDecoder: typeof TextDecoder;
}

globalThis.TextEncoder = TextEncoder as any;
globalThis.TextDecoder = TextDecoder as any;
