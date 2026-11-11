import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOOD_DETAILS } from "@/lib/mood";
import {
  formatCheckInTime,
  groupByPriority,
  needsFollowUp,
  type Student,
} from "@/lib/students";

export interface StudentListProps {
  /** The students to show. They are grouped for you, so pass the whole class rather than a filtered list. */
  students: Student[];
  /** What to show when `students` is empty. Write it for the context. For example, "Everyone seems okay today." */
  emptyMessage?: string;
}

const NOTHING_TO_FLAG_MESSAGE = "Everyone seems okay today.";

function EmptyNote({ children }: { children: string }) {
  return (
    <p className="rounded-control bg-surface-sunken px-4 py-6 text-center text-sm text-text-muted">
      {children}
    </p>
  );
}

function StudentRow({ student }: { student: Student }) {
  const checkIn = student.latestCheckIn;
  const mood = checkIn ? MOOD_DETAILS[checkIn.mood] : null;

  return (
    // On phones the badge and button drop under the name, lined up with it (pl-13 = avatar width + gap),
    // so the name keeps its room. From `sm` up they sit on the same line as before.
    <li className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3">
      <Avatar name={student.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{student.name}</p>
        <p className="text-sm text-text-muted">
          {checkIn ? `Checked in at ${formatCheckInTime(checkIn.submittedAt)}` : "Not checked in yet"}
        </p>
      </div>
      <div className="flex basis-full items-center gap-2 pl-13 sm:basis-auto sm:pl-0">
        {mood ? <Badge tone={mood.tone}>{mood.label}</Badge> : <Badge>No check-in</Badge>}
        {needsFollowUp(student) && (
          <Button size="sm" variant="secondary" aria-label={`Follow up with ${student.name}`}>
            Follow up
          </Button>
        )}
      </div>
    </li>
  );
}

/**
 * A class register for teachers, grouped so the students who might want a quiet word are at the top.
 *
 * The groups are built in: "Needs attention" (hardest mornings first), then "Not checked in yet",
 * then "Checked in and okay". Each row shows the name, the check-in time and a mood `Badge`.
 * Students who need a follow-up also get a "Follow up" button.
 *
 * **Use for:** showing a whole class on a teacher-facing page.
 *
 * **Don't use for:** a list of anything other than students. Don't split the class into several
 * lists yourself: pass everyone and let the groups do it, so no student appears twice.
 *
 * "Needs attention" always shows, with a friendly message when it is empty. The other groups
 * only show when someone is in them. Give an `emptyMessage` that fits where the list is used,
 * because an empty list should still tell the teacher something.
 */
export function StudentList({
  students,
  emptyMessage = "No students to show yet.",
}: StudentListProps) {
  if (students.length === 0) {
    return <EmptyNote>{emptyMessage}</EmptyNote>;
  }

  const visibleGroups = groupByPriority(students).filter(
    (group) => group.id === "needs-attention" || group.students.length > 0,
  );

  return (
    <div className="flex flex-col gap-6">
      {visibleGroups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-1 text-sm font-semibold text-text-muted">
            {group.title} · {group.students.length}
          </h3>
          {group.students.length === 0 ? (
            <EmptyNote>{NOTHING_TO_FLAG_MESSAGE}</EmptyNote>
          ) : (
            <ul className="divide-y divide-border">
              {group.students.map((student) => (
                <StudentRow key={student.id} student={student} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
