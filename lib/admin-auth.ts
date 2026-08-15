import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rsvp_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getPassword() {
  return process.env.RSVP_ADMIN_PASSWORD ?? "";
}

function expectedToken() {
  const password = getPassword();
  if (!password) return "";
  return createHmac("sha256", password).update("rsvp-admin-ok").digest("hex");
}

function tokensMatch(value: string, expected: string) {
  if (!value || !expected) return false;
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function isValidAdminPassword(password: string) {
  const expected = getPassword();
  if (!expected) return false;
  return tokensMatch(password, expected);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value ?? "";
  return tokensMatch(cookie, expectedToken());
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
