import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getAllServices } from "@/lib/services";

/** Ringkasan lima layanan di beranda, menaut ke halaman masing-masing. */
export function ServicesStrip() {
  const t = useTranslations("Home.services");
  const services = getAllServices();

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        hideActionOnMobile
        action={
          <ButtonLink href="/layanan" variant="outline">
            {t("viewAll")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        }
      />

      <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <StaggerItem key={service.slug} className="h-full">
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <ButtonLink
        href="/layanan"
        variant="outline"
        className="mt-10 w-full sm:hidden"
      >
        {t("viewAll")}
        <ArrowRight className="size-4" aria-hidden="true" />
      </ButtonLink>
    </Section>
  );
}
