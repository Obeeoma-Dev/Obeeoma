import { useState, useEffect } from "react";

/**
 * useIsMobile
 *
 * Custom React hook to detect if the current screen width
 * matches a mobile device (default breakpoint: 768px).
 *
 * Returns:
 *  - isMobile: boolean → true if viewport width < 768px
 */
export function useIsMobile(breakpoint: number = 768) {
  // State to track if the screen is mobile size
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Run once on mount to set initial value
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]); // Dependency: breakpoint changes if passed as prop

  return isMobile;
}
