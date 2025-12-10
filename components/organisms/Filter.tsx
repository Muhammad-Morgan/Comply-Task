"use client";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../atoms/select";

type FilterControl =
  | {
      type: "select";
      name: string;
      label: string;
      placeholder?: string;
      options: { label: string; value: string }[];
      defaultValue?: string;
    }
  | {
      type: "text";
      name: string;
      label: string;
      placeholder?: string;
      defaultValue?: string;
    };

type FilterProps = {
  controls: FilterControl[];
  formLabel?: string;
  className?: string;
};

const Filter = ({ controls, formLabel = "Filter items" }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    // for each key we set the value to be the query value or a default one. Just instead of doing it manually :P
    controls.forEach((control) => {
      const fromUrl = searchParams.get(control.name);

      if (fromUrl) {
        initial[control.name] = fromUrl;
        return;
      }

      if (control.type === "select") {
        // This condition is checking the 1st item in a select array to add it as default if there is nothing in url, and if it doesn't exist ""
        const fallback =
          control.defaultValue ?? control.options[0]?.value ?? "";
        initial[control.name] = fallback;
      } else {
        initial[control.name] = control.defaultValue ?? "";
      }
    });
    return initial;
  });
  // updating state dynamically
  const updateValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    // using the state to loop and add the values to the new url
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    // go to the new url
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      role="search"
      aria-label={formLabel}
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      {controls.map((control) => {
        if (control.type === "text") {
          // Either Input return
          return (
            <div key={control.name}>
              <label htmlFor={control.name}>{control.label}</label>
              <Input
                id={control.name}
                name={control.name}
                placeholder={control.placeholder}
                value={values[control.name]}
                onChange={(e) => updateValue(control.name, e.target.value)}
              />
            </div>
          );
        }
        return (
          // Or select return
          <div key={control.name}>
            <label htmlFor={control.name}>{control.label}</label>
            <Select
              value={values[control.name]}
              onValueChange={(value) => updateValue(control.name, value)}
            >
              <SelectTrigger id={control.name}>
                <SelectValue placeholder={control.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {control.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}

      <Button type="submit">Search</Button>
    </form>
  );
};

export default Filter;
