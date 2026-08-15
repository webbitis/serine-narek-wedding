import type { Metadata } from "next";
import { RsvpAdminDashboard } from "@/components/admin/RsvpAdminDashboard";

export const metadata: Metadata = {
  title: "RSVP | Ադմին",
  robots: { index: false, follow: false },
};

export default function AdminRsvpPage() {
  return <RsvpAdminDashboard />;
}
