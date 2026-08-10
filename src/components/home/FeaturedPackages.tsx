import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PackageCard } from "@/components/package/PackageCard";
import { ButtonLink } from "@/components/shared/Button";
import { Section, SectionHeading } from "@/components/shared/Section";
import { getFeaturedPackages } from "@/lib/packages";

export function FeaturedPackages() {
  const t = useTranslations("Home.featured");
  const tCommon = useTranslations("Common");
  const packages = getFeaturedPackages(3);

  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <ButtonLink href="/paket" variant="outline">
            {tCommon("viewAllPackages")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        }
      />

      <StaggerGroup className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <StaggerItem key={pkg.slug} className="h-full">
            <PackageCard pkg={pkg} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
