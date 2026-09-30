import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { ScrollStrip } from "@/components/shared/ScrollStrip";
import { Section, SectionHeading } from "@/components/shared/Section";
import { gallery } from "@/content/gallery";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Strip foto destinasi. Tingginya sama, lebarnya ikut rasio foto (lebar untuk
 * foto `span: 2`, tegak untuk sisanya) supaya deretannya tidak terasa seperti
 * kotak-kotak seragam.
 */
export function GalleryCarousel() {
  const t = useTranslations("Home.gallery");
  const locale = useLocale() as AppLocale;

  return (
    <Section tone="canvas">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <ScrollStrip
        className="mt-10"
        fadeEdge
        label={t("title")}
        previousLabel={t("previous")}
        nextLabel={t("next")}
        footer={
          <ButtonLink href="/galeri" variant="outline">
            {t("viewAll")}
          </ButtonLink>
        }
      >
        {gallery.map((item) => {
          const wide = item.span === 2;
          return (
            <figure key={item.src}>
              <div
                className={cn(
                  "relative h-[22rem] overflow-hidden rounded-3xl bg-canvas-alt sm:h-[26rem]",
                  wide ? "aspect-[4/3] max-w-[88vw]" : "aspect-[4/5] max-w-[72vw]",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.caption[locale]}
                  fill
                  quality={85}
                  sizes={wide ? "(min-width: 640px) 35rem, 88vw" : "(min-width: 640px) 21rem, 72vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-[18rem] px-1 text-[0.925rem] leading-snug text-ink-soft">
                {item.caption[locale]}
              </figcaption>
            </figure>
          );
        })}
      </ScrollStrip>
    </Section>
  );
}
