"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/lib/utils";

import {
  CustomInputField,
  CustomPasswordField,
} from "../organisms/FormComponents";
import { Button } from "../atoms/button";
import { Form } from "../atoms/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { registerAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (values: RegisterSchema) => registerAction(values),
    onSuccess: (response) => {
      if (!response.ok) {
        toast.error("There was an error");
        return;
      }
      toast.success("Registered Successfuly");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
  });

  function onSubmit(values: RegisterSchema) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <CustomInputField name="name" control={form.control} />
        <CustomInputField name="email" control={form.control} />
        <CustomPasswordField name="password" control={form.control} />
        <CustomPasswordField name="confirmPassword" control={form.control} />
        <Button className="w-full mb-2" type="submit" disabled={isPending}>
          {isPending ? "loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
