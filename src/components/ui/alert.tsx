// Enable client-side rendering for this component (Next.js specific)
"use client";

// Import React for JSX and component definitions
import * as React from "react";

// Import utility to conditionally merge class names
import { cn } from "@/lib/utils";

// Import styling variants and their type alias
import { alertVariants, AlertVariantProps } from "./alert.styles";

/**
 * Alert component renders a styled alert box.
 * It accepts variant props and native div props.
 */
function Alert({
  className, // Optional custom class name
  variant, // Variant type (e.g. default, destructive)
  ...props // Other native div props
}: React.ComponentProps<"div"> & AlertVariantProps) {
  return (
    <div
      data-slot="alert" // Custom data attribute for targeting/styling
      role="alert" // Accessibility role for screen readers
      className={cn(alertVariants({ variant }), className)} // Merge variant styles with custom class
      {...props} // Spread remaining props like id, aria-label, etc.
    />
  );
}

/**
 * AlertTitle component renders the title section of the alert.
 * Accepts native div props and optional className.
 */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title" // Slot for targeting/styling
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", // Default styles
        className, // Merge with custom class
      )}
      {...props}
    />
  );
}

/**
 * AlertDescription component renders the description section of the alert.
 * Accepts native div props and optional className.
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description" // Slot for targeting/styling
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", // Default styles
        className, // Merge with custom class
      )}
      {...props}
    />
  );
}

// Export all components for use in other files
export { Alert, AlertTitle, AlertDescription };
