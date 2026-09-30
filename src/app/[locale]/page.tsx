import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryMosaic } from "@/components/home/GalleryMosaic";
import { Hero } from "@/components/home/Hero";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PackagesShowcase } from "@/components/home/PackagesShowcase";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
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

/**
 * Beranda ringkas: foto & ajakan → paket → layanan → cara pesan → galeri →
 * FAQ singkat → ulasan + ajakan penutup.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-2 pb-2 sm:gap-4 sm:pb-4">
      <Hero />
      <PackagesShowcase />
      <ServicesOverview />
      <HowItWorks />
      <GalleryMosaic />
      <HomeFaq />
      <TestimonialStrip />
    </div>
  );
}
