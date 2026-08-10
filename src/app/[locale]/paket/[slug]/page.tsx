import { ArrowLeft, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { InclusionList } from "@/components/package/InclusionList";
import { ItineraryTimeline } from "@/components/package/ItineraryTimeline";
import { PackageCard } from "@/components/package/PackageCard";
import { PackageGallery } from "@/components/package/PackageGallery";
import { PriceBox, StickyPriceBar } from "@/components/package/PriceBox";
import { Badge } from "@/components/shared/Badge";
import { Section, SectionHeading } from "@/components/shared/Section";
import { SITE_URL } from "@/content/site";
import { getPathname, Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";
import { getAllPackages, getPackageBySlug, getRelatedPackages } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPackages().map((pkg) => ({ locale, slug: pkg.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/paket/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) return {};

  const content = pkg.content[locale as AppLocale];

  return {
    title: content.title,
    description: content.summary,
    alternates: buildAlternates(
      { pathname: "/paket/[slug]", params: { slug } },
      locale as AppLocale,
    ),
    openGraph: {
      title: content.title,
      description: content.summary,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: PageProps<"/[locale]/paket/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const appLocale = locale as AppLocale;
  const content = pkg.content[appLocale];
  const t = await getTranslations({ locale, namespace: "PackageDetail" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const related = getRelatedPackages(pkg);
  const isDomestic = pkg.region === "dalam-negeri";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: content.title,
    description: content.summary,
    image: pkg.heroImage,
    touristType: pkg.tags,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: content.itinerary.length,
      itemListElement: content.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        name: day.title,
      })),
    },
    offers: {
      "@type": "Offer",
      price: pkg.priceFrom,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${getPathname({
        href: { pathname: "/paket/[slug]", params: { slug: pkg.slug } },
        locale: appLocale,
      })}`,
    },
    provider: {
      "@type": "TravelAgency",
      name: "Bunga Wisata",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Sumbernya data paket kita sendiri, tapi `<` tetap di-escape agar
          // teks apa pun di dalamnya mustahil menutup tag <script> ini.
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative">
        <div className="relative h-[52vh] min-h-[22rem] w-full overflow-hidden">
          <Image
            src={pkg.heroImage}
            alt={content.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8 sm:pb-14">
            <Link
              href="/paket"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {tCommon("backToPackages")}
            </Link>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone={isDomestic ? "gold" : "light"}>
                {isDomestic ? tCommon("domestic") : tCommon("international")}
              </Badge>
              <Badge tone="light">{pkg.destination}</Badge>
              <Badge tone="light">
                {tCommon("duration", {
                  days: pkg.durationDays,
                  nights: pkg.durationNights,
                })}
              </Badge>
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
              {content.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 pb-28 sm:px-8 sm:py-16 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <p className="text-lg leading-relaxed text-ink-soft">
              {content.summary}
            </p>

            <Reveal className="mt-14">
              <h2 className="flex items-center gap-2.5 text-2xl">
                <Sparkles
                  className="size-6 text-gold-600"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                {t("highlights")}
              </h2>
              <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
                {content.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="bg-gold-50 p-5 text-[0.95rem] leading-[1.75]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-14">
              <h2 className="text-2xl">{t("itinerary")}</h2>
              <p className="mt-2 mb-8 text-ink-soft">{t("itinerarySubtitle")}</p>
              <ItineraryTimeline days={content.itinerary} />
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              <InclusionList
                title={t("includes")}
                items={content.includes}
                variant="include"
              />
              <InclusionList
                title={t("excludes")}
                items={content.excludes}
                variant="exclude"
              />
            </div>

            <div className="mt-14">
              <h2 className="text-2xl">{t("hotelsTitle")}</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {pkg.hotels.map((hotel) => (
                  <li
                    key={`${hotel.city}-${hotel.name}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <span>
                      <span className="font-medium">{hotel.name}</span>
                      {hotel.stars ? (
                        <span className="ms-2 text-xs text-gold-600">
                          {"★".repeat(hotel.stars)}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-sm text-ink-muted">
                      {hotel.city} · {t("hotelNights", { count: hotel.nights })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {content.notes ? (
              <div className="mt-8 border-s-2 border-gold-500 bg-gold-50 p-7">
                <h3 className="text-base">{t("notes")}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-soft">
                  {content.notes}
                </p>
              </div>
            ) : null}

            {pkg.gallery.length > 0 ? (
              <Reveal className="mt-14">
                <h2 className="mb-6 text-2xl">{t("gallery")}</h2>
                <PackageGallery images={pkg.gallery} alt={content.title} />
              </Reveal>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28">
            <PriceBox pkg={pkg} />
          </aside>
        </div>
      </div>

      {related.length > 0 ? (
        <Section tone="white" compact>
          <SectionHeading title={t("relatedTitle")} />
          <StaggerGroup className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <PackageCard pkg={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>
      ) : null}

      <StickyPriceBar pkg={pkg} />
    </>
  );
}
