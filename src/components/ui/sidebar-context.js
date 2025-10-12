import * as React from "react";
export const SidebarContext = React.createContext(null);
export function useSidebar() {
<<<<<<< HEAD
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
=======
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
>>>>>>> tests
}
