"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { ServiceIconName } from "@/lib/content-schema";

type Item = {
  slug: string;
  icon: ServiceIconName;
  name: string;
  summary: string;
  image: string;
};

/**
 * Di desktop, menyorot (hover/fokus) satu layanan mengganti foto besar di
 * kiri dengan crossfade — gerak yang menjawab aksi pengunjung. Di ponsel
 * foto besar disembunyikan dan setiap baris membawa foto kecilnya sendiri.
 */
export function ServicesOverviewList({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      {/* Tinggi foto mengikuti daftar di sebelahnya (grid meregangkan kolom), jadi
          tidak ada ruang kosong di bawah foto. */}
      <div className="relative hidden min-h-[28rem] overflow-hidden rounded-3xl bg-canvas lg:block">
        {items.map((item, index) => (
          <Image
            key={item.slug}
            src={item.image}
            alt=""
            aria-hidden="true"
            fill
            quality={85}
            sizes="(min-width: 1280px) 30rem, 40vw"
            className={cn(
              "object-cover transition-[opacity,scale] duration-700 ease-out-soft",
              index === active
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0",
            )}
          />
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={item.slug}>
            <Link
              href={{
                pathname: "/layanan/[slug]",
                params: { slug: item.slug },
              }}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={cn(
                "group flex items-start gap-4 rounded-3xl p-3 transition-colors duration-300 sm:gap-5 sm:p-4",
                index === active ? "lg:bg-canvas" : "hover:bg-canvas/60",
              )}
            >
              <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24 lg:hidden">
                <Image
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  quality={85}
                  sizes="6rem"
                  className="object-cover"
                />
              </span>
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 lg:flex">
                <ServiceIcon name={item.icon} className="size-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1.3rem] leading-snug sm:text-[1.5rem]">
                  {item.name}
                </span>
                <span className="mt-1 line-clamp-2 block text-[0.925rem] leading-[1.6] text-ink-soft">
                  {item.summary}
                </span>
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-ink-muted transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
