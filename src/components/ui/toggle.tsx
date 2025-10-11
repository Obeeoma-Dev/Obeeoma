"use client";

// Import React and Radix Toggle primitives
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

// Import utility for merging class names
import { cn } from "@/lib/utils";

// Import styling logic and type-safe props from toggle.styles.ts
import { toggleVariants, type ToggleVariantProps } from "./toggle.styles";

// Define the props for the Toggle component
// Combines Radix's Toggle props with variant styling props
type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
  ToggleVariantProps;

// Create the Toggle component
function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle" // Useful for targeting in tests or styling
      className={cn(toggleVariants({ variant, size }), className)} // Apply variant styles
      {...props} // Spread remaining props (e.g., onClick, disabled)
    />
  );
}

export { Toggle };
