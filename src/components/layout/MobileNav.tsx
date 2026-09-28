"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NAV_ITEMS } from "./nav-items";
import { NavLink } from "./NavLink";

export function MobileNav() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  /**
   * Portal baru dipasang setelah menu pertama kali dibuka. Karena itu hanya
   * bisa terjadi lewat klik di browser, `document` dijamin sudah ada — tidak
   * perlu flag "sudah ter-mount" yang di-set dari dalam effect. Setelah itu
   * portal dibiarkan terpasang supaya transisi menutupnya sempat berjalan.
   */
  const [isPortalReady, setIsPortalReady] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Kunci scroll halaman dan tutup dengan Escape selagi panel terbuka.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function open() {
    setIsPortalReady(true);
    setIsOpen(true);
  }

  /*
   * Panel tetap terpasang setelah dibuka pertama kali; buka/tutup cukup
   * transisi CSS. Saat tertutup ia `inert` dan `invisible` (visibility baru
   * berubah setelah transisi selesai), jadi tidak bisa difokus maupun diklik.
   */
  const panel = (
    <div
      data-mobile-nav-open={isOpen ? "" : undefined}
      inert={!isOpen}
      className={cn(
        "fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-[opacity,visibility] duration-200 lg:hidden",
        isOpen ? "visible opacity-100" : "invisible opacity-0",
      )}
      onClick={() => setIsOpen(false)}
    >
      <nav
        aria-label={t("openMenu")}
        className={cn(
          "ms-auto flex h-full w-[min(20rem,86vw)] flex-col gap-10 border-s border-line bg-canvas p-7",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <LocaleSwitcher />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t("closeMenu")}
            className="flex size-11 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              {/* Menutup panel di sini sekaligus menangani perpindahan
                  halaman — tidak perlu memantau pathname. */}
              <NavLink
                href={item.href}
                variant="mobile"
                onNavigate={() => setIsOpen(false)}
              >
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <WhatsAppCta size="lg" className="mt-auto w-full" />
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={open}
        aria-label={t("openMenu")}
        aria-expanded={isOpen}
        className="flex size-11 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {/*
       * Panel dipasang lewat portal ke <body>.
       *
       * Header memakai `backdrop-blur`, dan properti itu menjadikan header
       * sebagai containing block bagi elemen `fixed` di dalamnya — tanpa
       * portal, panel ini hanya setinggi header, bukan menutupi layar.
       */}
      {isPortalReady ? createPortal(panel, document.body) : null}
    </div>
  );
}
