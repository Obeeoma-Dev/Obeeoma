import { buttonVariants } from "./button.styles";

// Re-export button styles with specific variants for dialog
export const alertDialogButtonClass = buttonVariants();
export const alertDialogCancelClass = buttonVariants({ variant: "outline" });