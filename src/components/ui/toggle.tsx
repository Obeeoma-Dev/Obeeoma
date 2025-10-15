import * as React from "react";

type BootstrapVariant =
  | "primary"
  // ... other variants
  | "outline-dark";

type BootstrapSize = "sm" | "lg" | undefined;

// 🚨 FIX HERE: Use Omit to exclude 'variant' and 'size' from the native button props
interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "variant" | "size"> {
  variant?: BootstrapVariant;
  size?: BootstrapSize;
}

const classNames = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size, ...props }, ref) => {
    // ... rest of the component logic (which is correct)
    const baseClass = "btn";
    const variantClass = variant ? `btn-${variant}` : "";
    const sizeClass = size ? `btn-${size}` : "";

    const finalClasses = classNames(
      baseClass,
      variantClass,
      sizeClass,
      className,
    );

    return (
      <button type="button" className={finalClasses} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export { Button };
