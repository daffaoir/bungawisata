import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ButtonLink } from "@/components/shared/Button";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { images } from "@/content/images";
import { site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";

const INTL_LOCALE: Record<AppLocale, string> = { id: "id-ID", en: "en-US" };

/**
 * Dua foto saja, bukan kolase lima kotak. Foto besar menahan pandangan,
 * foto kecil yang menimpanya memberi kedalaman tanpa perlu bayangan tebal.
 */
export function Hero() {
  const t = useTranslations("Home.hero");
  const locale = useLocale() as AppLocale;

  const stats = [
    { value: site.stats.travelers, label: t("stats.travelers") },
    { value: site.stats.destinations, label: t("stats.destinations") },
    { value: site.stats.years, label: t("stats.years") },
  ];

  return (
    <section className="relative overflow-hidden bg-canvas pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow rule-gold text-gold-600">{t("eyebrow")}</p>

          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem]">
            {t("titleLine1")}{" "}
            <em className="font-normal text-gold-600 italic">
              {t("titleHighlight")}
            </em>{" "}
            {t("titleLine2")}
          </h1>

          <p className="mt-7 max-w-lg text-[1.05rem] leading-[1.85] text-ink-soft">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/paket" size="lg">
              {t("primaryCta")}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
            <WhatsAppCta
              intent="custom"
              label={t("secondaryCta")}
              variant="outline"
              size="lg"
            />
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-8 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-[2rem] text-ink sm:text-4xl">
                    <AnimatedCounter
                      value={stat.value}
                      locale={INTL_LOCALE[locale]}
                      suffix="+"
                    />
                  </span>
                  <span className="mt-2 block text-[0.68rem] tracking-[0.14em] text-ink-muted uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images["komodo-padar"]}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 0px"
              className="object-cover motion-safe:animate-drift"
            />
          </div>

          {/*
            Foto kedua sengaja keluar dari kolom ke arah kiri-bawah supaya
            komposisinya tidak berhenti rapi di garis grid.
          */}
          <div className="absolute -bottom-10 -left-14 aspect-square w-44 overflow-hidden border-8 border-canvas xl:w-52">
            <Image
              src={images["bali-terasering"]}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 13rem, 0px"
              className="object-cover"
            />
          </div>

          <span
            aria-hidden="true"
            className="absolute -top-6 -right-6 h-24 w-px bg-gold-500"
          />
        </div>
      </div>
    </section>
  );
}
