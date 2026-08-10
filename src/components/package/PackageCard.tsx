import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import type { Package } from "@/lib/schema";

export function PackageCard({ pkg }: { pkg: Package }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Common");
  const content = pkg.content[locale];
  const isDomestic = pkg.region === "dalam-negeri";

  return (
    <article className="group relative flex h-full flex-col border border-line bg-white transition-colors duration-500 hover:border-ink">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.heroImage}
          alt={content.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        <span className="absolute top-0 left-0 bg-canvas px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.16em] text-ink uppercase">
          {isDomestic ? t("domestic") : t("international")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow text-gold-600">{pkg.destination}</p>

        <h3 className="mt-3 text-[1.35rem] leading-snug">
          <Link
            href={{ pathname: "/paket/[slug]", params: { slug: pkg.slug } }}
            // Menutupi seluruh kartu agar area kliknya luas.
            className="after:absolute after:inset-0 after:content-['']"
          >
            {content.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-[1.75] text-ink-soft">
          {content.summary}
        </p>

        <p className="mt-5 text-xs tracking-[0.08em] text-ink-muted uppercase">
          {t("duration", {
            days: pkg.durationDays,
            nights: pkg.durationNights,
          })}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-6">
          <div>
            <p className="text-[0.65rem] tracking-[0.12em] text-ink-muted uppercase">
              {t("startingFrom")}
            </p>
            <p className="mt-1 font-display text-xl text-ink">
              {formatPrice(pkg.priceFrom, locale)}
              <span className="ms-1 font-sans text-[0.65rem] tracking-wide text-ink-muted">
                {t("perPerson")}
              </span>
            </p>
          </div>

          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.25}
            className="size-6 shrink-0 text-ink-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-600"
          />
        </div>
      </div>
    </article>
  );
}
