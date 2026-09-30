import { MapPin, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { images } from "@/content/images";
import { GOOGLE_REVIEWS_URL, site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { HeroSlideshow } from "./HeroSlideshow";

const INTL_LOCALE: Record<AppLocale, string> = { id: "id-ID", en: "en-US" };

/**
 * Foto besar yang membingkai layar pertama, sedikit masuk dari tepi layar dan
 * membulat. Fotonya berganti antar destinasi (lihat `HeroSlideshow`); teks
 * langsung tampil tanpa animasi, jadi LCP tidak tertahan.
 */
export function Hero() {
  const t = useTranslations("Home.hero");
  const locale = useLocale() as AppLocale;

  const rating = new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(site.proof.googleRating);

  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-3">
      <div className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-daun-900 sm:min-h-[40rem] sm:justify-end sm:rounded-[2.5rem] lg:min-h-[min(calc(100svh-7rem),48rem)]">
        {/*
          Ponsel: foto berdiri sendiri di atas kartu (titik fokus kawah Bromo)
          dan teks di bawahnya, supaya gunungnya tidak tertutup judul.
          Mulai `sm`: foto mengisi seluruh kartu dengan teks di atasnya.
        */}
        <div className="relative h-[38svh] min-h-[15rem] shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:-z-10 sm:h-auto sm:min-h-0">
          <HeroSlideshow
            chooseLabel={t.raw("slides.choose") as string}
            slides={[
              {
                src: images["bromo-kaldera"],
                place: t("slides.bromo"),
                mobilePosition: "object-[38%_58%]",
              },
              { src: images["komodo-padar"], place: t("slides.padar") },
              {
                src: images["raja-ampat-gugusan"],
                place: t("slides.rajaAmpat"),
              },
              {
                src: images["turki-cappadocia"],
                place: t("slides.cappadocia"),
              },
              { src: images["jepang-chureito"], place: t("slides.fuji") },
            ]}
          />
          {/*
            Ponsel: foto memudar ke hijau di bagian bawah, menyambung ke blok
            teks. `sm`+: gradien dari bawah-kiri untuk kontras teks di atas foto.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-daun-900 via-daun-900/0 via-30% to-transparent sm:bg-gradient-to-tr sm:from-daun-900/85 sm:via-daun-900/30 sm:via-50% sm:to-transparent sm:to-100%" />
        </div>

        <p className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-daun-900/60 px-3.5 py-1.5 text-[0.85rem] text-canvas backdrop-blur-md sm:top-7 sm:left-8">
          <MapPin className="size-4" aria-hidden="true" />
          {t("departure")}
        </p>

        <div className="relative mx-auto mt-2 w-full max-w-6xl px-5 pb-8 sm:mt-0 sm:px-8 sm:pb-14">
          <h1 className="max-w-[15ch] text-[2.5rem] leading-[1.02] text-canvas sm:text-[4rem] lg:text-[5.25rem]">
            {t("title")}
          </h1>

          <p className="mt-4 max-w-xl text-[0.975rem] leading-[1.65] text-canvas/85 sm:mt-5 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WhatsAppCta
              intent="custom"
              label={t("primaryCta")}
              size="lg"
              className="w-full sm:w-auto"
            />
            <ButtonLink
              href="/paket"
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("secondaryCta")}
            </ButtonLink>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 self-start rounded-full text-[0.9rem] text-canvas/85 transition-colors hover:text-canvas sm:mt-0 sm:ms-3 sm:self-center"
            >
              <Star
                className="size-4 fill-gold-400 text-gold-400"
                aria-hidden="true"
              />
              {t("rating", { rating, count: site.proof.googleReviewCount })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
