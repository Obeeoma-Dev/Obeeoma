// setupTests.ts
// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";
// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";
<<<<<<< Updated upstream
 
globalThis.TextEncoder = TextEncoder;
 
=======
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
>>>>>>> Stashed changes
globalThis.TextDecoder = TextDecoder;
