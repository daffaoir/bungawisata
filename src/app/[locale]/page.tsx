import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { GalleryCarousel } from "@/components/home/GalleryCarousel";
import { Hero } from "@/components/home/Hero";
import { RegionSplit } from "@/components/home/RegionSplit";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { MAPS_LINK, SITE_URL, site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: buildAlternates("/", locale as AppLocale),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    description: t("defaultDescription"),
    url: SITE_URL,
    email: site.email,
    telephone: site.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      // Nama jalan dan kawasan digabung: Google membaca `streetAddress`
      // sebagai satu baris, sedangkan alamat kantor ini butuh keduanya
      // supaya bisa ditemukan.
      streetAddress: `${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: "ID",
    },
    hasMap: MAPS_LINK,
    sameAs: Object.values(site.social),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <RegionSplit />
      <FeaturedPackages />
      <WhyUs />
      <GalleryCarousel />
      <TestimonialStrip />
      <CtaBanner />
    </>
  );
}
