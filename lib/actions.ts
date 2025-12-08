"use server";
import z from "zod";
import prisma from "./db";
import { RegisterSchema, LoginSchema, registerSchema } from "./utils";
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
type GetItemsType = {
  search?: string;
  page?: string;
};
export async function getItemsAction({ search, page = "1" }: GetItemsType) {
  // try {
  // const resp = await fetch(`https://provideddomain.api?search=${search}&page=${page}`);
  // rest of logic
  // return {}
  // } catch (error) {
  // console.log(error);
  //     return null;
  // }
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
): Promise<{ data: ComplianceItem[]; pageCount: number }> {
  // how the fetch should look like
  // const params = new URLSearchParams();
  // params.set('page', page);
  // if (search) params.set('search', search);
  // We should be sending search + page and receiving data + pageCount
  // const response = await fetch(
  //   `https://www.domain.com/compliance?${params.toString()}`,
  //   {
  //     cache: "no-store",
  //   }
  // );
  // if (!response.ok) throw new Error("Failed to fetch");
  // const { data, pageCount } = await response.json();
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
