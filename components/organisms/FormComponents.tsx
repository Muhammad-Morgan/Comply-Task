import * as React from "react";
import { type FieldValues, useController } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CustomInputFieldProps, CustomSelectFieldProps } from "@/lib/types";
import { Button } from "../ui/button";
import { GenericInputs, GenericSelect, GenericTextArea } from "../atoms/Inputs";
import { GenericCheckboxRadio, type RadioOption } from "../atoms/CheckboxRadio";
import { Input } from "../ui/input";

type BaseFieldProps<T extends FieldValues> = React.ComponentProps<
  typeof Input
> &
  CustomInputFieldProps<T> & {
    label?: string;
    description?: React.ReactNode;
    type?: "text" | "password" | "email";
  };

type CheckboxRadioFieldProps<T extends FieldValues> = {
  control: CustomInputFieldProps<T>["control"];
  checkboxName: CustomInputFieldProps<T>["name"];
  radioName: CustomInputFieldProps<T>["name"];
  label?: string;
  description?: React.ReactNode;
  radioOptions?: RadioOption[];
  radioDisabled?: boolean;
};

type TextAreaFieldProps<T extends FieldValues> = CustomInputFieldProps<T> & {
  label?: string;
  description?: React.ReactNode;
  rows?: number;
  placeholder?: string;
};

export function CustomInputField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  type,
  ...props
}: BaseFieldProps<T>) {
  const [visible, setVisible] = React.useState(false);
  const inputType =
    type === "password" ? (visible ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize block text-sm font-medium mb-2">
            {label ?? name}
          </FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormControl>
            <GenericInputs {...field} type={inputType} {...props} />
          </FormControl>
          {/* {type === "password" ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setVisible((prev) => !prev)}
              className="mt-1"
            >
              {visible ? "Hide" : "Show"} password
            </Button>
          ) : null} */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomPasswordField<T extends FieldValues>(
  props: Omit<BaseFieldProps<T>, "type">
) {
  return <CustomInputField {...props} type="password" />;
}

export function CustomSelectField<T extends FieldValues>({
  name,
  control,
  items,
  labelText,
}: CustomSelectFieldProps<T>) {
  const selectOptions =
    items?.map((item) => ({
      label: item,
      value: item,
    })) ?? [];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <FormControl>
            <GenericSelect
              options={selectOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select an option"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomTextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  rows = 4,
  placeholder,
}: TextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label ?? name}</FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormControl>
            <GenericTextArea {...field} rows={rows} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomCheckboxRadioField<T extends FieldValues>({
  control,
  checkboxName,
  radioName,
  label,
  description,
  radioOptions,
  radioDisabled = false,
}: CheckboxRadioFieldProps<T>) {
  const { field: radioField, fieldState: radioFieldState } = useController({
    control,
    name: radioName,
  });

  return (
    <FormField
      control={control}
      name={checkboxName}
      render={({ field: checkboxField }) => (
        <FormItem>
          <FormLabel className="capitalize">{label ?? checkboxName}</FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormControl>
            <div className="space-y-4">
              <GenericCheckboxRadio
                kind="checkbox"
                id={`${checkboxName}-toggle`}
                label="Enable feature"
                checked={!!checkboxField.value}
                onChange={(checked) => checkboxField.onChange(checked)}
              />
              <div
                className="space-y-2"
                role="radiogroup"
                aria-label="Choose one option"
              >
                {(radioOptions ?? [
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                ]).map((option) => (
                  <GenericCheckboxRadio
                    key={option.value}
                    kind="radio"
                    name={radioName}
                    value={option.value}
                    label={option.label}
                    checked={radioField.value === option.value}
                    onChange={() => radioField.onChange(option.value)}
                    disabled={radioDisabled}
                  />
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
          {radioFieldState.error ? (
            <p className="text-sm text-destructive">
              {String(radioFieldState.error.message ?? "")}
            </p>
          ) : null}
        </FormItem>
      )}
    />
  );
}
