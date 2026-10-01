"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  /** Keterangan di bawah foto besar. Kosong = tidak ditampilkan. */
  caption?: string;
};

type LightboxContextValue = {
  items: readonly LightboxItem[];
  open: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/** Jarak geser minimum (px) supaya dianggap swipe, bukan ketukan. */
const SWIPE_MIN = 50;

/**
 * Galeri foto yang bisa diperbesar. Bungkus grid foto dengan `Lightbox`, lalu
 * pasang `LightboxTrigger` di dalam tiap kotak foto (kotaknya harus
 * `relative`). Grid dan `next/image`-nya tetap dirender di server; hanya
 * tombol dan dialog yang berjalan di browser.
 *
 * Memakai `<dialog>` native: Esc, focus trap, dan pengembalian fokus ke
 * tombol asal sudah ditangani browser.
 */
export function Lightbox({
  items,
  children,
}: {
  items: readonly LightboxItem[];
  children: ReactNode;
}) {
  const t = useTranslations("Lightbox");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((next: number) => {
    setIndex(next);
    dialogRef.current?.showModal();
  }, []);

  // State di-reset langsung di sini, tidak menunggu event `close`: event itu
  // tidak selalu sampai (mis. tab latar), dan tanpa reset scroll halaman
  // tetap terkunci.
  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null
          ? current
          : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  // Halaman di belakang dialog tidak ikut tergulir selama foto terbuka.
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const item = index === null ? null : items[index];
  const many = items.length > 1;

  return (
    <LightboxContext.Provider value={{ items, open }}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label={item?.caption || item?.alt || t("dialogLabel")}
        onClick={(event) => {
          // Klik di area gelap (dialog itu sendiri, bukan isinya) = tutup.
          if (event.target === event.currentTarget) close();
        }}
        onCancel={(event) => {
          // Esc: tutup lewat `close()` supaya state ikut ter-reset.
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            close();
            return;
          }
          if (!many) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (!many || start === null || end === undefined) return;
          const dx = end - start;
          if (Math.abs(dx) >= SWIPE_MIN) step(dx < 0 ? 1 : -1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-daun-900/95 p-0 text-canvas backdrop:bg-transparent open:flex open:flex-col"
      >
        {item ? (
          <>
            <div className="flex shrink-0 items-center justify-between gap-4 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
              <p className="ps-2 text-sm text-canvas/75 tabular-nums">
                {many
                  ? t("counter", {
                      current: (index ?? 0) + 1,
                      total: items.length,
                    })
                  : null}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label={t("close")}
                className="inline-flex size-12 items-center justify-center rounded-full bg-canvas/10 transition-colors hover:bg-canvas/20"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                fill
                quality={85}
                sizes="100vw"
                className="object-contain p-2 sm:p-6"
              />

              {many ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={t("previous")}
                    className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-daun-900/60 transition-colors hover:bg-daun-900/90 sm:left-5"
                  >
                    <ChevronLeft className="size-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={t("next")}
                    className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-daun-900/60 transition-colors hover:bg-daun-900/90 sm:right-5"
                  >
                    <ChevronRight className="size-6" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>

            <p className="min-h-[3.5rem] shrink-0 px-5 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-[0.95rem] leading-snug text-canvas/85">
              {item.caption}
            </p>
          </>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

/**
 * Tombol transparan selebar kotak foto yang membuka foto ke-`index` di
 * `Lightbox` terdekat. Letakkan di dalam elemen `relative` yang memuat foto.
 */
export function LightboxTrigger({ index }: { index: number }) {
  const t = useTranslations("Lightbox");
  const context = useContext(LightboxContext);
  if (!context) throw new Error("LightboxTrigger harus di dalam <Lightbox>");

  const item = context.items[index];

  return (
    <button
      type="button"
      onClick={() => context.open(index)}
      aria-label={t("open", { label: item?.caption || item?.alt || "" })}
      aria-haspopup="dialog"
      className="absolute inset-0 z-10 cursor-zoom-in rounded-[inherit] focus-visible:outline-offset-[-4px]"
    />
  );
}
