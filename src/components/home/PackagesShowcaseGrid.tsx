"use client";

import { useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/shared/Button";
import { cn } from "@/lib/cn";
import type { Region } from "@/lib/schema";

type Filter = "all" | Region;

type PackagesShowcaseGridProps = {
  labels: {
    group: string;
    all: string;
    domestic: string;
    international: string;
    viewAll: string;
  };
  items: Array<{ key: string; region: Region; card: ReactNode }>;
};

/** Jumlah kartu yang tampil: 3 kolom × 2 baris di desktop. */
const LIMIT = 6;

/**
 * Grid paket populer dengan tab region, rata kiri-kanan dengan judul. Tidak
 * digeser: daftar lengkapnya ada di /paket. Di ponsel hanya tiga kartu dan
 * di tablet empat, supaya halaman tidak terlalu panjang.
 */
export function PackagesShowcaseGrid({ labels, items }: PackagesShowcaseGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const tabs: Array<{ value: Filter; label: string }> = [
    { value: "all", label: labels.all },
    { value: "dalam-negeri", label: labels.domestic },
    { value: "luar-negeri", label: labels.international },
  ];

  const visible = items
    .filter((item) => filter === "all" || item.region === filter)
    .slice(0, LIMIT);

  return (
    <div className="mt-10">
      <div role="group" aria-label={labels.group} className="flex gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const active = tab.value === filter;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "min-h-11 rounded-full px-4 text-[0.925rem] font-medium transition-colors duration-300 sm:px-5 sm:text-[0.95rem]",
                active
                  ? "bg-ink text-canvas"
                  : "bg-canvas-alt text-ink hover:bg-gold-100",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li
            key={item.key}
            className={cn(
              index >= 3 && "max-sm:hidden",
              index >= 4 && "sm:max-lg:hidden",
            )}
          >
            {item.card}
          </li>
        ))}
      </ul>

      <ButtonLink href="/paket" variant="outline" className="mt-10 sm:hidden">
        {labels.viewAll}
      </ButtonLink>
    </div>
  );
}
