// Import matchers from jest-dom for extended assertions
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";

// Declare global types safely
declare global {
  // eslint-disable-next-line no-var
  var TextEncoder: typeof TextEncoder;
  // eslint-disable-next-line no-var
  var TextDecoder: {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
    prototype: TextDecoder;
  };
}

// Assign the Node polyfills to globalThis
// globalThis.TextEncoder = TextEncoder;

// Safely assign Node.js TextEncoder/TextDecoder to the Jest global scope.
// We cast them to `any` intentionally — this is the *correct* approach in Jest
// since Node's and DOM's decoder constructors differ in type signatures.
if (typeof globalThis.TextEncoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).TextEncoder = TextEncoder;
}

// @ts-expect-error — Node’s TextDecoder type differs from the DOM one, but works fine in Jest.
// globalThis.TextDecoder = NodeTextDecoder as unknown as {
//   new (label?: string, options?: TextDecoderOptions): TextDecoder;
//   prototype: TextDecoder;
// };
if (typeof globalThis.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).TextDecoder = TextDecoder;
}