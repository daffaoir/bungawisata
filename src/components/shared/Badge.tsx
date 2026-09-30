import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "ink" | "gold" | "outline" | "light";

const TONES: Record<BadgeTone, string> = {
  ink: "border-transparent bg-daun text-canvas",
  gold: "border-transparent bg-gold-400 text-ink",
  outline: "border-ink/15 bg-canvas/80 text-ink",
  light: "border-canvas/30 bg-canvas/15 text-canvas backdrop-blur-sm",
};

export function Badge({
  children,
  tone = "outline",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
        "text-[0.8rem] font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
