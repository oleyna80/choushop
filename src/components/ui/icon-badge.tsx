import type { ReactNode } from "react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function IconBadge({
  icon,
  className,
  children,
  ...props
}: BadgeProps & {
  icon?: ReactNode;
}) {
  return (
    <Badge className={cn("gap-1.5", className)} {...props}>
      {icon ? <span className="text-[0.82rem] leading-none">{icon}</span> : null}
      <span>{children}</span>
    </Badge>
  );
}
