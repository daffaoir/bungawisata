"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: StaticAppPathname;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  /**
   * `mobile` untuk menu panel: huruf sedikit lebih besar dan tinggi baris
   * minimal 44px supaya mudah disentuh.
   */
  variant?: "desktop" | "mobile";
};

export function NavLink({
  href,
  children,
  className,
  onNavigate,
  variant = "desktop",
}: NavLinkProps) {
  const pathname = usePathname();

  // Halaman detail paket ikut menandai menu "Paket Wisata" sebagai aktif.
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-medium transition-colors duration-300",
        variant === "mobile"
          ? cn(
              "flex min-h-14 items-center rounded-2xl px-4 font-display text-[1.6rem]",
              isActive ? "bg-canvas-alt text-ink" : "text-ink hover:bg-canvas-alt/70",
            )
          : cn(
              "inline-flex min-h-10 items-center rounded-full px-4 text-[0.95rem]",
              isActive ? "bg-canvas-alt text-ink" : "text-ink-soft hover:bg-canvas-alt/70 hover:text-ink",
            ),
        className,
      )}
    >
      {children}
    </Link>
  );
}
