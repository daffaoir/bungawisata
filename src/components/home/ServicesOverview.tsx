import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/Section";
import type { AppLocale } from "@/i18n/routing";
import { getAllServices } from "@/lib/services";
import { ServicesOverviewList } from "./ServicesOverviewList";

/** Lima layanan: daftar di kanan, foto layanan yang disorot di kiri. */
export function ServicesOverview() {
  const t = useTranslations("Home.services");
  const locale = useLocale() as AppLocale;

  const items = getAllServices().map((service) => ({
    slug: service.slug,
    icon: service.icon,
    name: service.content[locale].name,
    summary: service.content[locale].summary,
    image: service.heroImage,
  }));

  return (
    <Section tone="alt" inset>
      <SectionHeading
        title={t("title")}
        subtitle={t("subtitle")}
        hideActionOnMobile
        action={
          <ButtonLink href="/layanan" variant="outline">
            {t("viewAll")}
          </ButtonLink>
        }
      />

      <ServicesOverviewList items={items} />

      <ButtonLink href="/layanan" variant="outline" className="mt-8 w-full sm:hidden">
        {t("viewAll")}
      </ButtonLink>
    </Section>
  );
}
