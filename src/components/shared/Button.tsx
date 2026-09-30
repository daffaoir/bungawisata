import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "gold"
  | "outline"
  | "outlineLight"
  | "white"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

/**
 * Tombol pil dengan huruf biasa (sentence case). Tekanan kecil saat diklik
 * memberi tanda bahwa tombol merespons, tanpa bayangan tebal.
 */
const BASE =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full " +
  "font-sans font-semibold tracking-[-0.005em] " +
  "border transition-[background-color,border-color,color,scale] duration-300 ease-out-soft " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

/**
 * Semua kombinasi di bawah sudah dicek kontrasnya minimal 4,5:1.
 * - primary: kunyit dengan teks soga (7,4:1) — aksi utama.
 * - gold:    hijau daun dengan teks kertas (11,5:1) — aksi kedua yang tegas.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-gold-400 bg-gold-400 text-ink hover:border-gold-300 hover:bg-gold-300",
  gold: "border-daun bg-daun text-canvas hover:border-daun-900 hover:bg-daun-900",
  outline: "border-ink/20 bg-transparent text-ink hover:border-ink/50 hover:bg-ink/[0.04]",
  outlineLight:
    "border-canvas/40 bg-transparent text-canvas hover:border-canvas hover:bg-canvas/10",
  white: "border-canvas bg-canvas text-ink hover:border-gold-100 hover:bg-gold-100",
  ghost: "border-transparent bg-transparent text-ink hover:text-gold-600",
};

const SIZES: Record<ButtonSize, string> = {
  // `min-h-11` menjaga target sentuh minimal 44px.
  sm: "min-h-11 px-5 py-2 text-[0.9rem]",
  md: "min-h-12 px-6 py-2.5 text-[0.95rem]",
  lg: "min-h-14 px-7 py-3 text-base",
};

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: SharedProps & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

/** Tautan internal — path otomatis diterjemahkan sesuai bahasa aktif. */
export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: SharedProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/** Tautan keluar, mis. WhatsApp atau media sosial. */
export function ButtonAnchor({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: SharedProps & ComponentProps<"a">) {
  return (
    <a
      className={classes(variant, size, className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
