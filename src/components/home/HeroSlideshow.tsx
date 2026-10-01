"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  src: string;
  /** Nama tempat, tampil di pojok foto dan dipakai sebagai alt. */
  place: string;
  /** `object-position` di ponsel, tempat bingkainya jauh lebih sempit. */
  mobilePosition?: string;
};

const INTERVAL_MS = 6500;
/** Foto kedua dst. baru dipasang setelah foto pertama sempat tampil. */
const PRELOAD_DELAY_MS = 1800;

/**
 * Foto hero yang berganti pelan-pelan: crossfade, dan foto yang sedang
 * tampil perlahan "mundur" (Ken Burns). Hanya foto pertama yang dimuat
 * dengan prioritas; sisanya dipasang setelah halaman tenang supaya LCP tidak
 * berebut bandwidth.
 *
 * Rotasi berhenti saat tab tersembunyi, dan tidak berjalan sama sekali untuk
 * pengguna yang meminta gerakan dikurangi. Tombol di pojok memungkinkan
 * memilih foto secara manual.
 */
export function HeroSlideshow({
  slides,
  chooseLabel,
}: {
  slides: HeroSlide[];
  /** Label tombol indikator dengan penanda `{place}`, mis. "Tampilkan foto {place}". */
  chooseLabel: string;
}) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const preload = window.setTimeout(
      () => setMounted(slides.length),
      PRELOAD_DELAY_MS,
    );
    return () => window.clearTimeout(preload);
  }, [slides.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused || mounted < slides.length) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, mounted, slides.length]);

  return (
    <>
      {/* Pembungkus 10% lebih tinggi dari bingkai untuk ruang gerak parallax. */}
      <div className="parallax absolute inset-x-0 -top-[5%] -bottom-[5%]">
        {slides.slice(0, mounted).map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                // `key` memulai ulang animasi Ken Burns setiap kali foto aktif.
                key={isActive ? `on-${active}` : "off"}
                src={slide.src}
                alt={isActive ? slide.place : ""}
                fill
                preload={index === 0}
                quality={85}
                sizes="(min-width: 640px) calc(100vw - 2rem), calc(100vw - 1rem)"
                className={cn(
                  "object-cover sm:object-center",
                  isActive && "ken-burns",
                  slide.mobilePosition,
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute right-3 bottom-3 z-10 flex items-center gap-2 sm:top-7 sm:right-7 sm:bottom-auto">
        <p aria-live="polite" className="sr-only">
          {slides[active].place}
        </p>
        <p
          aria-hidden="true"
          className="hidden rounded-full bg-daun-900/60 px-3 py-1 text-[0.85rem] text-canvas backdrop-blur-md sm:block"
        >
          {slides[active].place}
        </p>
        <div className="flex items-center">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => {
                setMounted(slides.length);
                setActive(index);
              }}
              aria-label={chooseLabel.replace("{place}", slide.place)}
              aria-current={index === active}
              // Titik kecil, area sentuh 32px; pembungkusnya cukup lebar.
              className="group flex size-8 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-500",
                  index === active
                    ? "w-6 bg-canvas"
                    : "w-2 bg-canvas/50 group-hover:bg-canvas/80",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
