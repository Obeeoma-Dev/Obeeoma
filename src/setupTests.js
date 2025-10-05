// setupTests.ts
// This import adds helpful matchers like `toBeInTheDocument`, `toHaveStyle`, etc.
import "@testing-library/jest-dom";
// Polyfill TextEncoder/TextDecoder for Jest (needed by react-router)
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
