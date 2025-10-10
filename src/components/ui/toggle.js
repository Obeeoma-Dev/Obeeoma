"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";
import { toggleVariants } from "./toggle.styles";
function Toggle({ className, variant, size, ...props }) {
    return (_jsx(TogglePrimitive.Root, { "data-slot": "toggle", className: cn(toggleVariants({ variant, size, className })), ...props }));
}
export { Toggle };
