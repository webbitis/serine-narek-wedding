"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  filterRsvps,
  summarizeRsvps,
  type RsvpFilter,
  type RsvpRecord,
} from "@/lib/rsvp";

const FILTERS: { id: RsvpFilter; label: string }[] = [
  { id: "all", label: "Բոլորը" },
  { id: "yes", label: "Գալու են" },
  { id: "no", label: "Չեն գալու" },
  { id: "bride", label: "Հարսի կողմից" },
  { id: "groom", label: "Փեսայի կողմից" },
];

function sideLabel(side: RsvpRecord["side"]) {
  return side === "bride" ? "Հարսի կողմից" : "Փեսայի կողմից";
}

function attendanceLabel(attendance: RsvpRecord["attendance"]) {
  return attendance === "yes" ? "Գալու է" : "Չի գալու";
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("hy-AM", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function RsvpAdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [rows, setRows] = useState<RsvpRecord[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RsvpFilter>("all");
  const [query, setQuery] = useState("");

  async function loadRows() {
    const response = await fetch("/api/rsvp", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (!response.ok) {
      throw new Error("load-failed");
    }
    const data = (await response.json()) as { rows: RsvpRecord[] };
    setRows(data.rows ?? []);
    setAuthenticated(true);
    setLoadError(null);
  }

  useEffect(() => {
    loadRows()
      .catch(() => {
        setAuthenticated(false);
        setLoadError(null);
      })
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setLoginError("Գաղտնաբառը սխալ է։");
        return;
      }

      setPassword("");
      await loadRows();
    } catch {
      setLoadError("Չհաջողվեց բեռնել տվյալները։");
      setLoginError("Չհաջողվեց մուտք գործել։");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setRows([]);
  }

  const visibleRows = useMemo(
    () => filterRsvps(rows, filter, query),
    [rows, filter, query],
  );
  const summary = useMemo(() => summarizeRsvps(rows), [rows]);

  if (checking) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background px-6">
        <p className="text-sm tracking-[0.18em] text-foreground-secondary">
          Բեռնվում է...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-sm border border-gold/20 bg-pearl/60 px-6 py-10 text-center"
        >
          <p className="font-serif text-2xl text-gold">RSVP</p>
          <p className="mt-3 text-sm text-foreground-secondary">
            Մուտք միայն Սերինեի համար
          </p>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Գաղտնաբառ"
            className="mt-8 w-full border-b border-gold/25 bg-transparent py-3 text-center text-foreground outline-none"
          />
          {loginError && (
            <p className="mt-4 text-sm text-[#9a4b3c]">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loggingIn}
            className="mt-8 w-full border border-gold/40 py-3 text-[0.7rem] tracking-[0.22em] text-gold disabled:opacity-40"
          >
            {loggingIn ? "Ստուգվում է..." : "Մուտք"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-gold md:text-3xl">
              RSVP ցուցակ
            </h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              Սերինե և Նարեկ
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="border border-gold/30 px-3 py-2 text-[0.65rem] tracking-[0.16em] text-gold"
          >
            Ելք
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryCard label="Գալու են" value={summary.comingPeople} />
          <SummaryCard label="Չեն գալու" value={summary.notComingResponses} />
          <SummaryCard label="Հարսի կողմից" value={summary.bridePeople} />
          <SummaryCard label="Փեսայի կողմից" value={summary.groomPeople} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`border px-3 py-2 text-[0.65rem] tracking-[0.14em] ${
                filter === item.id
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-gold/20 text-foreground-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Որոնել անունով"
          className="mt-5 w-full border-b border-gold/25 bg-transparent py-3 text-sm outline-none md:max-w-sm"
        />

        {loadError && (
          <p className="mt-4 text-sm text-[#9a4b3c]">{loadError}</p>
        )}

        <div className="mt-6 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold/20 text-[0.7rem] tracking-[0.12em] text-foreground-secondary">
                <th className="py-3 pr-4 font-normal">Անուն Ազգանուն</th>
                <th className="py-3 pr-4 font-normal">Կողմ</th>
                <th className="py-3 pr-4 font-normal">Պատասխան</th>
                <th className="py-3 pr-4 font-normal">Հյուրերի քանակ</th>
                <th className="py-3 font-normal">Ուղարկվել է</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr
                  key={`${row.fullName}-${row.submittedAt}`}
                  className="border-b border-gold/10"
                >
                  <td className="py-3 pr-4">{row.fullName}</td>
                  <td className="py-3 pr-4">{sideLabel(row.side)}</td>
                  <td className="py-3 pr-4">{attendanceLabel(row.attendance)}</td>
                  <td className="py-3 pr-4">{row.guestCount}</td>
                  <td className="py-3 text-foreground-secondary">
                    {formatDate(row.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-3 md:hidden">
          {visibleRows.map((row) => (
            <article
              key={`${row.fullName}-${row.submittedAt}`}
              className="rounded-sm border border-gold/15 bg-pearl/50 px-4 py-4"
            >
              <p className="font-serif text-lg text-gold">{row.fullName}</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                {sideLabel(row.side)}
              </p>
              <p className="mt-1 text-sm">{attendanceLabel(row.attendance)}</p>
              <p className="mt-1 text-sm">Հյուրեր՝ {row.guestCount}</p>
              <p className="mt-2 text-xs text-foreground-secondary">
                {formatDate(row.submittedAt)}
              </p>
            </article>
          ))}
        </div>

        {visibleRows.length === 0 && (
          <p className="mt-8 text-sm text-foreground-secondary">
            Ցուցակը դատարկ է։
          </p>
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border border-gold/20 bg-pearl/50 px-4 py-5 text-center">
      <p className="text-[0.65rem] tracking-[0.16em] text-foreground-secondary">
        {label}
      </p>
      <p className="mt-3 font-serif text-3xl text-gold">{value}</p>
    </div>
  );
}
