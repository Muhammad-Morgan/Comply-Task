import * as React from "react";
import { type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { Input } from "../atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { CustomInputFieldProps, CustomSelectFieldProps } from "@/lib/types";
import { Button } from "../atoms/button";

type BaseFieldProps<T extends FieldValues> = CustomInputFieldProps<T> & {
  label?: string;
  description?: React.ReactNode;
};

export function CustomInputField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: BaseFieldProps<T>) {
  const [visible, setVisible] = React.useState(false);
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
            <Input {...field} type={visible ? "text" : "password"} />
          </FormControl>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setVisible((prev) => !prev)}
            className="mt-1"
          >
            {visible ? "Hide" : "Show"} password
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomSelectField<T extends FieldValues>({
  name,
  control,
  items,
  labelText,
}: CustomSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
