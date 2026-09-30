"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScrollStripProps = {
  /** Nama strip untuk pembaca layar, mis. judul section. */
  label: string;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
  /** Kelas untuk setiap `<li>` (lebar kartu). */
  itemClassName?: string;
  /** Konten di kiri bilah kontrol, mis. tautan "lihat semua". */
  footer?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Deretan kartu yang digeser mendatar.
 *
 * Penggeserannya memakai `scroll-snap` asli peramban, jadi geser sentuh, roda
 * mouse mendatar, dan papan ketik bekerja tanpa kode tambahan. Di bawah strip
 * ada bilah progres dan dua tombol bulat — dekat dengan kartunya, bukan di
 * pojok judul — supaya jelas bahwa deretan ini bisa digeser.
 *
 * Posisi awal kartu pertama rata dengan teks di atasnya, tetapi jalurnya
 * melebar keluar kolom ke kiri dan kanan sampai sejajar panel membulat di
 * tepi layar (`.strip-bleed` di globals.css). Kartu yang sedang lewat terlihat
 * terpotong di sana, tidak menempel ke tepi layar.
 */
export function ScrollStrip({
  label,
  previousLabel,
  nextLabel,
  children,
  itemClassName,
  footer,
  tone = "dark",
  className,
}: ScrollStripProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    // Toleransi 2px karena pembulatan sub-piksel.
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);
    setScrollable(max > 2);

    // Bilah progres: lebar minimal = porsi yang sedang terlihat.
    if (barRef.current) {
      const visible = track.clientWidth / track.scrollWidth;
      const progress = max > 0 ? track.scrollLeft / max : 1;
      const width = visible + (1 - visible) * progress;
      barRef.current.style.transform = `scaleX(${Math.min(1, width)})`;
    }
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const first = track.querySelector("li");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first ? first.clientWidth + gap : track.clientWidth * 0.8;

    // Aturan `prefers-reduced-motion` di globals.css hanya mematikan
    // `scroll-behavior` milik CSS; nilai yang dikirim ke `scrollBy` tetap
    // dihormati peramban, jadi pengecekannya dilakukan di sini.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: step * direction, behavior: reduced ? "auto" : "smooth" });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  }

  const isLight = tone === "light";

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        onScroll={sync}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={label}
        className="strip strip-bleed gap-4 pb-2 sm:gap-6 rounded-3xl focus-visible:outline-offset-4"
      >
        {Children.map(children, (child) => (
          <li className={itemClassName}>{child}</li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-5">
        {footer ? <div className="me-auto">{footer}</div> : null}

        {scrollable ? (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "relative hidden h-1 flex-1 overflow-hidden rounded-full sm:block",
                footer ? "max-w-xs" : "",
                isLight ? "bg-canvas/20" : "bg-ink/10",
              )}
            >
              <span
                ref={barRef}
                className={cn(
                  "absolute inset-0 origin-left rounded-full transition-transform duration-300 ease-out-soft",
                  isLight ? "bg-gold-400" : "bg-ink",
                )}
                style={{ transform: "scaleX(0.25)" }}
              />
            </span>

            <div className={cn("flex gap-2", !footer && "ms-auto")}>
              <StripButton
                label={previousLabel}
                disabled={atStart}
                onClick={() => scrollByCard(-1)}
                light={isLight}
              >
                <ArrowLeft className="size-[1.1rem]" aria-hidden="true" />
              </StripButton>
              <StripButton
                label={nextLabel}
                disabled={atEnd}
                onClick={() => scrollByCard(1)}
                light={isLight}
              >
                <ArrowRight className="size-[1.1rem]" aria-hidden="true" />
              </StripButton>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function StripButton({
  label,
  disabled,
  onClick,
  light,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  light: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-12 items-center justify-center rounded-full border transition-[background-color,color,border-color,scale] duration-300 active:scale-95",
        light
          ? disabled
            ? "border-canvas/15 text-canvas/35"
            : "border-canvas/40 text-canvas hover:bg-canvas hover:text-daun"
          : disabled
            ? "border-ink/10 text-ink/30"
            : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
      )}
    >
      {children}
    </button>
  );
}
