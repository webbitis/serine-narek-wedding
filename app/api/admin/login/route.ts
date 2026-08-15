import { NextResponse } from "next/server";
import { isValidAdminPassword, setAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = typeof body.password === "string" ? body.password : "";

    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { error: "Գաղտնաբառը սխալ է։" },
        { status: 401 },
      );
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Չհաջողվեց մուտք գործել։" }, { status: 500 });
  }
}
