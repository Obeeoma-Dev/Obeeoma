import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};
const Button = React.forwardRef(({ className, variant = "primary", size, ...props }, ref) => {
    // ... rest of the component logic (which is correct)
    const baseClass = "btn";
    const variantClass = variant ? `btn-${variant}` : "";
    const sizeClass = size ? `btn-${size}` : "";
    const finalClasses = classNames(baseClass, variantClass, sizeClass, className);
    return (_jsx("button", { type: "button", className: finalClasses, ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button };
