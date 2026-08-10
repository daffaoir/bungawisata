import { BadgeCheck, HeartHandshake, Wallet } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Section, SectionHeading } from "@/components/shared/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";

const VALUES = [
  { key: "honest", Icon: Wallet },
  { key: "personal", Icon: HeartHandshake },
  { key: "detail", Icon: BadgeCheck },
] as const;

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

      <Section tone="white">
        <SectionHeading title={t("storyTitle")} />
        <p className="mt-6 max-w-3xl text-[1.05rem] leading-[1.9] text-ink-soft">
          {t("story")}
        </p>
      </Section>

      <Section tone="alt">
        <SectionHeading title={t("valuesTitle")} align="center" />

        <StaggerGroup className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {VALUES.map(({ key, Icon }) => (
            <StaggerItem key={key} className="h-full">
              <div className="h-full bg-white p-8">
                <Icon
                  className="size-7 text-gold-600"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-lg">{t(`values.${key}.title`)}</h3>
                <p className="mt-3 leading-[1.8] text-ink-soft">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="ink" compact>
        <div className="text-center">
          <h2 className="text-[1.9rem] sm:text-[2.4rem]">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-5 max-w-xl leading-[1.85] text-white/70">
            {t("ctaSubtitle")}
          </p>
          <WhatsAppCta variant="outlineLight" size="lg" className="mt-9" />
        </div>
      </Section>
    </>
  );
}
