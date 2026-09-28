import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Tidak dipakai lagi; dipertahankan agar API tetap sama. */
  gap?: number;
};

/**
 * Pembungkus grid untuk `StaggerItem`. Tiap item muncul sendiri-sendiri saat
 * masuk viewport (CSS scroll-driven, lihat `.reveal` di `globals.css`), jadi
 * kartu di baris bawah otomatis menyusul kartu di atasnya.
 */
export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
