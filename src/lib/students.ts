import { MOOD_DETAILS, type Mood } from "@/lib/mood";

export interface CheckIn {
  mood: Mood;
  submittedAt: string;
}

export interface Student {
  id: string;
  name: string;
  latestCheckIn: CheckIn | null;
}

// Fictional sample data. There is no backend in this example repo.
export const CLASS_NAME = "Year 8 · Maple";

export const STUDENTS: Student[] = [
  { id: "s1", name: "Amara Okafor", latestCheckIn: { mood: "great", submittedAt: "2026-11-09T08:41:00Z" } },
  { id: "s2", name: "Ben Hartley", latestCheckIn: { mood: "struggling", submittedAt: "2026-11-09T08:44:00Z" } },
  { id: "s3", name: "Chloé Martin", latestCheckIn: { mood: "okay", submittedAt: "2026-11-09T08:39:00Z" } },
  { id: "s4", name: "Dev Patel", latestCheckIn: { mood: "low", submittedAt: "2026-11-09T08:47:00Z" } },
  { id: "s5", name: "Erin Walsh", latestCheckIn: { mood: "good", submittedAt: "2026-11-09T08:36:00Z" } },
  { id: "s6", name: "Felix Nowak", latestCheckIn: null },
  { id: "s7", name: "Grace Liu", latestCheckIn: { mood: "good", submittedAt: "2026-11-09T08:52:00Z" } },
];

export function needsFollowUp(student: Student): boolean {
  return student.latestCheckIn !== null && MOOD_DETAILS[student.latestCheckIn.mood].needsFollowUp;
}

const TIME_FORMAT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London",
});

export function formatCheckInTime(isoTimestamp: string): string {
  return TIME_FORMAT.format(new Date(isoTimestamp));
}
