"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Wajib — dipakai sebagai `aria-label` karena tidak ada <label> terlihat. */
  label: string;
  className?: string;
};

/**
 * Listbox kustom pengganti `<select>` bawaan.
 *
 * `<select>` tidak bisa ditata di dalam panelnya — Chrome, Safari, dan Firefox
 * menggambar daftar pilihannya sendiri, jadi mustahil menyamakan dengan tema
 * situs. Komponen ini menirukan pola Listbox WAI-ARIA: tombol pemicu memegang
 * `aria-activedescendant` sementara fokus DOM tetap padanya, sehingga pembaca
 * layar mengumumkan pilihan yang sedang disorot tanpa fokus berpindah-pindah.
 *
 * Papan ketik yang didukung: ↑ ↓ Home End untuk berpindah, Enter/Spasi untuk
 * memilih, Escape untuk menutup, Tab keluar dan menutup panel.
 */
export function Select({
  value,
  onChange,
  options,
  label,
  className,
}: SelectProps) {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const selected = options[selectedIndex];

  // Klik di luar komponen menutup panel. Dipasang hanya saat panel terbuka
  // supaya tidak ada listener menganggur di halaman katalog.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Pilihan yang sedang disorot dijaga tetap terlihat saat digeser dengan panah.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function openPanel(startAt = selectedIndex) {
    setActiveIndex(startAt);
    setOpen(true);
  }

  function commit(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) return openPanel();
        setActiveIndex((current) => Math.min(current + 1, last));
        return;

      case "ArrowUp":
        event.preventDefault();
        if (!open) return openPanel();
        setActiveIndex((current) => Math.max(current - 1, 0));
        return;

      case "Home":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(0);
        return;

      case "End":
        if (!open) return;
        event.preventDefault();
        setActiveIndex(last);
        return;

      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(activeIndex);
        else openPanel();
        return;

      case "Escape":
        if (!open) return;
        event.preventDefault();
        setOpen(false);
        return;

      case "Tab":
        setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${baseId}-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openPanel())}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border bg-canvas py-3 ps-4 pe-3.5",
          "text-start text-[0.95rem] text-ink transition-colors duration-300",
          open ? "border-ink/60" : "border-ink/15 hover:border-ink/40",
        )}
      >
        <span className="truncate">{selected?.label ?? label}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            "size-4 shrink-0 text-ink-muted transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className={cn(
            "absolute inset-x-0 top-[calc(100%+0.4rem)] z-30 max-h-64 overflow-y-auto",
            "rounded-2xl border border-ink/10 bg-canvas p-1.5 shadow-[0_24px_50px_-24px_rgba(42,31,22,0.45)]",
            "motion-safe:animate-[select-open_0.18s_ease-out]",
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${baseId}-option-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                // `onPointerDown` bukan `onClick`: pointerdown mendahului
                // penutupan panel oleh listener dokumen di atas.
                onPointerDown={(event) => {
                  event.preventDefault();
                  commit(index);
                }}
                onPointerEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-[0.95rem]",
                  isActive ? "bg-canvas-alt text-ink" : "text-ink-soft",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <Check
                    className="size-3.5 shrink-0 text-gold-600"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
