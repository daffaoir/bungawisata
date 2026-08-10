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
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.id} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg transition-colors group-open:text-gold-600 hover:text-gold-600 [&::-webkit-details-marker]:hidden">
            <span className="font-display">{item.question[locale]}</span>
            <Plus
              className="mt-1 size-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
              strokeWidth={1.5}
            />
          </summary>
          <div className="pb-7 leading-[1.8] text-ink-soft">
            {item.answer[locale]}
          </div>
        </details>
      ))}
    </div>
  );
}
