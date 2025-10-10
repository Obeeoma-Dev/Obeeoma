// Import the `cva` function and `VariantProps` type from class-variance-authority.
// `cva` helps define Tailwind-based style variants, and `VariantProps` extracts type-safe props.
import { cva, type VariantProps } from "class-variance-authority";

// Define buttonVariants using `cva`. This creates a utility for generating class names
// based on variant props like `variant` and `size`.
export const buttonVariants = cva(
  // Base styles applied to all buttons, regardless of variant or size.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    // Define variant groups: `variant` and `size`.
    variants: {
      // `variant` controls the visual style of the button.
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600", // Primary button
        ghost: "bg-transparent hover:bg-gray-100",            // Minimal button
        outline: "border border-gray-300",                    // Bordered button
      },

      // `size` controls the button's dimensions and padding.
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",              // Standard size
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",   // Small button
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",            // Large button

        // ✅ These icon sizes are critical for fixing the `"icon"` type error.
        icon: "size-9",        // Square button for icons
        "icon-sm": "size-8",   // Smaller icon button
        "icon-lg": "size-10",  // Larger icon button
      },
    },

    // Set default values for variant and size.
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Export a type-safe prop helper using VariantProps.
// This allows other components (like <Button /> or <CarouselPrevious />)
// to accept only valid `variant` and `size` values.
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;