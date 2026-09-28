import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { QuoteRequestForm } from "@/components/shared/QuoteRequestForm";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import { getAllServices } from "@/lib/services";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/layanan">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/layanan", locale as AppLocale),
    openGraph: await buildOpenGraph("/layanan", locale as AppLocale, {
      title: t("metaTitle"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/layanan">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Services" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const services = getAllServices();

  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(appLocale, tNav("home"), [
      { name: tNav("services"), href: "/layanan" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["umum-rombongan"]}
      />

      <Section tone="canvas" compact>
        <h2 className="sr-only">{tNav("services")}</h2>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="white" compact>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            title={t("quoteTitle")}
            subtitle={t("quoteSubtitle")}
          />
          <QuoteRequestForm
            services={services.map((service) => ({
              slug: service.slug,
              name: service.content[appLocale].name,
            }))}
          />
        </div>
      </Section>

      <ClosingCta
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        intent="custom"
      />
    </>
  );
}
