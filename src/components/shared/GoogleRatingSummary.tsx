import { ArrowUpRight, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GOOGLE_REVIEWS_URL, site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const INTL_LOCALE: Record<AppLocale, string> = { id: "id-ID", en: "en-US" };

/**
 * Ringkasan rating publik di Google + tautan ke semua ulasan. Sengaja tanpa
 * schema `AggregateRating`: ulasan tentang bisnis sendiri tidak memenuhi
 * syarat rich result Google.
 */
export function GoogleRatingSummary({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations("Testimonials");
  const locale = useLocale() as AppLocale;
  const isDark = tone === "dark";
  const rating = new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(site.proof.googleRating);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6",
        className,
      )}
    >
      <p className="flex items-center gap-2.5">
        <Star
          aria-hidden="true"
          className={cn(
            "size-5",
            isDark
              ? "fill-gold-400 text-gold-400"
              : "fill-gold-600 text-gold-600",
          )}
        />
        <span
          className={cn(
            "font-display text-2xl",
            isDark ? "text-white" : "text-ink",
          )}
        >
          {rating}
        </span>
        <span
          className={cn("text-sm", isDark ? "text-white/70" : "text-ink-soft")}
        >
          {t("ratingSummary", { count: site.proof.googleReviewCount })}
        </span>
      </p>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "-my-3 inline-flex min-h-11 items-center gap-2 py-3 text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors",
          isDark
            ? "text-gold-400 hover:text-white"
            : "text-gold-700 hover:text-ink",
        )}
      >
        {t("viewOnGoogle")}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
