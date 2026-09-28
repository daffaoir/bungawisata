import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { GalleryCarousel } from "@/components/home/GalleryCarousel";
import { Hero } from "@/components/home/Hero";
import { RegionSplit } from "@/components/home/RegionSplit";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { ClosingCta } from "@/components/shared/ClosingCta";
import type { AppLocale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

export async function generateMetadata(
  { params }: PageProps<"/[locale]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    alternates: buildAlternates("/", locale as AppLocale),
    openGraph: await buildOpenGraph("/", locale as AppLocale, {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      parent,
    }),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tCta = await getTranslations({ locale, namespace: "Home.cta" });

  return (
    <>
      <Hero />
      <RegionSplit />
      <FeaturedPackages />
      <WhyUs />
      <GalleryCarousel />
      <TestimonialStrip />
      <ClosingCta
        title={tCta("title")}
        subtitle={tCta("subtitle")}
        buttonLabel={tCta("button")}
        intent="custom"
      />
    </>
  );
}
