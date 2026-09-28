import { Star } from "lucide-react";
import { useLocale } from "next-intl";
import type { Testimonial } from "@/content/testimonials";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type TestimonialCardProps = {
  testimonial: Testimonial;
  /** Hanya untuk varian `card`: latar terang atau gelap (section ink). */
  tone?: "light" | "dark";
  /**
   * `card` — kotak bergaris (strip testimoni di beranda).
   * `quote` — kutipan tanpa kotak, dipisah garis rambut (halaman Testimoni).
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
                  ? "fill-white/20 text-white/20"
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

  if (variant === "quote") {
    return (
      <figure className="flex h-full flex-col border-t border-line pt-8">
        <Stars rating={testimonial.rating} isDark={false} />

        <blockquote className="mt-5 flex-1 font-display text-[1.3rem] leading-[1.6] text-ink">
          {testimonial.quote[locale]}
        </blockquote>

        <figcaption className="mt-6 text-[0.85rem]">
          <span className="block font-semibold text-ink">
            {testimonial.name}
          </span>
          <span className="mt-1 block text-ink-muted">
            {testimonial.from} &middot; {testimonial.trip[locale]}
          </span>
        </figcaption>
      </figure>
    );
  }

  const isDark = tone === "dark";

  return (
    <figure
      className={cn(
        "flex h-full flex-col border p-8",
        isDark ? "border-white/15 bg-white/[0.04]" : "border-line bg-white",
      )}
    >
      <Stars rating={testimonial.rating} isDark={isDark} />

      <blockquote
        className={cn(
          "mt-6 flex-1 text-[0.98rem] leading-[1.8]",
          isDark ? "text-white/75" : "text-ink-soft",
        )}
      >
        {testimonial.quote[locale]}
      </blockquote>

      <figcaption className="mt-8">
        <span
          aria-hidden="true"
          className={cn(
            "mb-5 block h-px w-10",
            isDark ? "bg-white/25" : "bg-line",
          )}
        />
        <span
          className={cn(
            "block text-sm font-semibold",
            isDark ? "text-white" : "text-ink",
          )}
        >
          {testimonial.name}
        </span>
        <span
          className={cn(
            "mt-1 block text-xs",
            isDark ? "text-white/50" : "text-ink-muted",
          )}
        >
          {testimonial.from} &middot; {testimonial.trip[locale]}
        </span>
      </figcaption>
    </figure>
  );
}
