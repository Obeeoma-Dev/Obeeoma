"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
// Import the converted Button component
import { Button } from "@/components/ui/button";
// Note: buttonVariants is no longer a CVA function, but we need its types,
// which are now internal to the Button component's type definitions.
// Utility to combine class names (reusing the one from the Button file)
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", // Cast to CvaVariant for default
formatters, components, ...props }) {
    // getDefaultClassNames provides the base 'react-day-picker' classes
    const defaultClassNames = getDefaultClassNames();
    // Helper to map CVA variant to Bootstrap-styled button for internal use
    // We'll map the CVA variant props to the Button component, which handles the Bootstrap classes.
    const getNavButtonClasses = (isNext = false) => {
        // The old CVA definition was complex, mapping a CVA variant to many Tailwind classes.
        // Now, the styling is handled by the Button component itself using the variant/size props.
        const baseButtonClass = cn("p-0 opacity-50 select-none", // General styling for small, square buttons
        "btn-sm text-decoration-none", // Using Bootstrap button sizing
        isNext
            ? defaultClassNames.button_next
            : defaultClassNames.button_previous);
        return baseButtonClass;
    };
    return (_jsx(DayPicker, { showOutsideDays: showOutsideDays, 
        // Replaced complex Tailwind with simple Bootstrap card/utility classes
        className: cn("card p-3", "bg-white", // Default background
        className), captionLayout: captionLayout, formatters: {
            formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
            ...formatters,
        }, classNames: {
            root: cn("w-auto", defaultClassNames.root),
            months: cn("d-flex flex-column flex-md-row position-relative", defaultClassNames.months),
            month: cn("d-flex flex-column w-100", defaultClassNames.month),
            nav: cn("d-flex align-items-center w-100 position-absolute top-0 start-0 justify-content-between", defaultClassNames.nav),
            // Use the Button component logic for navigation
            button_previous: getNavButtonClasses(false),
            button_next: getNavButtonClasses(true),
            month_caption: cn("d-flex align-items-center justify-content-center w-100 px-3", defaultClassNames.month_caption),
            // Simplification of dropdowns to standard Bootstrap forms
            dropdowns: cn("w-100 d-flex align-items-center fs-6 fw-bold justify-content-center gap-2", defaultClassNames.dropdowns),
            dropdown_root: cn("position-relative border rounded", // simplified border/shadow
            defaultClassNames.dropdown_root),
            dropdown: cn("position-absolute bg-white opacity-0", // simplified
            defaultClassNames.dropdown),
            caption_label: cn("select-none fw-bold", captionLayout === "label"
                ? "fs-6"
                : "rounded-3 p-2 d-flex align-items-center gap-1 fs-6", defaultClassNames.caption_label),
            table: "table table-borderless",
            weekdays: cn("d-flex", defaultClassNames.weekdays),
            weekday: cn("text-muted rounded-3 flex-fill fw-normal small select-none", defaultClassNames.weekday),
            week: cn("d-flex w-100 mt-2", defaultClassNames.week),
            day: cn("position-relative w-100 h-100 p-0 text-center select-none", defaultClassNames.day),
            // These range classes are highly custom and must be implemented via custom CSS if needed
            range_start: cn("rounded-start bg-primary text-white", defaultClassNames.range_start),
            range_middle: cn("rounded-0 bg-light", defaultClassNames.range_middle),
            range_end: cn("rounded-end bg-primary text-white", defaultClassNames.range_end),
            today: cn("bg-secondary text-white rounded-3", defaultClassNames.today),
            outside: cn("text-muted-foreground", defaultClassNames.outside),
            disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
            hidden: cn("d-none", defaultClassNames.hidden),
            ...classNames,
        }, components: {
            // ... Root and Chevron components (left largely alone as they are simple wrappers)
            Root: ({ className, rootRef, ...props }) => {
                return (_jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className), ...props }));
            },
            Chevron: ({ className, orientation, ...props }) => {
                // ... logic remains the same (Lucide icons are fine)
                if (orientation === "left") {
                    return (_jsx(ChevronLeftIcon, { className: cn("size-4", className), ...props }));
                }
                if (orientation === "right") {
                    return (_jsx(ChevronRightIcon, { className: cn("size-4", className), ...props }));
                }
                return (_jsx(ChevronDownIcon, { className: cn("size-4", className), ...props }));
            },
            DayButton: CalendarDayButton,
            WeekNumber: ({ children, ...props }) => {
                return (_jsx("td", { ...props, children: _jsx("div", { className: "d-flex align-items-center justify-content-center text-center", children: children }) }));
            },
            ...components,
        }, ...props }));
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
    const defaultClassNames = getDefaultClassNames();
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (modifiers.focused)
            ref.current?.focus();
    }, [modifiers.focused]);
    // Map CVA size "icon" to the smallest Bootstrap size "sm" (or just rely on padding=0)
    const buttonSize = "sm";
    return (_jsx(Button, { ref: ref, variant: "outline-secondary" // Use a valid BootstrapVariant for the Button component
        , size: buttonSize, "data-day": day.date.toLocaleDateString(), "data-selected-single": modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle, "data-range-start": modifiers.range_start, "data-range-end": modifiers.range_end, "data-range-middle": modifiers.range_middle, 
        // Massively simplified custom CSS logic for range selection (now using data attributes and simplified class strings)
        className: cn("btn-sm rounded-3 fw-normal", // Base Bootstrap day styling
        "p-0 m-1", // Custom adjustment for calendar cell spacing
        // This is complex custom logic and requires custom CSS rules
        // or a JavaScript helper to toggle classes based on data attributes.
        // We'll rely on the default button look with minor overrides.
        defaultClassNames.day, className), ...props }));
}
export { Calendar, CalendarDayButton };
