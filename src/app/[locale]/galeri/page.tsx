import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { Lightbox, LightboxTrigger } from "@/components/shared/Lightbox";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ButtonAnchor } from "@/components/shared/Button";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { gallery } from "@/content/gallery";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/galeri">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/galeri", locale as AppLocale),
    openGraph: await buildOpenGraph("/galeri", locale as AppLocale, {
      title: t("title"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function GalleryPage({
  params,
}: PageProps<"/[locale]/galeri">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Gallery" });
  const appLocale = (await getLocale()) as AppLocale;

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(locale as AppLocale, tNav("home"), [
      { name: tNav("gallery"), href: "/galeri" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["umum-fotografer"]}
        imagePosition="object-[28%_25%]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="sr-only">{t("gridTitle")}</h2>
        {/*
          Keterangan selalu terlihat di bawah foto — pengguna ponsel dan
          keyboard tidak punya hover. Foto `span: 2` memakai rasio 8/3 supaya
          tingginya sama dengan foto 4/3 di sebelahnya.
        */}
        <Lightbox
          items={gallery.map((item) => ({
            src: item.src,
            alt: item.caption[appLocale],
            caption: item.caption[appLocale],
          }))}
        >
          <StaggerGroup className="grid grid-cols-2 items-start gap-x-3 gap-y-7 sm:gap-x-4 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <StaggerItem
                key={item.src}
                className={item.span === 2 ? "sm:col-span-2" : undefined}
              >
                <figure>
                  <div
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden rounded-3xl",
                      item.span === 2 && "sm:aspect-[8/5]",
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
                      quality={85}
                      className="object-cover"
                    />
                    <LightboxTrigger index={index} />
                  </div>
                  <figcaption className="mt-2.5 px-1 text-[0.9rem] leading-snug text-ink-soft">
                    {item.caption[appLocale]}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Lightbox>

        {/*
          Foto di atas adalah foto stok destinasi. Dokumentasi perjalanan
          asli ada di Instagram, jadi pengunjung diarahkan ke sana.
        */}
        <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl bg-canvas-alt p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-[1.75rem]">{t("instagramTitle")}</h2>
            <p className="mt-2 max-w-xl text-ink-soft">{t("instagramText")}</p>
          </div>
          <ButtonAnchor
            href={site.social.instagram}
            variant="outline"
            className="shrink-0"
          >
            <InstagramIcon className="size-4" />
            @bungawisata
          </ButtonAnchor>
        </div>
      </div>
    </>
  );
}
