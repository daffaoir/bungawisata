import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Testimonial } from "@/content/testimonials";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type TestimonialCardProps = {
  testimonial: Testimonial;
  /** Hanya untuk varian `card`: latar terang atau gelap (section ink). */
  tone?: "light" | "dark";
  /**
   * `card` — kartu membulat (strip testimoni di beranda).
   * `quote` — kutipan lebih besar untuk halaman Testimoni.
   */
  variant?: "card" | "quote";
};

function Stars({ rating, isDark }: { rating: number; isDark: boolean }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const earned = index < rating;

        return (
          <Star
            key={index}
            aria-hidden="true"
            className={cn(
              "size-3.5",
              earned
                ? isDark
                  ? "fill-gold-400 text-gold-400"
                  : "fill-gold-600 text-gold-600"
                : isDark
                  ? "fill-canvas/20 text-canvas/20"
                  : "fill-line text-line",
            )}
          />
        );
      })}
    </div>
  );
}

/**
 * Testimoni statis — tidak interaktif, jadi tidak masuk urutan Tab dan tanpa
 * efek hover. Bintang yang diraih selalu berwarna emas supaya rating 4 dan 5
 * langsung terbedakan, dan kutipan selalu tampil utuh.
 */
export function TestimonialCard({
  testimonial,
  tone = "light",
  variant = "card",
}: TestimonialCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Testimonials");
  // Kutipan asli berbahasa Indonesia; di EN diberi tanda terjemahan.
  const meta = [
    t("sourceGoogle"),
    testimonial.when[locale],
    locale === "id" ? null : t("translated"),
  ]
    .filter(Boolean)
    .join(", ");

  if (variant === "quote") {
    return (
      <figure className="flex h-full flex-col border-t border-line pt-8">
        <Stars rating={testimonial.rating} isDark={false} />

        <blockquote className="mt-5 flex-1 font-display text-[1.3rem] leading-[1.6] text-ink">
          {testimonial.quote[locale]}
        </blockquote>

        <figcaption className="mt-6 text-[0.9rem]">
          <span className="block font-semibold text-ink">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block text-ink-muted">
            {meta}
          </span>
        </figcaption>
      </figure>
    );
  }

  const isDark = tone === "dark";

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl p-7 sm:p-8",
        isDark ? "bg-canvas/10" : "bg-canvas",
      )}
    >
      <Stars rating={testimonial.rating} isDark={isDark} />

      <blockquote
        className={cn(
          "mt-5 flex-1 font-display text-[1.2rem] leading-[1.5]",
          isDark ? "text-canvas" : "text-ink",
        )}
      >
        {testimonial.quote[locale]}
      </blockquote>

      <figcaption className="mt-6">
        <span
          className={cn(
            "block text-[0.9rem] font-semibold",
            isDark ? "text-canvas" : "text-ink",
          )}
        >
          {testimonial.name}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.825rem]",
            isDark ? "text-canvas/70" : "text-ink-muted",
          )}
        >
          {meta}
        </span>
      </figcaption>
    </figure>
  );
}
