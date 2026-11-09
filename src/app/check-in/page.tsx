import { CheckInForm } from "@/components/features/CheckInForm";

export default function CheckInPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Morning check-in</h1>
        <p className="mt-1 text-text-muted">
          Takes ten seconds. Only your teacher sees your answer.
        </p>
      </div>
      <CheckInForm />
    </div>
  );
}
