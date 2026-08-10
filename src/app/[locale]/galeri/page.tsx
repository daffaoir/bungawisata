import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHeader } from "@/components/shared/PageHeader";
import { gallery } from "@/content/gallery";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/galeri">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/galeri", locale as AppLocale),
  };
}

export default async function GalleryPage({
  params,
}: PageProps<"/[locale]/galeri">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Gallery" });
  const appLocale = (await getLocale()) as AppLocale;

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["bali-pantai-senja"]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <StaggerGroup className="grid auto-rows-[14rem] grid-cols-2 gap-4 sm:auto-rows-[17rem] lg:grid-cols-4">
          {gallery.map((item) => (
            <StaggerItem
              key={item.src}
              className={item.span === 2 ? "sm:col-span-2" : undefined}
            >
              <figure className="group relative h-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.caption[appLocale]}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-sm leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption[appLocale]}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-10 border border-dashed border-line p-5 text-center text-sm text-ink-muted">
          {t("placeholderNote")}
        </p>
      </div>
    </>
  );
}
