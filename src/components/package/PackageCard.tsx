import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { Package } from "@/lib/schema";

/**
 * Kartu paket: fotonya yang bicara. Harga menempel di foto supaya terbaca
 * sekilas, lalu judul dan ringkasan di bawahnya tanpa bingkai kotak.
 */
export function PackageCard({
  pkg,
  sizes = "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 85vw",
  className,
}: {
  pkg: Package;
  /** `sizes` untuk foto; sesuaikan kalau kartu dipakai di lebar lain. */
  sizes?: string;
  className?: string;
}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Common");
  const content = pkg.content[locale];
  const isDomestic = pkg.region === "dalam-negeri";

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-canvas-alt">
        <Image
          src={pkg.heroImage}
          alt={content.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-out-soft [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
        {/* Gradien tipis di bawah supaya chip harga tetap terbaca di foto terang. */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/45 to-transparent" />

        <span className="absolute top-4 left-4 rounded-full bg-canvas/90 px-3 py-1 text-[0.8rem] font-medium text-ink backdrop-blur-sm">
          {isDomestic ? t("domestic") : t("international")}
        </span>

        <div className="absolute bottom-4 left-4 rounded-2xl bg-canvas px-4 py-2.5 text-ink transition-transform duration-500 ease-out-soft [@media(hover:hover)]:group-hover:-translate-y-1">
          <p className="text-[0.75rem] leading-tight text-ink-muted">
            {pkg.priceIsEstimate ? t("startingFromEstimate") : t("startingFrom")}
          </p>
          <p className="font-display text-[1.2rem] leading-tight font-medium">
            {formatPrice(pkg.priceFrom, locale)}
            <span className="ms-1 font-sans text-[0.75rem] font-normal text-ink-muted">
              {t("perPerson")}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <p className="text-[0.875rem] text-ink-muted">
          {pkg.destination},{" "}
          {t("duration", { days: pkg.durationDays, nights: pkg.durationNights })}
        </p>
        <h3 className="mt-1.5 text-[1.4rem] leading-snug">
          <Link
            href={{ pathname: "/paket/[slug]", params: { slug: pkg.slug } }}
            // Menutupi seluruh kartu agar area kliknya luas.
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold-600"
          >
            {content.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] leading-[1.65] text-ink-soft">
          {content.summary}
        </p>
      </div>
    </article>
  );
}
