import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Section, SectionHeading } from "@/components/shared/Section";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { testimonials } from "@/content/testimonials";
import { Link } from "@/i18n/navigation";

export function TestimonialStrip() {
  const t = useTranslations("Home.testimonials");

  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        tone="light"
        align="center"
      />

      <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial) => (
          <StaggerItem key={testimonial.id} className="h-full">
            <TestimonialCard testimonial={testimonial} tone="dark" />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-12 text-center">
        <Link
          href="/testimoni"
          className="inline-flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.14em] text-gold-400 uppercase transition-colors hover:text-white"
        >
          {t("viewAll")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
