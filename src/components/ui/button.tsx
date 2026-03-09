import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Import styles and variant types from button.styles.ts
import { buttonVariants, ButtonVariantProps } from "./button.styles";

// Define the ButtonProps interface
// Combines HTML button props with variant styling props
interface ButtonProps
  extends React.ComponentProps<"button">, ButtonVariantProps {
  asChild?: boolean; // Allows rendering as a different element via Radix Slot
}

// Create the Button component using React.forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Radix Slot if `asChild` is true, otherwise render a native button
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

// A name for debugging and dev tools
Button.displayName = "Button";

export { Button };
