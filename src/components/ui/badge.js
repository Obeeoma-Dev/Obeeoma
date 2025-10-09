// Enable client-side rendering
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
// Import utility for merging class names
import { cn } from "@/lib/utils";
// Import styling variants from separate file
import { badgeVariants } from "./badge.styles";
/**
 * Badge component — renders a styled span or Slot
 */
function Badge({ className, // Optional custom class
variant, // Style variant (default, secondary, etc.)
asChild = false, // Whether to render as Slot or span
...props // Other span props
 }) {
    // Choose the element type based on asChild
    const Comp = asChild ? Slot : "span";
    return (_jsx(Comp, { "data-slot": "badge" // For targeting/styling
        , className: cn(badgeVariants({ variant }), className), ...props }));
}
export { Badge };
