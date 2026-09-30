import Image from "next/image";
import { useLocale } from "next-intl";
import { images } from "@/content/images";
import { site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { WhatsAppCta } from "./WhatsAppCta";

type ClosingCtaProps = {
  title: string;
  subtitle: string;
  /** Label tombol. Default mengikuti `WhatsAppCta`. */
  buttonLabel?: string;
  intent?: "generic" | "custom";
};

/**
 * Ajakan penutup sebelum footer: panel kunyit pucat yang membulat dengan foto
 * suasana di sisi kanan. Warnanya sengaja terang supaya tidak menyatu dengan
 * footer hijau daun di bawahnya.
 */
export function ClosingCta({
  title,
  subtitle,
  buttonLabel,
  intent = "generic",
}: ClosingCtaProps) {
  const locale = useLocale() as AppLocale;
  const hours = site.hours[0];

  return (
    <section className="px-2 pt-4 pb-2 sm:px-4 sm:pt-6 sm:pb-4">
      <div className="grid overflow-hidden rounded-[2rem] bg-gold-50 text-ink sm:rounded-[2.5rem] lg:grid-cols-[1.2fr_1fr]">
        <div className="px-6 py-12 sm:px-12 sm:py-16 lg:py-20 lg:ps-[max(3rem,calc((100vw-72rem)/2+2rem))]">
          <h2 className="max-w-xl text-[2.1rem] sm:text-[2.75rem]">{title}</h2>
          <p className="mt-4 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft">
            {subtitle}
          </p>
          <WhatsAppCta
            intent={intent}
            label={buttonLabel}
            size="lg"
            className="mt-8 w-full sm:w-auto"
          />
          <p className="mt-4 text-[0.925rem] leading-[1.6] text-ink-soft">
            {site.phoneDisplay}, {hours.days[locale]} {hours.time}
          </p>
        </div>

        <div className="reveal-photo relative hidden min-h-[22rem] lg:block">
          <Image
            src={images["suasana-pantai-keluarga"]}
            alt=""
            aria-hidden="true"
            fill
            quality={85}
            sizes="40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
