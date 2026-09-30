"use client";

import { useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/shared/Button";
import { ScrollStrip } from "@/components/shared/ScrollStrip";
import { cn } from "@/lib/cn";
import type { Region } from "@/lib/schema";

type Filter = "all" | Region;

type PackagesShowcaseStripProps = {
  labels: {
    strip: string;
    all: string;
    domestic: string;
    international: string;
    previous: string;
    next: string;
    viewAll: string;
  };
  items: Array<{ key: string; region: Region; card: ReactNode }>;
};

export function PackagesShowcaseStrip({ labels, items }: PackagesShowcaseStripProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const tabs: Array<{ value: Filter; label: string }> = [
    { value: "all", label: labels.all },
    { value: "dalam-negeri", label: labels.domestic },
    { value: "luar-negeri", label: labels.international },
  ];

  const visible = items.filter((item) => filter === "all" || item.region === filter);

  return (
    <div className="mt-10">
      <div role="group" aria-label={labels.strip} className="flex gap-1.5 sm:gap-2">
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

      {/* `key` mengulang strip dari awal setiap kali tab berganti. */}
      <ScrollStrip
        key={filter}
        className="mt-8"
        label={labels.strip}
        previousLabel={labels.previous}
        nextLabel={labels.next}
        // Ponsel: satu kartu + intipan berikutnya. `sm`: tepat dua kartu,
        // `lg`: tepat tiga kartu utuh (lebar dikurangi jarak antarkartu).
        itemClassName="w-[85%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
        footer={
          <ButtonLink href="/paket" variant="outline" className="sm:hidden">
            {labels.viewAll}
          </ButtonLink>
        }
      >
        {visible.map((item) => (
          <div key={item.key} className="h-full">
            {item.card}
          </div>
        ))}
      </ScrollStrip>
    </div>
  );
}
