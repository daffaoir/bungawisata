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
 * Tombol persegi berhuruf kapital dengan jarak antarhuruf lebar. Bentuk pil
 * dan bayangan tebal sengaja ditinggalkan — kesan tenang datang dari garis
 * tegas dan ruang kosong, bukan dari kedalaman.
 */
const BASE =
  "group/btn inline-flex items-center justify-center gap-2.5 " +
  "font-sans font-semibold uppercase tracking-[0.1em] " +
  "border transition-colors duration-300 " +
  "disabled:pointer-events-none disabled:opacity-50";

/**
 * Semua kombinasi di bawah sudah dicek kontrasnya minimal 4,5:1.
 * `gold-600` adalah nuansa emas paling terang yang masih aman dengan teks
 * putih; jangan turunkan ke gold-500.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-ink bg-ink text-canvas hover:bg-gold-600 hover:border-gold-600",
  gold: "border-gold-600 bg-gold-600 text-white hover:bg-ink hover:border-ink",
  outline: "border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  outlineLight:
    "border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
  white: "border-white bg-white text-ink hover:bg-transparent hover:text-white",
  ghost: "border-transparent bg-transparent text-ink hover:text-gold-600",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[0.68rem]",
  md: "px-6 py-3 text-[0.72rem]",
  lg: "px-8 py-4 text-[0.78rem]",
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
