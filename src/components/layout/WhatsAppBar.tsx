"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { cn } from "@/lib/cn";

/**
 * Versi ponsel tombol WhatsApp: bilah selebar layar di bawah, baru muncul
 * setelah pengunjung menggulir melewati layar pertama. Di atas lipatan,
 * hero sudah punya tombol WhatsApp sendiri, jadi bilah ini tidak menutupinya.
 */
export function WhatsAppBar({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      data-floating-wa
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Saat tersembunyi tidak bisa difokus atau diklik.
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-50 flex h-14 items-center justify-center gap-2.5 rounded-full bg-wa text-[1rem] font-semibold text-ink shadow-[0_18px_40px_-18px_rgba(42,31,22,0.75)] transition-[translate,opacity] duration-500 ease-out-soft active:scale-[0.98] sm:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[150%] opacity-0",
      )}
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      {label}
    </a>
  );
}
