import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { PageHeader } from "@/components/shared/PageHeader";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";

const VALUES = ["honest", "personal", "detail"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tentang-kami">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/tentang-kami", locale as AppLocale),
    openGraph: buildOpenGraph("/tentang-kami", locale as AppLocale, {
      title: t("title"),
      description: t("metaDescription"),
    }),
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/tentang-kami">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("intro")}
        image={images["umum-rombongan"]}
      />

      {/*
        Cerita dua kolom di desktop: judul + foto menempel di kiri, teks
        dengan lebar baca nyaman di kanan. Di ponsel urutannya judul, teks,
        lalu foto. Sengaja bukan `Section`: `overflow-hidden` miliknya
        mematikan `position: sticky` di kolom kiri.
      */}
      <section className="bg-white py-24 text-ink sm:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
              {t("storyTitle")}
            </h2>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
              <Image
                src={images["umum-rombongan"]}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="max-w-[62ch] text-[1.05rem] leading-[1.9] text-ink-soft">
              {t("story")}
            </p>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden lg:hidden">
              <Image
                src={images["umum-rombongan"]}
                alt=""
                fill
                sizes="(min-width: 1024px) 0px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section tone="alt">
        <SectionHeading title={t("valuesTitle")} align="center" />

        <StaggerGroup className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {VALUES.map((key) => (
            <StaggerItem key={key} className="h-full">
              <div>
                <h3 className="rule-gold text-lg">{t(`values.${key}.title`)}</h3>
                <p className="mt-3 leading-[1.8] text-ink-soft">
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
