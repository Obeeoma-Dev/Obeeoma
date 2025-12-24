// Import React hooks
import { useEffect, useRef, useState } from "react";

// Define optional configuration for the hook
interface UseScrollAnimationOptions {
  threshold?: number; // How much of the element must be visible to trigger
  rootMargin?: string; // Margin around the viewport
  triggerOnce?: boolean; // Whether to trigger only once or repeatedly
}

// Export the hook
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {},
): [React.RefObject<HTMLDivElement | null>, boolean] {
  // Destructure options with default values
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  // Create a ref to attach to the target element
  const elementRef = useRef<HTMLDivElement>(null);

  // Track whether the element is visible in the viewport
  const [isVisible, setIsVisible] = useState(false);

  // Set up the Intersection Observer
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Element is visible
          if (triggerOnce) {
            observer.unobserve(element); // Stop observing after first trigger
          }
        } else if (!triggerOnce) {
          setIsVisible(false); // Reset visibility if allowed
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element); // Start observing

    return () => {
      observer.unobserve(element); // Clean up on unmount
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Return the ref and visibility state
  return [elementRef, isVisible];
}
