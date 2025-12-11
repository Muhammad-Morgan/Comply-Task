"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PreferencesSchemaType } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import CategorySearchSelect from "../molecules/CategorySearchSelect";
import InterestsMultiSelect from "../molecules/InterestsMultiSelect";
import { CATEGORY_OPTIONS, SimpleOption } from "@/lib/lists";

type SecondPageProps = {
  form: UseFormReturn<PreferencesSchemaType>;
};

const getLabel = (options: SimpleOption[], value: string) =>
  options.find((opt) => opt.value === value)?.label ?? "";

const SecondPage = ({ form }: SecondPageProps) => {
  const [categoryQuery, setCategoryQuery] = React.useState("");
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [interestsOpen, setInterestsOpen] = React.useState(false);

  const filteredCategories = React.useMemo(() => {
    const query = categoryQuery.trim().toLowerCase();
    if (!query) return CATEGORY_OPTIONS;
    return CATEGORY_OPTIONS.filter((opt) =>
      opt.label.toString().toLowerCase().includes(query)
    );
  }, [categoryQuery]);

  const handleCategoryControlKeyDown =
    React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setCategoryOpen((open) => !open);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setCategoryOpen(false);
      }
    }, []);

  const handleInterestsControlKeyDown =
    React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setInterestsOpen((open) => !open);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setInterestsOpen(false);
      }
    }, []);

  return (
    <Form {...form}>
      <form onSubmit={(event) => event.preventDefault()} className="space-y-6">
        <FormDescription className="text-2xl font-bold text-slate-900">
          Interests & Preferences
        </FormDescription>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            const categoryValue = field.value ?? "";
            const setCategory: React.Dispatch<React.SetStateAction<string>> = (
              nextValue
            ) => {
              const resolvedValue =
                typeof nextValue === "function"
                  ? nextValue(categoryValue)
                  : nextValue;

              field.onChange(resolvedValue);
            };

            return (
              <FormItem>
                <FormControl>
                  <CategorySearchSelect
                    category={categoryValue}
                    setCategory={setCategory}
                    categoryLabel={getLabel(CATEGORY_OPTIONS, categoryValue)}
                    categoryQuery={categoryQuery}
                    setCategoryQuery={setCategoryQuery}
                    filteredCategories={filteredCategories}
                    categoryOpen={categoryOpen}
                    setCategoryOpen={setCategoryOpen}
                    handleControlKeyDown={handleCategoryControlKeyDown}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => {
            const interests = field.value ?? [];
            const selectedInterestCount = `${interests.length} of 5 selected`;

            const toggleInterest = (value: string) => {
              const exists = interests.includes(value);
              const updated = exists
                ? interests.filter((item) => item !== value)
                : [...interests, value];
              field.onChange(updated);
            };

            return (
              <FormItem>
                <FormControl>
                  <InterestsMultiSelect
                    interests={interests}
                    selectedInterestCount={selectedInterestCount}
                    interestsOpen={interestsOpen}
                    setInterestsOpen={setInterestsOpen}
                    handleControlKeyDown={handleInterestsControlKeyDown}
                    getLabel={getLabel}
                    toggleInterest={toggleInterest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-slate-900">
                Avatar Upload (Optional)
              </FormLabel>
              <FormControl>
                <AvatarUploadInput
                  value={(field.value as File | null) ?? null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormDescription>
                Drag & drop or browse a PNG/JPG up to 5MB.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

type AvatarUploadInputProps = {
  value: File | null;
  onChange: (file: File | null) => void;
};

const AvatarUploadInput = ({ value, onChange }: AvatarUploadInputProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
    return undefined;
  }, [value]);

  const handleFiles = React.useCallback(
    (files?: FileList | null) => {
      const file = files?.[0] ?? null;
      onChange(file);
    },
    [onChange]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <svg
          className="mx-auto mb-4 h-10 w-10 text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5v14m7-7H5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <p className="text-sm text-slate-600">
        Drag & drop your avatar here or
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-3 inline-flex items-center rounded-lg bg-comp-green px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Browse Files
      </button>
      <p className="mt-2 text-xs text-slate-500">PNG, JPG up to 5MB</p>
      <input
        type="file"
        accept="image/png,image/jpeg"
        ref={inputRef}
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
};

export default SecondPage;
