"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ui/sidebar.tsx
// ------------------------------------------------------
// PURPOSE:
// This file contains only React components related to
// rendering the Sidebar UI. All non-component logic
// (like context or hooks) has been moved to use-sidebar.ts.
// ------------------------------------------------------
import * as React from "react";
<<<<<<< HEAD
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON, SIDEBAR_KEYBOARD_SHORTCUT, } from "./sidebar.constants";
import { SidebarContext, useSidebar } from "./sidebar-context";
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback((value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        }
        else {
            _setOpen(openState);
        }
        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [setOpenProp, open]);
    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);
    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with bootstrap classes.
    const state = open ? "expanded" : "collapsed";
    const contextValue = React.useMemo(() => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
    }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
    return (_jsx(SidebarContext.Provider, { value: contextValue, children: _jsx(TooltipProvider, { delayDuration: 0, children: _jsx("div", { "data-slot": "sidebar-wrapper", style: {
                    "--sidebar-width": SIDEBAR_WIDTH,
                    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                    ...style,
                }, className: cn("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className), ...props, children: children }) }) }));
=======
import { cn } from "@/lib/utils"; // Utility for combining CSS classes
import { SidebarContext, useSidebar, SIDEBAR_WIDTH } from "./use-sidebar"; // Import logic from use-sidebar.ts
// SidebarProvider — wraps part of your app where the sidebar will be used.
// It provides state (isOpen, toggleSidebar) to all nested components.
export function SidebarProvider({ children }) {
  // React state to track sidebar open/close
  const [isOpen, setIsOpen] = React.useState(false);
  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  return (
    // Provide these values to all nested components
    _jsx(SidebarContext.Provider, {
      value: { isOpen, toggleSidebar },
      children: children,
    })
  );
}
// Sidebar — main sidebar container component
export function Sidebar({ children }) {
  const { isOpen } = useSidebar(); // useSidebar hook gives access to context
  return _jsx("aside", {
    // Apply dynamic class based on whether sidebar is open or closed
    className: cn(
      "fixed left-0 top-0 h-full transition-all duration-300 bg-gray-900 text-white shadow-lg z-50",
      isOpen ? "translate-x-0" : `-translate-x-[${SIDEBAR_WIDTH}]`,
    ),
    style: { width: SIDEBAR_WIDTH },
    children: children,
  });
>>>>>>> tests
}
// SidebarTrigger — button that toggles sidebar visibility
export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar(); // Access the toggle function from context
  return _jsx("button", {
    onClick: toggleSidebar,
    className:
      "p-2 m-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none",
    "aria-label": "Toggle sidebar",
    children: _jsx("svg", {
      className: "w-6 h-6 text-white",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      children: _jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 6h16M4 12h16M4 18h16",
      }),
    }),
  });
}
// SidebarGroup — optional grouping for sidebar items
export function SidebarGroup({ title, children }) {
  return _jsxs("div", {
    className: "mt-4",
    children: [
      _jsx("h3", {
        className: "px-4 text-xs uppercase text-gray-400",
        children: title,
      }),
      _jsx("div", { className: "mt-2", children: children }),
    ],
  });
}
// SidebarItem — individual clickable item
export function SidebarItem({ label, onClick }) {
  return _jsx("button", {
    onClick: onClick,
    className:
      "block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors",
    children: label,
  });
}
<<<<<<< HEAD
function SidebarInset({ className, ...props }) {
    return (_jsx("main", { "data-slot": "sidebar-inset", className: cn("bg-background relative flex w-full flex-1 flex-col", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className), ...props }));
}
function SidebarInput({ className, ...props }) {
    return (_jsx(Input, { "data-slot": "sidebar-input", "data-sidebar": "input", className: cn("bg-background h-8 w-full shadow-none", className), ...props }));
}
function SidebarHeader({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-header", "data-sidebar": "header", className: cn("flex flex-col gap-2 p-2", className), ...props }));
}
function SidebarFooter({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-footer", "data-sidebar": "footer", className: cn("flex flex-col gap-2 p-2", className), ...props }));
}
function SidebarSeparator({ className, ...props }) {
    return (_jsx(Separator, { "data-slot": "sidebar-separator", "data-sidebar": "separator", className: cn("bg-sidebar-border mx-2 w-auto", className), ...props }));
}
function SidebarContent({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-content", "data-sidebar": "content", className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className), ...props }));
}
function SidebarGroup({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-group", "data-sidebar": "group", className: cn("relative flex w-full min-w-0 flex-col p-2", className), ...props }));
}
function SidebarGroupLabel({ className, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "div";
    return (_jsx(Comp, { "data-slot": "sidebar-group-label", "data-sidebar": "group-label", className: cn("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className), ...props }));
}
function SidebarGroupAction({ className, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { "data-slot": "sidebar-group-action", "data-sidebar": "group-action", className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden", "group-data-[collapsible=icon]:hidden", className), ...props }));
}
function SidebarGroupContent({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-group-content", "data-sidebar": "group-content", className: cn("w-full text-sm", className), ...props }));
}
function SidebarMenu({ className, ...props }) {
    return (_jsx("ul", { "data-slot": "sidebar-menu", "data-sidebar": "menu", className: cn("flex w-full min-w-0 flex-col gap-1", className), ...props }));
}
function SidebarMenuItem({ className, ...props }) {
    return (_jsx("li", { "data-slot": "sidebar-menu-item", "data-sidebar": "menu-item", className: cn("group/menu-item relative", className), ...props }));
}
const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
    variants: {
        variant: {
            default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        },
        size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function SidebarMenuButton({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = (_jsx(Comp, { "data-slot": "sidebar-menu-button", "data-sidebar": "menu-button", "data-size": size, "data-active": isActive, className: cn(sidebarMenuButtonVariants({ variant, size }), className), ...props }));
    if (!tooltip) {
        return button;
    }
    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip,
        };
    }
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: button }), _jsx(TooltipContent, { side: "right", align: "center", hidden: state !== "collapsed" || isMobile, ...tooltip })] }));
}
function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { "data-slot": "sidebar-menu-action", "data-sidebar": "menu-action", className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover &&
            "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0", className), ...props }));
}
function SidebarMenuBadge({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sidebar-menu-badge", "data-sidebar": "menu-badge", className: cn("text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className), ...props }));
}
function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);
    return (_jsxs("div", { "data-slot": "sidebar-menu-skeleton", "data-sidebar": "menu-skeleton", className: cn("flex h-8 items-center gap-2 rounded-md px-2", className), ...props, children: [showIcon && (_jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" })), _jsx(Skeleton, { className: "h-4 max-w-(--skeleton-width) flex-1", "data-sidebar": "menu-skeleton-text", style: {
                    "--skeleton-width": width,
                } })] }));
}
function SidebarMenuSub({ className, ...props }) {
    return (_jsx("ul", { "data-slot": "sidebar-menu-sub", "data-sidebar": "menu-sub", className: cn("border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className), ...props }));
}
function SidebarMenuSubItem({ className, ...props }) {
    return (_jsx("li", { "data-slot": "sidebar-menu-sub-item", "data-sidebar": "menu-sub-item", className: cn("group/menu-sub-item relative", className), ...props }));
}
function SidebarMenuSubButton({ asChild = false, size = "md", isActive = false, className, ...props }) {
    const Comp = asChild ? Slot : "a";
    return (_jsx(Comp, { "data-slot": "sidebar-menu-sub-button", "data-sidebar": "menu-sub-button", "data-size": size, "data-active": isActive, className: cn("text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className), ...props }));
}
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, };
=======
>>>>>>> tests
