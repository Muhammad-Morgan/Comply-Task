import { type Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../molecules/form";
import { Input } from "../atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
// Types of input filed
type CustomInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export function CustomPasswordField<T extends FieldValues>({
  control,
  name,
}: CustomInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input {...field} type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function CustomInputField<T extends FieldValues>({
  control,
  name,
}: CustomInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
// Types for select field
type CustomSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  items: string[];
  labelText: string;
};
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
