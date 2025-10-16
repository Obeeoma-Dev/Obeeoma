"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
const CarouselContext = React.createContext(null);
function useCarousel() {
    const context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) {
    const [carouselRef, api] = useEmblaCarousel({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api) => {
        if (!api)
            return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    React.useEffect(() => {
        if (!api || !setApi)
            return;
        setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
        if (!api)
            return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);
    return (_jsx(CarouselContext.Provider, { value: {
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
        }, children: _jsx("div", { onKeyDownCapture: handleKeyDown, className: cn("relative", className), role: "region", "aria-roledescription": "carousel", "data-slot": "carousel", ...props, children: children }) }));
}
function CarouselContent({ className, ...props }) {
    const { carouselRef, orientation } = useCarousel();
    return (_jsx("div", { ref: carouselRef, className: "overflow-hidden", "data-slot": "carousel-content", children: _jsx("div", { className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className), ...props }) }));
}
function CarouselItem({ className, ...props }) {
    const { orientation } = useCarousel();
    return (_jsx("div", { role: "group", "aria-roledescription": "slide", "data-slot": "carousel-item", className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className), ...props }));
}
function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (_jsxs(Button, { "data-slot": "carousel-previous", variant: variant, size: size, className: cn("absolute size-8 rounded-full", orientation === "horizontal"
            ? "top-1/2 -left-12 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className), disabled: !canScrollPrev, onClick: scrollPrev, ...props, children: [_jsx(ArrowLeft, {}), _jsx("span", { className: "sr-only", children: "Previous slide" })] }));
}
// In your button component file (e.g., components/ui/button.tsx)
const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
Button.displayName = "Button";
// export { Button, buttonVariants };
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, };
