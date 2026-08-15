import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { appendRsvpRow, readRsvpRows } from "@/lib/google-sheets";
import { parseRsvpPayload } from "@/lib/rsvp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseRsvpPayload(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await appendRsvpRow(parsed);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP POST failed", error);
    return NextResponse.json(
      { error: "Չհաջողվեց ուղարկել։ Խնդրում ենք կրկին փորձել։" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await readRsvpRows();
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("RSVP GET failed", error);
    return NextResponse.json(
      { error: "Չհաջողվեց բեռնել տվյալները։" },
      { status: 500 },
    );
  }
}
