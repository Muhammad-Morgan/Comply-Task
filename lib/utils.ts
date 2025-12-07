import z from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
