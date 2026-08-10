"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
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
   * portal dibiarkan terpasang supaya animasi menutupnya sempat berjalan.
   */
  const [isPortalReady, setIsPortalReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Kunci scroll halaman dan tutup dengan Escape selagi panel terbuka.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function open() {
    setIsPortalReady(true);
    setIsOpen(true);
  }

  const panel = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm lg:hidden"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.nav
            aria-label={t("openMenu")}
            className="ms-auto flex h-full w-[min(20rem,86vw)] flex-col gap-10 border-s border-line bg-canvas p-7"
            initial={shouldReduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <LocaleSwitcher />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t("closeMenu")}
                autoFocus
                className="flex size-11 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {/* Menutup panel di sini sekaligus menangani perpindahan
                      halaman — tidak perlu memantau pathname. */}
                  <NavLink href={item.href} onNavigate={() => setIsOpen(false)}>
                    {t(item.key)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <WhatsAppCta size="lg" className="mt-auto w-full" />
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
