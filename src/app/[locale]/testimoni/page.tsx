import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { PageHeader } from "@/components/shared/PageHeader";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { images } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { routing, type AppLocale } from "@/i18n/routing";
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
          Kutipan tanpa kotak: teks kutipan jadi elemen utama, tiap item
          dipisah garis rambut di atasnya.
        */}
        <StaggerGroup className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} variant="quote" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <ClosingCta title={t("ctaTitle")} subtitle={t("ctaSubtitle")} />
    </>
  );
}
