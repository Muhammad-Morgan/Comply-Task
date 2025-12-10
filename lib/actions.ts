"use server";
import z from "zod";
import prisma from "./db";
import {
  RegisterSchema,
  LoginSchema,
  registerSchema,
  loginSchema,
} from "./utils";
// ComplianceItemType
export type ComplianceItem = {
  id: string;
  name: string;
  status: "compliant" | "pending" | "failed";
  jurisdiction: string;
};
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
  const apiBaseUrl = process.env.AUTH_API_URL;
  if (apiBaseUrl) {
    try {
      const response = await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          cache: "no-store",
        }
      );
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        return {
          ok: false,
          errors: result?.errors ?? {},
          message: result?.message ?? "Registration failed",
        };
      }
      return {
        ok: true,
        data: result?.data,
        message: result?.message ?? "Registered successfully",
      };
    } catch (error) {
      console.error("External registration failed, falling back to DB:", error);
    }
  }
  // submission - DB
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
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "internal server error",
    };
  }
}
export async function loginAction(values: LoginSchema) {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      errors: fieldErrors,
      message: "Invalid credentials",
    };
  }
  const apiBaseUrl = process.env.AUTH_API_URL;

  // prefer external API when provided, fallback to local DB otherwise
  if (apiBaseUrl) {
    try {
      const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/login`, {
        //removes a trailing slash from the end of the URL if it exists
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        cache: "no-store",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          ok: false,
          errors: result?.errors ?? {},
          message: result?.message ?? "Invalid email or password",
        };
      }

      return {
        ok: true,
        data: result?.data,
        message: result?.message ?? "logged in successfully",
        redirectTo: result?.redirectTo ?? "/task1",
      };
    } catch (error) {
      console.error("External auth failed, falling back to DB login:", error);
    }
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: values.email },
    });
    if (!existingUser || existingUser.password !== values.password) {
      return {
        ok: false,
        message: "Invalid email or password",
      };
    }
    return {
      ok: true,
      message: "logged in successfully",
      redirectTo: "/task1",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "internal server error",
    };
  }
}

type GetItemsType = {
  search?: string;
  page?: string;
};
export async function getItemsAction({ search, page = "1" }: GetItemsType) {
  const apiBaseUrl = process.env.ITEMS_API_URL;
  if (apiBaseUrl) {
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      if (search) params.set("search", search);

      const response = await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}?${params.toString()}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
  // dummy return
  return {
    items: [
      {
        id: 1,
        item: "item1",
      },
      {
        id: 2,
        item: "item2",
      },
      {
        id: 3,
        item: "item3",
      },
      {
        id: 4,
        item: "item4",
      },
      {
        id: 5,
        item: "item5",
      },
      {
        id: 6,
        item: "item6",
      },
      {
        id: 7,
        item: "item7",
      },
    ],
    page: 2,
    totalPages: 5,
  };
}

export async function getComplianceItems(
  page: string,
  search?: string
): Promise<{ data: ComplianceItem[]; pageCount: number } | null> {
  const apiBaseUrl = process.env.COMPLIANCE_API_URL;
  if (apiBaseUrl) {
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      if (search) params.set("search", search);

      const response = await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}?${params.toString()}`, //removes a trailing slash from the end of the URL if it exists
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch compliance items");
      }

      const { data, pageCount } = await response.json();
      return { data, pageCount };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // dummy return
  const data: ComplianceItem[] = [
    { id: "1", name: "Policy A", status: "compliant", jurisdiction: "EU" },
    { id: "2", name: "Policy B", status: "pending", jurisdiction: "US" },
    { id: "3", name: "Policy C", status: "failed", jurisdiction: "UK" },
    { id: "4", name: "Policy D", status: "compliant", jurisdiction: "CA" },
    { id: "5", name: "Policy E", status: "pending", jurisdiction: "AU" },
    { id: "6", name: "Policy F", status: "compliant", jurisdiction: "EU" },
    { id: "7", name: "Policy G", status: "failed", jurisdiction: "US" },
    { id: "8", name: "Policy H", status: "pending", jurisdiction: "SG" },
    { id: "9", name: "Policy I", status: "compliant", jurisdiction: "AE" },
    { id: "10", name: "Policy J", status: "failed", jurisdiction: "UK" },
    { id: "11", name: "Policy K", status: "pending", jurisdiction: "CA" },
    { id: "12", name: "Policy L", status: "compliant", jurisdiction: "EU" },
    { id: "13", name: "Policy M", status: "pending", jurisdiction: "US" },
    { id: "14", name: "Policy N", status: "failed", jurisdiction: "SG" },
    { id: "15", name: "Policy O", status: "compliant", jurisdiction: "AE" },
  ];

  const pageCount = 5;
  return { data, pageCount };
}
