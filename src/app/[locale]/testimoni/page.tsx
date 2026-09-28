import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { PageHeader } from "@/components/shared/PageHeader";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { images } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { buildAlternates } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/testimoni">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Testimonials" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/testimoni", locale as AppLocale),
  };
}

export default async function TestimonialsPage({
  params,
}: PageProps<"/[locale]/testimoni">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Testimonials" });

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["vietnam-ha-long"]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {/*
          Grid lima kolom dengan kartu selebar 3 dan 2 bergantian. Tiap baris
          tetap genap (3+2 = 5), tapi lebarnya tidak seragam sehingga
          susunannya tidak terbaca seperti tabel.
        */}
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {testimonials.map((testimonial, index) => {
            const wide = index % 4 === 0 || index % 4 === 3;

            return (
              <StaggerItem
                key={testimonial.id}
                className={cn("h-full", wide ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      <ClosingCta title={t("ctaTitle")} subtitle={t("ctaSubtitle")} />
    </>
  );
}
