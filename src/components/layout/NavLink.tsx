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
};

export function NavLink({
  href,
  children,
  className,
  onNavigate,
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
        "relative text-[0.82rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300",
        "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-600",
        "after:transition-all after:duration-500",
        isActive
          ? "text-ink after:w-full"
          : "text-ink-muted after:w-0 hover:text-ink hover:after:w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}
