import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Tidak dipakai lagi (animasi mengikuti posisi scroll); dipertahankan agar API tetap sama. */
  delay?: number;
  /** Arah masuk elemen. */
  from?: "bottom" | "left" | "right";
};

const OFFSET: Record<NonNullable<RevealProps["from"]>, CSSProperties> = {
  bottom: {},
  left: { "--reveal-x": "-28px", "--reveal-y": "0px" } as CSSProperties,
  right: { "--reveal-x": "28px", "--reveal-y": "0px" } as CSSProperties,
};

/**
 * Muncul perlahan saat elemen masuk viewport — murni CSS (scroll-driven
 * animation, lihat `.reveal` di `globals.css`), tanpa JavaScript.
 *
 * Konten selalu terlihat di HTML awal. Browser yang belum mendukung
 * `animation-timeline` atau pengguna dengan "reduce motion" melihatnya tanpa
 * animasi, bukan tersembunyi.
 */
export function Reveal({ children, className, from = "bottom" }: RevealProps) {
  return (
    <div className={cn("reveal", className)} style={OFFSET[from]}>
      {children}
    </div>
  );
}
