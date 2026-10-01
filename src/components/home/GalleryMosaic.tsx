import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { Lightbox, LightboxTrigger } from "@/components/shared/Lightbox";
import { Section, SectionHeading } from "@/components/shared/Section";
import { gallery } from "@/content/gallery";
import { images } from "@/content/images";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Foto mosaik, urut: besar dulu, lalu empat kotak kecil. */
const MOSAIC = [
  images["turki-cappadocia"],
  images["komodo-padar"],
  images["jepang-fushimi-inari"],
  images["raja-ampat-piaynemo"],
  images["bromo-lanskap"],
];

/**
 * Mosaik foto destinasi di dalam kolom konten: satu foto besar (2 × 2) dan
 * empat foto kecil. Keterangan menempel di bawah foto. Galeri lengkap ada di
 * /galeri.
 */
export function GalleryMosaic() {
  const t = useTranslations("Home.gallery");
  const locale = useLocale() as AppLocale;
  const items = MOSAIC.map((src) =>
    gallery.find((item) => item.src === src),
  ).filter((item) => item !== undefined);

  return (
    <Section tone="canvas">
      <SectionHeading
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <ButtonLink href="/galeri" variant="outline">
            {t("viewAll")}
          </ButtonLink>
        }
      />

      <Lightbox
        items={items.map((item) => ({
          src: item.src,
          alt: item.caption[locale],
          caption: item.caption[locale],
        }))}
      >
        <ul className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => {
            const big = index === 0;
            return (
              <li
                key={item.src}
                className={cn(
                  "relative overflow-hidden rounded-3xl bg-canvas-alt",
                  big && "col-span-2 row-span-2",
                )}
              >
                <figure className="group h-full">
                  <Image
                    src={item.src}
                    alt={item.caption[locale]}
                    fill
                    quality={85}
                    sizes={
                      big
                        ? "(min-width: 1280px) 38rem, (min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1280px) 19rem, (min-width: 1024px) 25vw, 50vw"
                    }
                    className="object-cover transition-transform duration-[900ms] ease-out-soft [@media(hover:hover)]:group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-daun-900/75 to-transparent"
                  />
                  <figcaption
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-3 leading-snug text-canvas sm:p-4",
                      big
                        ? "text-[1rem] sm:text-[1.1rem]"
                        : "text-[0.85rem] sm:text-[0.925rem]",
                    )}
                  >
                    {item.caption[locale]}
                  </figcaption>
                  <LightboxTrigger index={index} />
                </figure>
              </li>
            );
          })}
        </ul>
      </Lightbox>
    </Section>
  );
}
