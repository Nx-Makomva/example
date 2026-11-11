import { StudentList } from "@/components/features/StudentList";
import { Card } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { CLASS_NAME, needsFollowUp, STUDENTS } from "@/lib/students";

export default function ClassOverviewPage() {
  const checkedIn = STUDENTS.filter((student) => student.latestCheckIn !== null);
  const followUps = STUDENTS.filter(needsFollowUp);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-text-muted">{CLASS_NAME}</p>
        <h1 className="text-3xl font-semibold">Good morning</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Checked in today"
          value={`${checkedIn.length}/${STUDENTS.length}`}
          hint="Morning registration"
        />
        <StatTile
          label="Need a follow-up"
          value={followUps.length}
          hint="Said they feel low or are struggling"
          tone={followUps.length > 0 ? "concern" : "neutral"}
        />
        <StatTile label="Not checked in" value={STUDENTS.length - checkedIn.length} />
      </div>

      <Card
        title="Your class today"
        description="Anyone who might want a quiet word is at the top."
      >
        <StudentList students={STUDENTS} />
      </Card>
    </div>
  );
}
