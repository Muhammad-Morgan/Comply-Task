import { NextResponse } from "next/server";

import { loginAction } from "@/lib/actions";

export async function POST(request: Request) {
  const payload = await request.json();
  const result = await loginAction(payload);

  const status = result.ok ? 200 : 400;
  return NextResponse.json(result, { status });
}
