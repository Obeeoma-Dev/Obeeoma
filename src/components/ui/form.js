// ---------------------------------------------------------
// This file defines and exports only React components
// ---------------------------------------------------------
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, } from "react-hook-form";
// Utility for conditional class names
import { cn } from "@/lib/utils";
// Shadcn/UI label component
import { Label } from "@/components/ui/label";
// Import contexts only (NOT the hook directly)
import { FormFieldContext, FormItemContext } from "./form-context";
// Import the hook indirectly from its new file
import { useFormField } from "./useformfield";
// ---------------------------------------------------------
// FORM PROVIDER
// Wraps react-hook-form's FormProvider for convenience
// ---------------------------------------------------------
const Form = FormProvider;
// ---------------------------------------------------------
// FORM FIELD
// Wrapper around Controller that provides context for each field
// ---------------------------------------------------------
function FormField(props) {
    return (_jsx(FormFieldContext.Provider, { value: { name: props.name }, children: _jsx(Controller, { ...props }) }));
}
// ---------------------------------------------------------
// FORM ITEM
// Provides unique ID context for form fields and layout wrapper
// ---------------------------------------------------------
function FormItem({ className, ...props }) {
    const id = React.useId(); // generates unique, stable id for accessibility
    return (_jsx(FormItemContext.Provider, { value: { id }, children: _jsx("div", { "data-slot": "form-item", className: cn("grid gap-2", className), ...props }) }));
}
// ---------------------------------------------------------
// FORM LABEL
// Uses our custom hook to access field error state and IDs
// ---------------------------------------------------------
function FormLabel({ className, ...props }) {
    const { error, formItemId } = useFormField();
    return (_jsx(Label, { "data-slot": "form-label", "data-error": !!error, className: cn("data-[error=true]:text-destructive", className), htmlFor: formItemId, ...props }));
}
// ---------------------------------------------------------
// FORM CONTROL
// Handles input/slot rendering with correct ARIA attributes
// ---------------------------------------------------------
function FormControl(props) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (_jsx(Slot, { "data-slot": "form-control", id: formItemId, "aria-describedby": !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`, "aria-invalid": !!error, ...props }));
}
// ---------------------------------------------------------
// FORM DESCRIPTION
// Displays small muted text under the form field
// ---------------------------------------------------------
function FormDescription({ className, ...props }) {
    const { formDescriptionId } = useFormField();
    return (_jsx("p", { "data-slot": "form-description", id: formDescriptionId, className: cn("text-muted-foreground text-sm", className), ...props }));
}
// ---------------------------------------------------------
// FORM MESSAGE
// Displays validation message when field has error
// ---------------------------------------------------------
function FormMessage({ className, children, ...props }) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;
    if (!body)
        return null;
    return (_jsx("p", { "data-slot": "form-message", id: formMessageId, className: cn("text-destructive text-sm", className), ...props, children: body }));
}
// ---------------------------------------------------------
// EXPORTS
// Export only components to pass ESLint.
// ---------------------------------------------------------
export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, };
