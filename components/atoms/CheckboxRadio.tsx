"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Shared props between checkbox and radio variants.
type BaseProps = {
  label?: string;
  className?: string;
};

// Checkbox flavor expects an id so the label/input stay in sync.
type GenericCheckboxProps = BaseProps & {
  kind: "checkbox";
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export type RadioOption = {
  value: string;
  label: string;
};

// Radio version represents a single radio input.
type GenericRadioProps = BaseProps & {
  kind: "radio";
  name?: string;
  id?: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export type GenericCheckboxRadioProps =
  | GenericCheckboxProps
  | GenericRadioProps;
// wrapper decides whether to render radio or checkbox
export function GenericCheckboxRadio(props: GenericCheckboxRadioProps) {
  if (props.kind === "checkbox") {
    return <CheckboxControl {...props} />;
  }
  return <RadioControl {...props} />;
}

function CheckboxControl({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  className,
  id,
}: GenericCheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? checked! : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.checked);
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border-none p-3 text-sm",
        className,
        disabled && "opacity-70"
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="size-4"
        checked={resolvedChecked}
        onChange={handleChange}
        disabled={disabled}
        readOnly={isControlled && !onChange}
      />
      <div>
        {label ? (
          <label htmlFor={id} className="font-medium">
            {label}
          </label>
        ) : null}
      </div>
    </div>
  );
}

function RadioControl({
  name,
  id,
  value,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  className,
}: GenericRadioProps) {
  const generatedName = React.useId();
  const radioName = name ?? generatedName;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.value);
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
  };

  return (
    <label
      className={cn(
        "flex items-center gap-2 rounded-lg border border-transparent p-2 text-sm",
        disabled && "opacity-70",
        className
      )}
    >
      <input
        type="radio"
        name={radioName}
        id={id}
        value={value}
        checked={resolvedChecked}
        onChange={handleChange}
        disabled={disabled}
        readOnly={isControlled && !onChange}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
