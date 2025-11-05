"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as TogglePrimitive from "@radix-ui/react-toggle";
// Import utility for merging class names
import { cn } from "@/lib/utils";
// Import styling logic and type-safe props from toggle.styles.ts
import { toggleVariants } from "./toggle.styles";
// Create the Toggle component
function Toggle({ className, variant, size, ...props }) {
    return (_jsx(TogglePrimitive.Root, { "data-slot": "toggle" // Useful for targeting in tests or styling
        , className: cn(toggleVariants({ variant, size }), className), ...props }));
}
export { Toggle };
