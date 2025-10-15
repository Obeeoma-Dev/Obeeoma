import { jsx as _jsx } from "react/jsx-runtime";
// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cn } from "@/lib/utils";
// import { buttonVariants, ButtonVariantProps } from "./button.styles";
// interface ButtonProps
//   extends React.ComponentProps<"button">,
//     ButtonVariantProps {
//   asChild?: boolean;
// }
// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";
// export { Button};
import * as React from "react";
const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};
const Button = React.forwardRef(({ className, variant = "primary", size, ...props }, ref) => {
    // 1. Start with the base Bootstrap button class
    let baseClass = "btn";
    // 2. Add the variant class (e.g., btn-primary, btn-outline-success)
    const variantClass = variant ? `btn-${variant}` : "";
    // 3. Add the size class (e.g., btn-sm, btn-lg)
    const sizeClass = size ? `btn-${size}` : "";
    // 4. Combine all classes
    const finalClasses = classNames(baseClass, variantClass, sizeClass, className);
    return (_jsx("button", { type: "button" // Default button type
        , className: finalClasses, ref: ref, ...props }));
});
Button.displayName = "Button";
export { Button };
