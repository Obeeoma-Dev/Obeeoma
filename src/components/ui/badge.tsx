// Enable client-side rendering
"use client";

// Import React and Radix Slot for polymorphic rendering
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// Import utility for merging class names
import { cn } from "@/lib/utils";

// Import styling variants from separate file
import { badgeVariants } from "./badge.styles";

/**
 * Badge component — renders a styled span or Slot
 */
function Badge({
  className,       // Optional custom class
  variant,         // Style variant (default, secondary, etc.)
  asChild = false, // Whether to render as Slot or span
  ...props         // Other span props
}: React.ComponentProps<"span"> &
  import("./badge.styles").VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  // Choose the element type based on asChild
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge" // For targeting/styling
      className={cn(badgeVariants({ variant }), className)} // Merge styles
      {...props} // Spread remaining props
    />
  );
}

export { Badge };