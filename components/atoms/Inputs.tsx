import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Limit the allowed input types so the styling remains predictable.
type InputType = "text" | "password" | "email" | "number";

// Reuse the base Input props; (name, value, onChange, disabled, aria props, etc.) but limit supported type values
// Extend the base Input props from shadcn/ui and override the type union.
type InputsProps = React.ComponentProps<typeof Input> & {
  type?: InputType;
};

// Simple wrapper: use default type "text" and pass everything through.
export function GenericInputs({ type = "text", ...props }: InputsProps) {
  if (type === "number")
    return <Input className="w-full pl-10" type={type} {...props} />;
  return <Input className="w-full pl-10" type={type} {...props} />;
}

// Generic select option used throughout the dashboard.
type SelectOption = {
  label: React.ReactNode;
  value: string;
};

// Allow callers to pass through every Select prop while injecting the options list.
type GenericSelectProps = React.ComponentProps<typeof Select> & {
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
};

// Wrapper keeps markup identical wherever the select is reused.
export function GenericSelect({
  options,
  placeholder,
  triggerClassName,
  triggerProps,
  ...props
}: GenericSelectProps) {
  const { className: triggerPropsClassName, ...restTriggerProps } =
    triggerProps ?? {};

  return (
    <Select {...props}>
      <SelectTrigger
        {...restTriggerProps}
        className={cn(
          "w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-5.5 text-left hover:border-primary-500",
          triggerClassName,
          triggerPropsClassName
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: SelectOption) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Textarea uses native props so it can live inside forms easily.
type GenericTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function GenericTextArea({
  className,
  rows = 4,
  ...props
}: GenericTextAreaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-y",
        className
      )}
      {...props}
    />
  );
}
