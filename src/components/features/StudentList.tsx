import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOOD_DETAILS } from "@/lib/mood";
import { formatCheckInTime, needsFollowUp, type Student } from "@/lib/students";

export interface StudentListProps {
  /** The students to show, in the order given. */
  students: Student[];
  /** What to show when `students` is empty. Write it for the context. For example, "Everyone seems okay today." */
  emptyMessage?: string;
}

/**
 * A list of students showing each one's latest mood, for teachers.
 *
 * Each row shows the name, the check-in time and a mood `Badge`. Students who
 * need a follow-up also get a "Follow up" button.
 *
 * **Use for:** any teacher-facing list of students.
 *
 * Always give an `emptyMessage` that fits where the list is used, because an
 * empty list should still tell the teacher something.
 */
export function StudentList({
  students,
  emptyMessage = "No students to show yet.",
}: StudentListProps) {
  if (students.length === 0) {
    return (
      <p className="rounded-control bg-surface-sunken px-4 py-6 text-center text-sm text-text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {students.map((student) => {
        const checkIn = student.latestCheckIn;
        const mood = checkIn ? MOOD_DETAILS[checkIn.mood] : null;

        return (
          <li key={student.id} className="flex items-center gap-3 py-3">
            <Avatar name={student.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{student.name}</p>
              <p className="text-sm text-text-muted">
                {checkIn ? `Checked in at ${formatCheckInTime(checkIn.submittedAt)}` : "Not checked in yet"}
              </p>
            </div>
            {mood ? <Badge tone={mood.tone}>{mood.label}</Badge> : <Badge>No check-in</Badge>}
            {needsFollowUp(student) && (
              <Button size="sm" variant="secondary" aria-label={`Follow up with ${student.name}`}>
                Follow up
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
