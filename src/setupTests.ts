// Import matchers from jest-dom for extended assertions
// import "@testing-library/jest-dom";

// // Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
// import { TextEncoder, TextDecoder } from "util";

// // Add explicit types for Node.js global
// declare global {
//   // eslint-disable-next-line no-var
//   var TextEncoder: typeof TextEncoder;
//   // eslint-disable-next-line no-var
//   var TextDecoder: typeof TextDecoder;
// }

// globalThis.TextEncoder = TextEncoder;
// globalThis.TextDecoder = TextDecoder;

// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

// Declare global types safely
declare global {
  interface Global {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
  }
}
