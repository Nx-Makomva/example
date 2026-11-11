import { MOOD_DETAILS, MOODS, type Mood } from "@/lib/mood";

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

export type StudentGroupId = "needs-attention" | "not-checked-in" | "checked-in-okay";

export interface StudentGroup {
  id: StudentGroupId;
  title: string;
  students: Student[];
}

// MOODS runs from best to worst, so a later position means a harder morning.
// A student with no check-in has no mood, so they get -1 and sort last.
function moodSeverity(student: Student): number {
  return student.latestCheckIn ? MOODS.indexOf(student.latestCheckIn.mood) : -1;
}

/**
 * Splits a class into the groups a teacher scans top to bottom:
 * who might want a quiet word, who has not checked in, and everyone else.
 * The groups are worked out from the list you pass in, so nothing is stored twice.
 */
export function groupByPriority(students: Student[]): StudentGroup[] {
  return [
    {
      id: "needs-attention",
      title: "Needs attention",
      // `filter` returns a new array, so sorting it never reorders the original list.
      students: students.filter(needsFollowUp).sort((a, b) => moodSeverity(b) - moodSeverity(a)),
    },
    {
      id: "not-checked-in",
      title: "Not checked in yet",
      students: students.filter((student) => student.latestCheckIn === null),
    },
    {
      id: "checked-in-okay",
      title: "Checked in and okay",
      students: students.filter(
        (student) => student.latestCheckIn !== null && !needsFollowUp(student),
      ),
    },
  ];
}

const TIME_FORMAT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London",
});

export function formatCheckInTime(isoTimestamp: string): string {
  return TIME_FORMAT.format(new Date(isoTimestamp));
}
