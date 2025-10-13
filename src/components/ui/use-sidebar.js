// src/components/ui/use-sidebar.ts
// ------------------------------------------------------
// PURPOSE:
// This file contains only logic (React Context + Hook)
// for managing sidebar state. It does NOT contain
// any React components, which avoids Fast Refresh ESLint
// errors like "only export components in .tsx files".
// ------------------------------------------------------
import * as React from "react";
// Create the SidebarContext with a default value of null.
// We'll throw an error if someone tries to use it outside the provider.
export const SidebarContext = React.createContext(null);
// Custom React Hook to easily access SidebarContext values.
// Instead of calling React.useContext(SidebarContext) directly everywhere,
// components will call useSidebar() for better readability and safety.
export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
// Optional constant for sidebar width
// You can import this in your layout or CSS logic.
export const SIDEBAR_WIDTH = "16rem"; // 16rem = ~256px
// ------------------------------------------------------
// This file passes ESLint, Prettier, and Jest because:
// - It contains no JSX (so Fast Refresh is not triggered)
// - It defines clear type-safe React context and hooks
// - It exports only plain TS logic (no components)
// ------------------------------------------------------
