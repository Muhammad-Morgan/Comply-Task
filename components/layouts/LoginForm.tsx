"use client";
import { loginSchema, type LoginSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAction } from "@/lib/actions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CustomInputField,
  CustomPasswordField,
} from "../organisms/FormComponents";
import { Form } from "../molecules/form";
import { Button } from "../atoms/button";

import { toast } from "sonner";
import { FieldDescription } from "../ui/field";

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginSchema) => loginAction(values),
    onSuccess: () => {},
  });
  function onSubmit(values: LoginSchema) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <CustomInputField name="email" control={form.control} />
        <FieldDescription className="-mt-4 ml-1">
          We&apos;ll use this to contact you. We will not share your email with
          anyone else.
        </FieldDescription>
        <CustomPasswordField name="password" control={form.control} />
        <Button className="w-full mb-2" type="submit">
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
