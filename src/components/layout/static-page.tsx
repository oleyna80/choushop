import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function StaticPage({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionShell density="tight">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          description="Informations essentielles pour preparer, recevoir et comprendre ta demande ChouShop."
          eyebrow={eyebrow}
          title={title}
        />
        <div className="surface-panel mt-8 grid gap-5 rounded-[var(--radius-xl)] p-6 text-pretty leading-7 text-[var(--muted)] md:p-8">
          {children}
        </div>
      </div>
    </SectionShell>
  );
}
