import { Plus } from "lucide-react";
import { useLocale } from "next-intl";
import type { FaqItem } from "@/content/faq";
import type { AppLocale } from "@/i18n/routing";

/**
 * Memakai <details>/<summary> bawaan browser: bisa dibuka dengan keyboard,
 * terbaca screen reader, dan tetap berfungsi tanpa JavaScript.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const locale = useLocale() as AppLocale;

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <details
          key={item.id}
          className="group rounded-3xl bg-canvas-alt transition-colors duration-300 open:bg-gold-50"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[1.15rem] sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display">{item.question[locale]}</span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-canvas transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-4" aria-hidden="true" strokeWidth={1.75} />
            </span>
          </summary>
          <div className="px-5 pb-6 leading-[1.75] text-ink-soft sm:px-7">
            {item.answer[locale]}
          </div>
        </details>
      ))}
    </div>
  );
}
