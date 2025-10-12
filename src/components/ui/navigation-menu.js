import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "./navigation-menu.styles";
// 1️⃣ Re-export all Radix primitives with our naming
const NavigationMenu = NavigationMenuPrimitive.Root;
const NavigationMenuList = NavigationMenuPrimitive.List;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuContent = NavigationMenuPrimitive.Content;
const NavigationMenuLink = NavigationMenuPrimitive.Link;
const NavigationMenuIndicator = NavigationMenuPrimitive.Indicator;
const NavigationMenuViewport = NavigationMenuPrimitive.Viewport;
// 2️⃣ Define our custom trigger component
function NavigationMenuTrigger({ className, children, ...props }) {
  return _jsxs(NavigationMenuPrimitive.Trigger, {
    "data-slot": "navigation-menu-trigger",
    className: cn(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      _jsx(ChevronDownIcon, {
        className:
          "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
        "aria-hidden": "true",
      }),
    ],
  });
}
// Export all components cleanly
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
