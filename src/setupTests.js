// setupTests.ts
// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";
// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
