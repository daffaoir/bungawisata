"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/shared/Section";
import { gallery } from "@/content/gallery";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Carousel foto di beranda.
 *
 * Penggeserannya memakai `scroll-snap` asli peramban, bukan transform yang
 * dihitung sendiri — jadi geser sentuh, roda mouse mendatar, dan penggulung
 * papan ketik bawaan semuanya bekerja tanpa kode tambahan. Tombol panah hanya
 * memanggil `scrollBy` selebar satu kartu.
 */
export function GalleryCarousel() {
  const t = useTranslations("Home.gallery");
  const locale = useLocale() as AppLocale;

  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    /*
     * Jalurnya punya padding kiri (px-5 / sm:px-8) yang diimbangi
     * `scroll-padding` yang sama, jadi posisi snap kartu pertama adalah
     * scrollLeft 0. Toleransi selebar padding tetap dipertahankan untuk
     * peramban yang mengunci kartu tepat setelah padding tanpa memperhitungkan
     * scroll-padding. Toleransi 2px karena pembulatan sub-piksel.
     */
    const padStart =
      Number.parseFloat(getComputedStyle(track).paddingInlineStart) || 0;

    setAtStart(track.scrollLeft <= padStart + 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("li");
    // 24px = jarak antarkartu (`gap-6`).
    const step = card ? card.clientWidth + 24 : track.clientWidth * 0.8;

    // Aturan `prefers-reduced-motion` di globals.css hanya mematikan
    // `scroll-behavior` milik CSS; nilai yang dikirim langsung ke `scrollBy`
    // tetap dihormati peramban, jadi pengecekannya harus dilakukan di sini.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({
      left: step * direction,
      behavior: reduced ? "auto" : "smooth",
    });
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

  return (
    <Section tone="canvas">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <div className="flex gap-2">
            <CarouselButton
              label={t("previous")}
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </CarouselButton>
            <CarouselButton
              label={t("next")}
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </CarouselButton>
          </div>
        }
      />

      {/*
        `-mx-5` melebarkan jalur sampai tepi layar di ponsel supaya kartu
        terakhir terlihat "terpotong" — petunjuk visual bahwa masih ada lagi.
        `scroll-px-*` (scroll-padding) membuat snap kartu sejajar kolom teks,
        dan di `lg` jalurnya diteruskan sampai tepi kanan viewport sehingga
        potongannya terjadi di tepi layar, bukan di tepi container. Kelebihan
        lebarnya dipotong oleh `overflow-hidden` milik `Section`.
      */}
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={t("title")}
        className={cn(
          "-mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-4",
          "sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:me-[calc(50%-50vw)]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {gallery.map((item) => (
          <li
            key={item.src}
            className="w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[26rem]"
          >
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.caption[locale]}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 78vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-ink-soft">
                {item.caption[locale]}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          href="/galeri"
          className="-my-3 inline-flex min-h-11 items-center gap-2.5 py-3 text-[0.72rem] font-semibold tracking-[0.14em] text-gold-600 uppercase transition-colors hover:text-ink"
        >
          {t("viewAll")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-11 items-center justify-center border transition-colors duration-300",
        disabled
          ? "border-line text-ink-muted/40"
          : "border-ink text-ink hover:bg-ink hover:text-canvas",
      )}
    >
      {children}
    </button>
  );
}
