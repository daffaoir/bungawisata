import { useLocale } from "next-intl";
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
 * Ajakan penutup sebelum footer.
 *
 * Latarnya sengaja terang (gold-50) — bukan ink — supaya tidak menyatu dengan
 * footer yang hitam dan section gelap di atasnya menjadi satu massa gelap
 * tempat CTA-nya tenggelam.
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
    <section className="border-t border-gold-200 bg-gold-50 text-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="text-[2rem] sm:text-[2.4rem]">{title}</h2>
          <p className="mt-5 max-w-xl leading-[1.85] text-ink-soft">
            {subtitle}
          </p>
        </div>

        <div>
          <WhatsAppCta
            intent={intent}
            label={buttonLabel}
            size="lg"
            className="w-full sm:w-auto"
          />
          <p className="mt-4 text-sm leading-[1.7] text-ink-soft">
            {site.phoneDisplay}
            <span aria-hidden="true"> · </span>
            <span className="whitespace-nowrap">
              {hours.days[locale]} {hours.time}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
