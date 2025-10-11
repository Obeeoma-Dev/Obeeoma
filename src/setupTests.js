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
// Assign the Node polyfills to globalThis
globalThis.TextEncoder = TextEncoder;
// @ts-expect-error — Node’s TextDecoder type differs from the DOM one, but works fine in Jest.
globalThis.TextDecoder = NodeTextDecoder;
