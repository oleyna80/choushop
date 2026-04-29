import { cn } from "@/lib/utils";

type StepStatus = "current" | "upcoming" | "complete";

export function CheckoutStepIndicator({
  steps
}: {
  steps: Array<{
    label: string;
    detail: string;
    status: StepStatus;
  }>;
}) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => (
        <li
          className="surface-panel grid gap-3 rounded-[var(--radius-lg)] border border-white/70 p-4"
          key={step.label}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                step.status === "current"
                  ? "bg-[var(--accent)] text-white shadow-[var(--shadow-soft)]"
                  : "",
                step.status === "complete"
                  ? "bg-[rgba(75,184,137,0.15)] text-[var(--success)]"
                  : "",
                step.status === "upcoming"
                  ? "border border-[var(--line)] bg-white/70 text-[var(--muted)]"
                  : ""
              )}
            >
              {index + 1}
            </span>
            <div className="grid gap-0.5">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {step.label}
              </span>
              <span className="text-xs leading-5 text-[var(--muted)]">{step.detail}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
