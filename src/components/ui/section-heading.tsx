import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-heading",
        align === "center" ? "mx-auto items-center text-center" : "",
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-[length:var(--text-h2)]">{title}</h2>
      {description ? (
        <p className="text-pretty text-base leading-7 text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
