import { Star } from "lucide-react";
import { useLocale } from "next-intl";
import type { Testimonial } from "@/content/testimonials";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Kartu testimoni dengan interaksi murni CSS — tidak menambah JavaScript
 * apa pun ke bundel, dan seluruhnya berhenti saat `prefers-reduced-motion`
 * menyala (aturan globalnya ada di `globals.css`).
 *
 * Empat lapis interaksinya: kartu terangkat, garis tepi menjadi emas, tanda
 * kutip raksasa memudar masuk, dan bintang menyala berurutan dari kiri.
 */
export function TestimonialCard({
  testimonial,
  tone = "light",
}: {
  testimonial: Testimonial;
  tone?: "light" | "dark";
}) {
  const locale = useLocale() as AppLocale;
  const isDark = tone === "dark";

  return (
    /*
     * `tabIndex` membuat kartunya bisa disinggahi Tab. Tanpa itu, seluruh efek
     * di bawah — termasuk terbukanya kutipan yang terpotong — hanya bisa
     * dicapai dengan kursor.
     */
    <figure
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border p-8",
        "transition-[transform,border-color,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1.5 focus:-translate-y-1.5",
        isDark
          ? "border-white/15 bg-white/[0.04] hover:border-gold-400/70 focus:border-gold-400/70"
          : "border-line bg-white hover:border-gold-500 focus:border-gold-500 hover:shadow-[0_24px_60px_-40px_rgba(15,15,15,0.5)]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-8 right-4 font-display text-[9rem] leading-none",
          "opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus:opacity-100",
          isDark ? "text-gold-400/15" : "text-gold-500/15",
        )}
      >
        &rdquo;
      </span>

      <div
        className="relative flex gap-1"
        role="img"
        aria-label={`${testimonial.rating}/5`}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const earned = index < testimonial.rating;

          return (
            <Star
              key={index}
              aria-hidden="true"
              // Jeda bertingkat membuat bintangnya menyala satu per satu
              // dari kiri ke kanan, bukan serentak.
              style={{ transitionDelay: `${index * 70}ms` }}
              className={cn(
                "size-3.5 transition-colors duration-500",
                earned
                  ? isDark
                    ? "fill-white/35 text-white/35 group-hover:fill-gold-400 group-hover:text-gold-400 group-focus:fill-gold-400 group-focus:text-gold-400"
                    : "fill-ink/20 text-ink/20 group-hover:fill-gold-500 group-hover:text-gold-500 group-focus:fill-gold-500 group-focus:text-gold-500"
                  : isDark
                    ? "text-white/10"
                    : "text-ink/10",
              )}
            />
          );
        })}
      </div>

      {/*
        Kutipan panjang dipangkas di ~4 baris supaya tinggi kartu di satu baris
        grid tetap seragam. Batasnya dilepas saat kartu disinggahi kursor atau
        Tab; `max-height` dipakai (bukan `line-clamp`) karena hanya nilai
        numerik yang bisa dianimasikan.
      */}
      <blockquote
        className={cn(
          "relative mt-6 flex-1 overflow-hidden text-[0.98rem] leading-[1.8]",
          "max-h-[7.1rem] transition-[max-height] duration-500 ease-out",
          "group-hover:max-h-[32rem] group-focus:max-h-[32rem]",
          isDark ? "text-white/75" : "text-ink-soft",
        )}
      >
        {testimonial.quote[locale]}
      </blockquote>

      <figcaption className="relative mt-8">
        <span
          aria-hidden="true"
          className={cn(
            "mb-5 block h-px w-10 origin-left transition-transform duration-500 ease-out group-hover:scale-x-[3.2] group-focus:scale-x-[3.2]",
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
