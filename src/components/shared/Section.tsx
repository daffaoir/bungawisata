import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `ink` dipertahankan sebagai alias section gelap supaya pemanggil lama tetap
 * jalan; warnanya sekarang hijau daun, bukan hitam.
 */
type Tone = "canvas" | "white" | "alt" | "ink" | "daun";

const TONES: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  white: "bg-white text-ink",
  alt: "bg-canvas-alt text-ink",
  ink: "bg-daun text-canvas",
  daun: "bg-daun text-canvas",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  /** Padding vertikal lebih rapat untuk section pendek. */
  compact?: boolean;
  /**
   * Section berwarna tampil sebagai panel membulat yang sedikit masuk dari
   * tepi layar, bukan pita selebar layar. Memberi ritme berbeda dari section
   * polos di sekitarnya.
   */
  inset?: boolean;
};

export function Section({
  children,
  id,
  tone = "canvas",
  className,
  compact = false,
  inset = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        TONES[tone],
        compact ? "py-14 sm:py-20" : "py-20 sm:py-28",
        inset && "mx-2 rounded-[2rem] sm:mx-4 sm:rounded-[2.5rem]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
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
  /**
   * Di bawah `sm`, `action` dirender setelah subjudul supaya urutan bacanya
   * judul → penjelas → tombol. Isi `true` kalau pemanggil menaruh versi
   * ponselnya sendiri di tempat lain (mis. setelah daftar kartu).
   */
  hideActionOnMobile?: boolean;
  /** Tingkat judul; default `h2`. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
  action,
  hideActionOnMobile = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const titleClass = "max-w-3xl text-[2.1rem] sm:text-[2.75rem] lg:text-[3.25rem]";

  return (
    <div
      className={cn(
        !action && "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {action ? (
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading className={titleClass}>{title}</Heading>
          <div className="hidden shrink-0 sm:block">{action}</div>
        </div>
      ) : (
        <Heading className={titleClass}>{title}</Heading>
      )}

      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[1.075rem] leading-[1.7]",
            align === "center" && "mx-auto",
            isLight ? "text-canvas/80" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      ) : null}

      {action && !hideActionOnMobile ? (
        <div className="mt-6 sm:hidden">{action}</div>
      ) : null}
    </div>
  );
}
