import { ArrowLeft } from "lucide-react";
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
import {
  PackageFacts,
  PriceBox,
  StickyPriceBar,
} from "@/components/package/PriceBox";
import { Badge } from "@/components/shared/Badge";
import { Section, SectionHeading } from "@/components/shared/Section";
import { SITE_URL } from "@/content/site";
import { packageMetaTitle } from "@/lib/seo";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/jsonld";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  absoluteUrl,
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import {
  getAllPackages,
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/packages";

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
  const title = packageMetaTitle(pkg, locale as AppLocale);

  return {
    title,
    description: content.summary,
    alternates: buildAlternates(
      { pathname: "/paket/[slug]", params: { slug } },
      locale as AppLocale,
    ),
    openGraph: await buildOpenGraph(
      { pathname: "/paket/[slug]", params: { slug } },
      locale as AppLocale,
      {
        title,
        description: content.summary,
        images: [{ url: pkg.heroImage, alt: content.title }],
      },
    ),
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

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const url = absoluteUrl(
    { pathname: "/paket/[slug]", params: { slug: pkg.slug } },
    appLocale,
  );

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    url,
    name: content.title,
    description: content.summary,
    image: new URL(pkg.heroImage, SITE_URL).href,
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
      url,
    },
    provider: { "@id": ORGANIZATION_ID },
  };

  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(appLocale, tNav("home"), [
      { name: tNav("packages"), href: "/paket" },
      {
        name: content.title,
        href: { pathname: "/paket/[slug]", params: { slug: pkg.slug } },
      },
    ]),
  );

  return (
    <>
      <JsonLd data={[tripJsonLd, breadcrumb]} />

      <header className="px-2 pt-2 sm:px-4 sm:pt-3">
        <div className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-daun-900 sm:min-h-[32rem] sm:rounded-[2.5rem] lg:h-[62svh]">
          <Image
            src={pkg.heroImage}
            alt={content.title}
            fill
            priority
            quality={85}
            sizes="(min-width: 640px) calc(100vw - 2rem), calc(100vw - 1rem)"
            className="hero-settle -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-daun-900/90 via-daun-900/40 to-daun-900/10" />

          <div className="mx-auto w-full max-w-6xl px-5 pb-9 sm:px-8 sm:pb-12">
            <Link
              href="/paket"
              className="-my-3 inline-flex min-h-11 items-center gap-2 py-3 text-[0.95rem] font-medium text-canvas/85 transition-colors hover:text-canvas"
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

            <h1 className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] text-canvas sm:text-[3.75rem]">
              {content.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 pb-28 sm:px-8 sm:py-16 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <p className="text-[1.15rem] leading-[1.7] text-ink-soft">
              {content.summary}
            </p>

            <PackageFacts pkg={pkg} className="mt-8" />

            <Reveal className="mt-14">
              <h2 className="text-[2rem]">{t("highlights")}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {content.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-3xl bg-gold-50 p-5 text-[0.975rem] leading-[1.65]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-14">
              <h2 className="text-[2rem]">{t("itinerary")}</h2>
              <p className="mt-2 mb-8 text-ink-soft">
                {t("itinerarySubtitle")}
              </p>
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
              <h2 className="text-[2rem]">{t("hotelsTitle")}</h2>
              <ul className="mt-6 flex flex-col gap-2">
                {pkg.hotels.map((hotel) => (
                  <li
                    key={`${hotel.city}-${hotel.name}`}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-2xl bg-canvas-alt px-5 py-4"
                  >
                    <span>
                      <span className="font-medium">{hotel.name}</span>
                      {hotel.stars ? (
                        <span className="ms-2 text-[0.8rem] text-gold-600">
                          {"★".repeat(hotel.stars)}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[0.9rem] text-ink-muted">
                      {hotel.city}, {t("hotelNights", { count: hotel.nights })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {content.notes ? (
              <div className="mt-8 rounded-3xl bg-gold-50 p-6 sm:p-7">
                <h3 className="text-[1.25rem]">{t("notes")}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-soft">
                  {content.notes}
                </p>
              </div>
            ) : null}

            {pkg.gallery.length > 0 ? (
              <Reveal className="mt-14">
                <h2 className="mb-6 text-[2rem]">{t("gallery")}</h2>
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
        <Section tone="alt" inset compact className="mb-2 sm:mb-4">
          <SectionHeading title={t("relatedTitle")} />
          <StaggerGroup className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <PackageCard pkg={item} shape="adaptive" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>
      ) : null}

      <StickyPriceBar pkg={pkg} />
    </>
  );
}
