import { useLocale, useTranslations } from "next-intl";
import { getAllServices } from "@/lib/services";
import type { AppLocale } from "@/i18n/routing";
import { QuoteRequestForm } from "./QuoteRequestForm";
import { Section } from "./Section";

/**
 * Form "Minta penawaran" beserta kolom penjelas di kirinya: apa yang terjadi
 * setelah form dikirim. Kolom kiri menempel (sticky) di desktop supaya tidak
 * menyisakan ruang kosong di samping form yang lebih tinggi.
 */
export function QuoteSection() {
  const t = useTranslations("Services");
  const locale = useLocale() as AppLocale;
  const steps = t.raw("quoteSteps") as string[];

  return (
    <Section tone="canvas" compact>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.25rem]">
            {t("quoteTitle")}
          </h2>
          <p className="mt-4 max-w-md text-[1.075rem] leading-[1.7] text-ink-soft">
            {t("quoteSubtitle")}
          </p>

          <h3 className="mt-10 text-[1.25rem]">{t("quoteStepsTitle")}</h3>
          <ol className="mt-5 flex max-w-md flex-col gap-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 font-display text-[1rem] text-gold-700"
                >
                  {index + 1}
                </span>
                <span className="pt-1.5 leading-[1.6] text-ink-soft">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <QuoteRequestForm
          services={getAllServices().map((service) => ({
            slug: service.slug,
            name: service.content[locale].name,
          }))}
        />
      </div>
    </Section>
  );
}
