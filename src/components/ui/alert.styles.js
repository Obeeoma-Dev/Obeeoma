// Import cva for creating class variants
import { cva } from "class-variance-authority";
// Define alertVariants using cva for styling based on variant type
export const alertVariants = cva(
// Base styles applied to all alerts
"relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variants: {
        variant: {
            // Default alert styling
            default: "bg-card text-card-foreground",
            // Destructive alert styling (e.g. errors)
            destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        },
    },
    defaultVariants: {
        variant: "default", // Default variant if none is specified
    },
});
