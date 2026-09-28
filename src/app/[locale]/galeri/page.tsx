import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PageHeader } from "@/components/shared/PageHeader";
import { gallery } from "@/content/gallery";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
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
        {/*
          Keterangan selalu terlihat di bawah foto — pengguna ponsel dan
          keyboard tidak punya hover. Foto `span: 2` memakai rasio 8/3 supaya
          tingginya sama dengan foto 4/3 di sebelahnya.
        */}
        <StaggerGroup className="grid grid-cols-2 items-start gap-x-4 gap-y-8 lg:grid-cols-4">
          {gallery.map((item) => (
            <StaggerItem
              key={item.src}
              className={item.span === 2 ? "sm:col-span-2" : undefined}
            >
              <figure>
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden",
                    item.span === 2 && "sm:aspect-[8/3]",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.caption[appLocale]}
                    fill
                    sizes={
                      item.span === 2
                        ? "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 50vw"
                        : "(min-width: 1024px) 25vw, 50vw"
                    }
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.85rem] leading-snug text-ink-soft">
                  {item.caption[appLocale]}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </>
  );
}
