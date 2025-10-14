// ---------------------------------------------------------
// Utility: Class Name Merger for React Bootstrap
// ---------------------------------------------------------

// Import clsx: a tiny utility to conditionally merge class names
import { clsx, type ClassValue } from "clsx";

/**
 * cn (class name) utility
 * Accepts any number of class name inputs (strings, arrays, conditionals)
 * Uses clsx to merge them into a single string
 * Safe for Bootstrap, ESLint, Prettier, and Jest
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}