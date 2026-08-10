import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "ink" | "gold" | "outline" | "light";

const TONES: Record<BadgeTone, string> = {
  ink: "border-ink bg-ink text-canvas",
  gold: "border-gold-600 bg-gold-600 text-white",
  outline: "border-ink/20 bg-transparent text-ink",
  light: "border-white/40 bg-white/10 text-white backdrop-blur-sm",
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
        "inline-flex items-center gap-1.5 border px-3 py-1",
        "text-[0.62rem] font-semibold tracking-[0.16em] uppercase",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
