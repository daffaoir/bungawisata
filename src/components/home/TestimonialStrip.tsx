import { useTranslations } from "next-intl";
import { GoogleRatingSummary } from "@/components/shared/GoogleRatingSummary";
import { Section, SectionHeading } from "@/components/shared/Section";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { testimonials } from "@/content/testimonials";
import { Link } from "@/i18n/navigation";

/**
 * Ulasan Google + ajakan penutup dalam satu panel: setelah membaca kata
 * pelanggan, langkah berikutnya langsung ada di bawahnya.
 */
export function TestimonialStrip() {
  const t = useTranslations("Home.testimonials");
  const tCta = useTranslations("Home.cta");

  return (
    <Section tone="alt" inset>
      <SectionHeading title={t("title")} align="center" />
      <GoogleRatingSummary className="mt-6" />

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {testimonials.slice(0, 3).map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link
          href="/testimoni"
          className="inline-flex min-h-11 items-center text-[0.95rem] font-semibold text-gold-700 underline decoration-gold-700/40 decoration-1 underline-offset-4 transition-colors hover:text-ink"
        >
          {t("viewAll")}
        </Link>
      </p>

      <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
        <h2 className="text-[2.1rem] sm:text-[2.75rem]">{tCta("title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft">
          {tCta("subtitle")}
        </p>
        <WhatsAppCta
          intent="custom"
          label={tCta("button")}
          size="lg"
          className="mt-8 w-full sm:w-auto"
        />
      </div>
    </Section>
  );
}
