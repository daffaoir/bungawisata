import { ArrowRight } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { images } from "@/content/images";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { getAllGuides } from "@/lib/guides";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/panduan">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/panduan", locale as AppLocale),
    openGraph: await buildOpenGraph("/panduan", locale as AppLocale, {
      title: t("metaTitle"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function GuidesPage({
  params,
}: PageProps<"/[locale]/panduan">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Guides" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tCta = await getTranslations({ locale, namespace: "Services" });
  const guides = getAllGuides();

  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(appLocale, tNav("home"), [
      { name: tNav("guides"), href: "/panduan" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["bromo-kaldera"]}
      />

      <Section tone="canvas" compact>
        <h2 className="sr-only">{t("title")}</h2>
        <StaggerGroup className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => {
            const content = guide.content[appLocale];
            const href = {
              pathname: "/panduan/[slug]",
              params: { slug: guide.slug },
            } as const;

            return (
              <StaggerItem key={guide.slug} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-canvas-alt">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={guide.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out-soft [@media(hover:hover)]:group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[0.85rem] text-ink-muted">
                      <time dateTime={guide.updatedAt}>
                        {formatDate(guide.updatedAt, appLocale)}
                      </time>
                    </p>
                    <h3 className="mt-2 text-[1.5rem]">
                      <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl">
                        {content.title}
                      </Link>
                    </h3>
                    <p className="mt-2 mb-5 leading-[1.65] text-ink-soft">
                      {content.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-gold-700">
                      {t("readMore")}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Section>

      <ClosingCta
        title={tCta("ctaTitle")}
        subtitle={tCta("ctaSubtitle")}
        intent="custom"
      />
    </>
  );
}
