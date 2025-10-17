// ---------------------------------------------------------
// This file defines and exports only React components
// ---------------------------------------------------------

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

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
// Wraps Controller and provides context for field name
// ---------------------------------------------------------
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// ---------------------------------------------------------
// FORM ITEM
// Provides unique ID context for layout and accessibility
// ---------------------------------------------------------
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId(); // Generates stable unique ID

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

// ---------------------------------------------------------
// FORM LABEL
// Renders label with error styling and accessibility
// ---------------------------------------------------------
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

// ---------------------------------------------------------
// FORM CONTROL
// Renders input/slot with correct ARIA attributes
// ---------------------------------------------------------
function FormControl(props: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  // Aria-describedby attribute.
  const describedBy = error
    ? `${formDescriptionId} ${formMessageId}`
    : formDescriptionId;

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={describedBy}
      aria-invalid={!!error}
      {...props}
    />
  );
}

// ---------------------------------------------------------
// FORM DESCRIPTION
// Renders muted helper text under the field
// ---------------------------------------------------------
function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------
// FORM MESSAGE
// Renders validation message when field has error
// ---------------------------------------------------------
function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

// ---------------------------------------------------------
// EXPORTS
// Export only components to pass ESLint and Jest
// ---------------------------------------------------------
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
