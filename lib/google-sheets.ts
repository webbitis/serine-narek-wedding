import { google } from "googleapis";
import type { RsvpRecord } from "@/lib/rsvp";

const SHEET_TITLE = "RSVP";
const RANGE = `${SHEET_TITLE}!A:E`;
const HEADERS = [
  "Submitted At",
  "Full Name",
  "Side",
  "Attendance",
  "Guest Count",
];

function getPrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return "";
  return key.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = getPrivateKey();
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    throw new Error("Google Sheets environment variables are missing.");
  }

  return {
    sheetId,
    auth: new google.auth.JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    }),
  };
}

async function getSheets() {
  const { sheetId, auth } = getAuth();
  return {
    sheetId,
    sheets: google.sheets({ version: "v4", auth }),
  };
}

async function ensureRsvpSheet() {
  const { sheetId, sheets } = await getSheets();
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const hasTab = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === SHEET_TITLE,
  );

  if (!hasTab) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }],
      },
    });
  }

  const header = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${SHEET_TITLE}!A1:E1`,
  });

  if (!header.data.values?.[0]?.[0]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${SHEET_TITLE}!A1:E1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }
}

export async function appendRsvpRow(record: RsvpRecord) {
  const { sheetId, sheets } = await getSheets();
  await ensureRsvpSheet();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          record.submittedAt,
          record.fullName,
          record.side,
          record.attendance,
          record.guestCount,
        ],
      ],
    },
  });
}

export async function readRsvpRows(): Promise<RsvpRecord[]> {
  const { sheetId, sheets } = await getSheets();
  await ensureRsvpSheet();

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${SHEET_TITLE}!A2:E`,
  });

  return (result.data.values ?? [])
    .map((row) => {
      const [submittedAt, fullName, side, attendance, guestCount] = row;
      if (!fullName || (side !== "bride" && side !== "groom")) return null;
      if (attendance !== "yes" && attendance !== "no") return null;

      const count = Number.parseInt(String(guestCount ?? "0"), 10);

      return {
        fullName: String(fullName),
        side,
        attendance,
        guestCount:
          attendance === "no" ? 0 : Number.isFinite(count) ? count : 0,
        submittedAt: String(submittedAt ?? ""),
      } satisfies RsvpRecord;
    })
    .filter((row): row is RsvpRecord => row !== null)
    .reverse();
}
