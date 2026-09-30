import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PackageCard } from "@/components/package/PackageCard";
import { ButtonAnchor } from "@/components/shared/Button";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { QuoteRequestForm } from "@/components/shared/QuoteRequestForm";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { SITE_URL } from "@/content/site";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
} from "@/lib/jsonld";
import {
  absoluteUrl,
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import {
  getAllServices,
  getServiceBySlug,
  getServiceRelatedPackages,
} from "@/lib/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllServices().map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/layanan/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const content = service.content[locale as AppLocale];
  const href = { pathname: "/layanan/[slug]", params: { slug } } as const;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates(href, locale as AppLocale),
    openGraph: await buildOpenGraph(href, locale as AppLocale, {
      title: content.metaTitle,
      description: content.metaDescription,
      images: [{ url: service.heroImage, alt: content.title }],
    }),
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/layanan/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const appLocale = locale as AppLocale;
  const content = service.content[appLocale];
  const t = await getTranslations({ locale, namespace: "Services" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tWa = await getTranslations({ locale, namespace: "WhatsApp" });
  const services = getAllServices();
  const related = getServiceRelatedPackages(service);
  const others = services.filter((other) => other.slug !== service.slug);
  const href = { pathname: "/layanan/[slug]", params: { slug } } as const;
  const url = absoluteUrl(href, appLocale);
  const whatsappUrl = buildWhatsAppUrl(service.whatsappMessage[appLocale]);

  const jsonLd = [
    serviceJsonLd({
      url,
      name: content.name,
      description: content.metaDescription,
      image: new URL(service.heroImage, SITE_URL).href,
    }),
    breadcrumbJsonLd(
      breadcrumbItems(appLocale, tNav("home"), [
        { name: tNav("services"), href: "/layanan" },
        { name: content.name, href },
      ]),
    ),
    faqPageJsonLd(
      service.faq.map((item) => ({
        question: item.question[appLocale],
        answer: item.answer[appLocale],
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        title={content.title}
        subtitle={content.summary}
        image={service.heroImage}
      >
        <ButtonAnchor href={whatsappUrl} size="lg">
          <WhatsAppIcon className="size-[1.15em]" />
          {tWa("cta")}
        </ButtonAnchor>
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-[2rem] sm:text-[2.4rem]">{t("introTitle")}</h2>
            <div className="mt-6 space-y-5">
              {content.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-[1.5rem]">{content.suitableForTitle}</h3>
              <ul className="space-y-3">
                {content.suitableFor.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-[1.7] text-ink-soft"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-gold-600"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[1.5rem]">{content.weHandleTitle}</h3>
              <ul className="space-y-3">
                {content.weHandle.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-[1.7] text-ink-soft"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-gold-600"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="daun" inset>
        <SectionHeading title={t("stepsTitle")} tone="light" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.title} className="reveal rounded-3xl bg-canvas/10 p-6">
              <span className="flex size-11 items-center justify-center rounded-full bg-gold-400 font-display text-lg font-medium text-ink">
                {index + 1}
              </span>
              <h3 className="mt-5 text-[1.35rem] text-canvas">{step.title}</h3>
              <p className="mt-2 leading-[1.65] text-canvas/80">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" compact>
        <div
          id="penawaran"
          className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
        >
          <SectionHeading
            title={t("quoteTitle")}
            subtitle={t("quoteSubtitle")}
          />
          <QuoteRequestForm
            services={services.map((item) => ({
              slug: item.slug,
              name: item.content[appLocale].name,
            }))}
            defaultService={service.slug}
          />
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="canvas" compact>
          <SectionHeading title={t("relatedTitle")} />
          <StaggerGroup className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((pkg) => (
              <StaggerItem key={pkg.slug} className="h-full">
                <PackageCard pkg={pkg} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>
      ) : null}

      <Section tone="white" compact>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading title={t("faqTitle")} />
          <Reveal>
            <FaqAccordion items={service.faq} />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" inset compact>
        <SectionHeading title={t("otherServices")} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((other) => (
            <ServiceCard key={other.slug} service={other} />
          ))}
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
