import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "canvas" | "white" | "alt" | "ink";

const TONES: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  white: "bg-white text-ink",
  alt: "bg-canvas-alt text-ink",
  ink: "bg-ink text-white",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  /** Padding vertikal lebih rapat untuk section pendek. */
  compact?: boolean;
};

export function Section({
  children,
  id,
  tone = "canvas",
  className,
  compact = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        TONES[tone],
        compact ? "py-16 sm:py-20" : "py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  /**
   * Elemen di sisi kanan judul, biasanya tombol "Lihat semua". Sejajar
   * dengan baris judul saja — bukan direntangkan ke bawah subjudul lewat
   * `items-end` di pemanggil, yang membuat tombol jatuh ke baris terakhir
   * subjudul kalau teksnya panjang dan melipat dua baris.
   */
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
  action,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        !action && "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow rule-gold mb-4",
            align === "center" && "rule-gold-center",
            isLight ? "text-gold-400" : "text-gold-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      {action ? (
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-2xl text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
            {title}
          </h2>
          <div className="shrink-0">{action}</div>
        </div>
      ) : (
        <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">{title}</h2>
      )}

      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[1.05rem] leading-[1.75]",
            isLight ? "text-white/70" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
