// Enable client-side rendering (Next.js specific directive)
"use client";

// Import React for JSX and component definitions
import * as React from "react";

// Import Slot from Radix for polymorphic rendering
import { Slot } from "@radix-ui/react-slot";

// Import utility to conditionally merge class names
import { cn } from "@/lib/utils";

// Import badge styling variants and their type alias
import { badgeVariants, BadgeVariantProps } from "./badge.styles";

/**
 * Props for the Badge component
 * Combines native span props, variant styling, and optional Slot rendering
 */
type BadgeProps = React.ComponentProps<"span"> &
  BadgeVariantProps & {
    asChild?: boolean; // If true, render as Slot instead of span
  };

/**
 * Badge component — renders a styled span or Slot element
 * Uses CVA for styling variants and Radix Slot for polymorphism
 */
function Badge({
  className, // Optional custom class
  variant, // Style variant (e.g. default, secondary)
  asChild = false, // Whether to render as Slot or span
  ...props // Other native span props
}: BadgeProps) {
  // Choose the element type based on asChild flag
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge" // Custom data attribute for targeting/styling
      className={cn(badgeVariants({ variant }), className)} // Merge variant styles with custom class
      {...props} // Spread remaining props like id, aria-label, etc.
    />
  );
}

// Export the Badge component for use in other files
export { Badge };
