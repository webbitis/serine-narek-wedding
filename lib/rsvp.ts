export type RsvpSide = "bride" | "groom";
export type RsvpAttendance = "yes" | "no";

export type RsvpRecord = {
  fullName: string;
  side: RsvpSide;
  attendance: RsvpAttendance;
  guestCount: number;
  submittedAt: string;
};

export type RsvpFilter = "all" | "yes" | "no" | "bride" | "groom";

export function parseRsvpPayload(body: unknown): RsvpRecord | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid payload" };
  }

  const data = body as Record<string, unknown>;
  const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
  const side = data.side;
  const attendance = data.attendance;

  if (!fullName) {
    return { error: "Անունը պարտադիր է։" };
  }

  if (side !== "bride" && side !== "groom") {
    return { error: "Խնդրում ենք նշել կողմը։" };
  }

  if (attendance !== "yes" && attendance !== "no") {
    return { error: "Խնդրում ենք նշել մասնակցությունը։" };
  }

  const rawCount =
    attendance === "no"
      ? 0
      : Number.parseInt(String(data.guestCount ?? data.guests ?? "0"), 10);

  if (attendance === "yes" && (!Number.isFinite(rawCount) || rawCount < 1)) {
    return { error: "Հյուրերի քանակը պետք է լինի առնվազն 1։" };
  }

  return {
    fullName,
    side,
    attendance,
    guestCount: attendance === "no" ? 0 : rawCount,
    submittedAt:
      typeof data.submittedAt === "string" && data.submittedAt
        ? data.submittedAt
        : new Date().toISOString(),
  };
}

export function summarizeRsvps(rows: RsvpRecord[]) {
  const comingPeople = rows
    .filter((row) => row.attendance === "yes")
    .reduce((sum, row) => sum + row.guestCount, 0);

  const notComingResponses = rows.filter((row) => row.attendance === "no").length;

  const bridePeople = rows
    .filter((row) => row.attendance === "yes" && row.side === "bride")
    .reduce((sum, row) => sum + row.guestCount, 0);

  const groomPeople = rows
    .filter((row) => row.attendance === "yes" && row.side === "groom")
    .reduce((sum, row) => sum + row.guestCount, 0);

  return { comingPeople, notComingResponses, bridePeople, groomPeople };
}

export function filterRsvps(
  rows: RsvpRecord[],
  filter: RsvpFilter,
  query: string,
) {
  const normalized = query.trim().toLowerCase();

  return rows.filter((row) => {
    if (filter === "yes" && row.attendance !== "yes") return false;
    if (filter === "no" && row.attendance !== "no") return false;
    if (filter === "bride" && row.side !== "bride") return false;
    if (filter === "groom" && row.side !== "groom") return false;
    if (normalized && !row.fullName.toLowerCase().includes(normalized)) {
      return false;
    }
    return true;
  });
}
