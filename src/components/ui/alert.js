// Enable client-side rendering for this component
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
// Import utility to merge class names conditionally
import { cn } from "@/lib/utils";
// Import styling variants from separate file to satisfy ESLint
import { alertVariants } from "./alert.styles";
// Define the Alert component
function Alert({ className, // Optional custom class name
variant, // Variant type (e.g. default, destructive)
...props // Other div props
 }) {
    return (_jsx("div", { "data-slot": "alert" // Custom data attribute for targeting/styling
        , role: "alert" // Accessibility role
        , className: cn(alertVariants({ variant }), className), ...props }));
}
// Define the AlertTitle component
function AlertTitle({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-title" // Slot for targeting/styling
        , className: cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", // Default styles
        className // Merge with custom class
        ), ...props }));
}
// Define the AlertDescription component
function AlertDescription({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-description" // Slot for targeting/styling
        , className: cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", // Default styles
        className // Merge with custom class
        ), ...props }));
}
// Export all components for use in other files
export { Alert, AlertTitle, AlertDescription };
