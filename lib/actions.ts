"use server";
import z from "zod";
import prisma from "./db";
import { RegisterSchema, LoginSchema, registerSchema } from "./utils";

export async function registerAction(values: RegisterSchema) {
  // validation
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      errors: fieldErrors,
      message: "Server-side validation failed",
    };
  }
  // submission
  try {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    const resp = await prisma.user.create({
      data: {
        ...user,
      },
    });

    return {
      ok: true,
      data: resp,
    };
    //   const res = await fetch("https://laravel-api.test/regulations", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(user),
    //   });
    //   const result = await res.json();
    // check if any error in the request
    //   if (!res.ok)
    //     return { ok: false, errors: result.errors ?? {}, message: result.message };
    //   return { ok: true, data: result };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "internal server error",
    };
  }
}
export async function loginAction(values: LoginSchema) {
  // validation
  // submission
}
