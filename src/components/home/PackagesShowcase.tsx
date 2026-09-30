import { useTranslations } from "next-intl";
import { PackageCard } from "@/components/package/PackageCard";
import { ButtonLink } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/Section";
import { getFeaturedPackages } from "@/lib/packages";
import { PackagesShowcaseStrip } from "./PackagesShowcaseStrip";

/**
 * Semua paket dalam satu strip geser, paket unggulan di depan. Tab region
 * menggantikan dua kartu "Dalam/Luar Negeri" yang dulu berdiri sendiri.
 *
 * Kartunya dirender di server lalu dikirim sebagai `children` ke komponen
 * klien, jadi data itinerary lengkap tidak ikut terkirim ke browser.
 */
export function PackagesShowcase() {
  const t = useTranslations("Home.packages");
  const packages = getFeaturedPackages(Number.POSITIVE_INFINITY);

  return (
    <Section tone="canvas">
      <SectionHeading
        title={t("title")}
        subtitle={t("subtitle")}
        hideActionOnMobile
        action={
          <ButtonLink href="/paket" variant="outline">
            {t("viewAll")}
          </ButtonLink>
        }
      />

      <PackagesShowcaseStrip
        labels={{
          strip: t("title"),
          all: t("tabs.all"),
          domestic: t("tabs.domestic"),
          international: t("tabs.international"),
          previous: t("previous"),
          next: t("next"),
          viewAll: t("viewAll"),
        }}
        items={packages.map((pkg) => ({
          key: pkg.slug,
          region: pkg.region,
          card: <PackageCard pkg={pkg} />,
        }))}
      />
    </Section>
  );
}
