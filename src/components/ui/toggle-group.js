"use client";
import { jsx as _jsx } from "react/jsx-runtime";
// Import React and Radix Toggle Group primitives.
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
// Utility for merging class names.
import { cn } from "@/lib/utils";
// Import toggleVariants.
import { toggleVariants } from "@/components/ui/toggle.styles";
// Create a context to share variant and size across toggle group items.
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
});
// ToggleGroup component: wraps a group of toggle items.
function ToggleGroup({ className, variant, size, children, ...props }) {
    return (_jsx(ToggleGroupPrimitive.Root, { "data-slot": "toggle-group", "data-variant": variant, "data-size": size, className: cn("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", className), ...props, children: _jsx(ToggleGroupContext.Provider, { value: { variant, size }, children: children }) }));
}
// ToggleGroupItem component: individual toggle button inside the group
function ToggleGroupItem({ className, children, variant, size, ...props }) {
    // Consume variant and size from context if available
    const context = React.useContext(ToggleGroupContext);
    return (_jsx(ToggleGroupPrimitive.Item, { "data-slot": "toggle-group-item", "data-variant": context.variant || variant, "data-size": context.size || size, className: cn(toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
        }), 
        // Additional layout and focus styles
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className), ...props, children: children }));
}
export { ToggleGroup, ToggleGroupItem };
