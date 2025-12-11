"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GenericInputs } from "../atoms/Inputs";
import { Gender, PersonalInfoSchemaType } from "@/lib/utils";
import GenderSelectCard from "../molecules/GenderSelectCard";
import { SimpleOption } from "@/lib/lists";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import CountryAsyncSelect from "../molecules/CountryAsyncSelect";

type FirstPageProps = {
  form: UseFormReturn<PersonalInfoSchemaType>;
};

const getLabel = (options: SimpleOption[], value: string) =>
  options.find((opt) => opt.value === value)?.label ?? "";

const FirstPage = ({ form }: FirstPageProps) => {
  const [countryQuery, setCountryQuery] = React.useState("");
  const [countryOpen, setCountryOpen] = React.useState(false);

  const handleCountryControlKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setCountryOpen((open) => !open);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setCountryOpen(false);
      }
    },
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
        <FormDescription className="text-2xl font-bold mb-6 text-slate-900">
          Personal Information
        </FormDescription>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Full Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <GenericInputs
                  placeholder="Mohamed Ahmed"
                  className="py-6"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Email address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <GenericInputs
                  placeholder="mohamed@me.com"
                  className="py-6"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => {
            const setGender: React.Dispatch<React.SetStateAction<string>> = (
              nextValue
            ) => {
              const resolvedValue =
                typeof nextValue === "function"
                  ? nextValue(field.value ?? Gender.Male)
                  : nextValue;

              field.onChange(resolvedValue);
            };
            return (
              <FormItem>
                <FormControl>
                  <GenderSelectCard
                    gender={field.value}
                    setGender={setGender}
                    getLabel={getLabel}
                    extraStyling="border-slate-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CountryAsyncSelect
                  query={countryQuery}
                  onQueryChange={setCountryQuery}
                  onSelect={(_, label) => field.onChange(label)}
                  selectedLabel={field.value}
                  open={countryOpen}
                  setOpen={setCountryOpen}
                  handleControlKeyDown={handleCountryControlKeyDown}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Age <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <GenericInputs
                  className="py-6"
                  type="number"
                  min={18}
                  max={100}
                  value={field.value}
                  onChange={(event) => {
                    const nextValue = event.target.valueAsNumber;
                    field.onChange(Number.isNaN(nextValue) ? 0 : nextValue);
                  }}
                />
              </FormControl>
              <span className="text-sm text-slate-500 mt-2">
                Must be between 18-100
              </span>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FirstPage;
