// Enable client-side rendering (Next.js specific directive)
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
// Import Slot from Radix for polymorphic rendering
import { Slot } from "@radix-ui/react-slot";
// Import utility to conditionally merge class names
import { cn } from "@/lib/utils";
// Import badge styling variants and their type alias
import { badgeVariants } from "./badge.styles";
/**
 * Badge component — renders a styled span or Slot element
 * Uses CVA for styling variants and Radix Slot for polymorphism
 */
function Badge({
  className, // Optional custom class
  variant, // Style variant (e.g. default, secondary)
  asChild = false, // Whether to render as Slot or span
  ...props // Other native span props
}) {
  // Choose the element type based on asChild flag
  const Comp = asChild ? Slot : "span";
  return _jsx(Comp, {
    "data-slot": "badge", // Custom data attribute for targeting/styling
    className: cn(badgeVariants({ variant }), className),
    ...props,
  });
}
// Export the Badge component for use in other files
export { Badge };
