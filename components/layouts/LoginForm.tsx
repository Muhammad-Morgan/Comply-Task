"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "../atoms/button";
import { FieldDescription } from "../atoms/field";
import { Form } from "../atoms/form";
import {
  CustomInputField,
  CustomPasswordField,
} from "../organisms/FormComponents";
import { loginSchema, type LoginSchema } from "@/lib/utils";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginSchema) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "Unable to log in");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Logged in successfully");
      if (data?.redirectTo) {
        router.push(data.redirectTo);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit((values) => mutate(values))}
      >
        <CustomInputField name="email" control={form.control} />
        <FieldDescription className="-mt-4 ml-1">
          We&apos;ll use this to contact you. We will not share your email with
          anyone else.
        </FieldDescription>
        <CustomPasswordField name="password" control={form.control} />
        <Button className="mb-2 w-full" type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
