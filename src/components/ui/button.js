import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { buttonVariants } from "./button.styles";
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
=======
// Import styles and variant types from button.styles.ts
import { buttonVariants } from "./button.styles";
// Create the Button component using React.forwardRef
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Radix Slot if `asChild` is true, otherwise render a native button
    const Comp = asChild ? Slot : "button";
    return _jsx(Comp, {
      className: cn(buttonVariants({ variant, size }), className),
      ref: ref,
      ...props,
    });
  },
);
// A name for debugging and dev tools
>>>>>>> tests
Button.displayName = "Button";
export { Button };
