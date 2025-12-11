import z from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// ready for any local data
// Schemas
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be 3 characters at least"),
    email: z.email({ error: "Invalid email format" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(32, { error: "Password cannot exceed 32 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
export const loginSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password cannot exceed 32 characters" }),
});
export type LoginSchema = z.infer<typeof loginSchema>;
// for the following schema
export enum Gender {
  Male = "male",
  Female = "female",
}
export const personalInfoSchema = z.object({
  name: z.string().min(2, "name is required"),
  email: z.email({ error: "Invalid email format" }),
  gender: z.enum(Gender),
  country: z.string().optional(),
  age: z
    .number()
    .min(18, "Must be at least 18")
    .max(100, "Must be 100 or less"),
});
export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;

const hasFileConstructor = typeof File !== "undefined";
const avatarSchema = z
  .custom<File | null | undefined>(
    (value) => {
      if (value === null || typeof value === "undefined") return true;
      if (!hasFileConstructor) return true;
      return value instanceof File;
    },
    {
      message: "Please upload a valid image file",
    }
  )
  .optional();

export const preferencesSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest")
    .max(5, "You can pick up to 5 interests"),
  avatar: avatarSchema,
});

export type PreferencesSchemaType = z.infer<typeof preferencesSchema>;
