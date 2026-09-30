import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackageCard } from "@/components/package/PackageCard";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { SITE_URL } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  absoluteUrl,
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import { getPackageBySlug } from "@/lib/packages";
import { getServiceBySlug } from "@/lib/services";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllGuides().map((guide) => ({ locale, slug: guide.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/panduan/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const content = guide.content[locale as AppLocale];
  const href = { pathname: "/panduan/[slug]", params: { slug } } as const;
  const openGraph = await buildOpenGraph(href, locale as AppLocale, {
    title: content.metaTitle,
    description: content.metaDescription,
    images: [{ url: guide.heroImage, alt: content.title }],
  });

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates(href, locale as AppLocale),
    openGraph: {
      ...openGraph,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuidePage({
  params,
}: PageProps<"/[locale]/panduan/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const appLocale = locale as AppLocale;
  const content = guide.content[appLocale];
  const t = await getTranslations({ locale, namespace: "Guides" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tCta = await getTranslations({ locale, namespace: "Services" });
  const href = { pathname: "/panduan/[slug]", params: { slug } } as const;
  const url = absoluteUrl(href, appLocale);

  const packages = guide.relatedPackages.flatMap((s) => {
    const pkg = getPackageBySlug(s);
    return pkg ? [pkg] : [];
  });
  const services = guide.relatedServices.flatMap((s) => {
    const service = getServiceBySlug(s);
    return service ? [service] : [];
  });

  const jsonLd = [
    articleJsonLd({
      url,
      headline: content.title,
      description: content.metaDescription,
      image: new URL(guide.heroImage, SITE_URL).href,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      inLanguage: appLocale === "id" ? "id-ID" : "en",
    }),
    breadcrumbJsonLd(
      breadcrumbItems(appLocale, tNav("home"), [
        { name: tNav("guides"), href: "/panduan" },
        { name: content.title, href },
      ]),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        <header className="bg-canvas pt-12 sm:pt-16">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
            <Link
              href="/panduan"
              className="-my-3 inline-flex min-h-11 items-center gap-2 py-3 text-[0.95rem] font-medium text-gold-700 transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("backToList")}
            </Link>
            <h1 className="mt-6 text-[2.5rem] leading-[1.06] sm:text-[3.5rem]">
              {content.title}
            </h1>
            <p className="mt-6 text-[1.1rem] leading-[1.8] text-ink-soft">
              {content.excerpt}
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              {t("published", {
                date: formatDate(guide.publishedAt, appLocale),
              })}
              {guide.updatedAt !== guide.publishedAt ? (
                <>
                  {", "}
                  {t("updated", {
                    date: formatDate(guide.updatedAt, appLocale),
                  })}
                </>
              ) : null}
            </p>
          </div>
          <div className="relative mx-auto mt-10 aspect-[16/9] w-[calc(100%-1rem)] max-w-5xl overflow-hidden rounded-[2rem] sm:w-[calc(100%-4rem)]">
            <Image
              src={guide.heroImage}
              alt=""
              fill
              quality={85}
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <div className="bg-canvas pt-12 pb-20 sm:pt-16 sm:pb-24">
          <div className="mx-auto w-full max-w-3xl space-y-12 px-5 sm:px-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.7rem] sm:text-[2rem]">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[1.05rem] leading-[1.9] text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-5 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative ps-5 text-[1.02rem] leading-[1.8] text-ink-soft before:absolute before:start-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-gold-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </article>

      {services.length > 0 ? (
        <Section tone="alt" inset compact>
          <SectionHeading title={t("relatedServices")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      ) : null}

      {packages.length > 0 ? (
        <Section tone="canvas" compact>
          <SectionHeading title={t("relatedPackages")} />
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} shape="adaptive" />
            ))}
          </div>
        </Section>
      ) : null}

      <ClosingCta
        title={tCta("ctaTitle")}
        subtitle={tCta("ctaSubtitle")}
        intent="custom"
      />
    </>
  );
}
