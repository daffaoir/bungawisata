import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { PageHeader } from "@/components/shared/PageHeader";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";

const VALUES = ["honest", "personal", "detail"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/tentang-kami">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/tentang-kami", locale as AppLocale),
    openGraph: await buildOpenGraph("/tentang-kami", locale as AppLocale, {
      title: t("metaTitle"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/tentang-kami">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About" });

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(locale as AppLocale, tNav("home"), [
      { name: tNav("about"), href: "/tentang-kami" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        title={t("title")}
        subtitle={t("intro")}
        image={images["komodo-kapal"]}
      />

      {/*
        Cerita dua kolom di desktop: judul + foto menempel di kiri, teks
        dengan lebar baca nyaman di kanan. Di ponsel urutannya judul, teks,
        lalu foto. Sengaja bukan `Section`: `overflow-hidden` miliknya
        mematikan `position: sticky` di kolom kiri.
      */}
      <section className="py-20 text-ink sm:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.25rem]">
              {t("storyTitle")}
            </h2>
            <div className="reveal-photo relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
              <Image
                src={images["suasana-candi-jalan"]}
                alt=""
                fill
                quality={85}
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="max-w-[62ch] text-[1.1rem] leading-[1.85] text-ink-soft">
              {t("story")}
            </p>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-3xl lg:hidden">
              <Image
                src={images["suasana-candi-jalan"]}
                alt=""
                fill
                quality={85}
                sizes="(min-width: 1024px) 0px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section tone="alt" inset>
        <SectionHeading title={t("valuesTitle")} align="center" />

        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {VALUES.map((key) => (
            <StaggerItem key={key} className="h-full">
              <div className="h-full rounded-3xl bg-canvas p-6 sm:p-7">
                <h3 className="text-[1.4rem]">{t(`values.${key}.title`)}</h3>
                <p className="mt-2 leading-[1.7] text-ink-soft">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <ClosingCta title={t("ctaTitle")} subtitle={t("ctaSubtitle")} />
    </>
  );
}
