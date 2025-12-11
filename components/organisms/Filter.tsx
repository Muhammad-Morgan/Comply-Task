"use client";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { cn } from "@/lib/utils";

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

type SearchParamsLike = Pick<
  ReturnType<typeof useSearchParams>,
  "get" | "toString"
>;

type FilterProps = {
  controls: FilterControl[];
  formLabel?: string;
  className?: string;
};

type FilterViewProps = FilterProps & {
  router: Pick<ReturnType<typeof useRouter>, "push">;
  pathname: string;
  searchParams: SearchParamsLike;
};

const Filter = ({ controls, formLabel = "Filter items", className }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <FilterView
      controls={controls}
      formLabel={formLabel}
      className={className}
      router={router}
      pathname={pathname}
      searchParams={searchParams}
    />
  );
};

export function FilterView({
  controls,
  formLabel = "Filter items",
  className,
  router,
  pathname,
  searchParams,
}: FilterViewProps) {

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
      className={cn("mb-16", className)}
      onSubmit={handleSubmit}
    >
      <fieldset className="grid gap-4 rounded-lg bg-muted p-8 sm:grid-cols-2 md:grid-cols-3">
        <legend className="sr-only">{formLabel}</legend>
        {controls.map((control) => {
          if (control.type === "text") {
            // Text input path
            return (
              <div key={control.name} className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor={control.name}>
                  {control.label}
                </label>
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
            // Select path
            <div key={control.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium" htmlFor={control.name}>
                {control.label}
              </label>
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

        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full"
            aria-label="Apply selected filters"
          >
            Search
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

export default Filter;
