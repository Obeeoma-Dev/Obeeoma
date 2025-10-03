<<<<<<< HEAD
// src/components/ui/toast.tsx

// Type for an action in the toast (e.g., a button)
export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

// Type for the toast itself
export type ToastProps = {
  message: string;
  duration?: number;           // optional duration in ms
  open?: boolean;              // track open state
  onOpenChange?: (open: boolean) => void; // callback when toast opens/closes
};
=======
// src/components/ui/toast.tsx

// Type for an action in the toast (e.g., a button)
export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

// Type for the toast itself
export type ToastProps = {
  message: string;
  duration?: number;           // optional duration in ms
  open?: boolean;              // track open state
  onOpenChange?: (open: boolean) => void; // callback when toast opens/closes
};
>>>>>>> 0625a07dda717cadb4821efcc497060fe62f6081
