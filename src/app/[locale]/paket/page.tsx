import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { PackageBrowser } from "@/components/package/PackageBrowser";
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
import { getAllPackages } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/paket">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Packages" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/paket", locale as AppLocale),
    openGraph: await buildOpenGraph("/paket", locale as AppLocale, {
      title: t("metaTitle"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function PackagesPage({
  params,
}: PageProps<"/[locale]/paket">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Packages" });
  const packages = getAllPackages();

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(locale as AppLocale, tNav("home"), [
      { name: tNav("packages"), href: "/paket" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHeader
        title={t("title")}
        subtitle={t("description")}
        image={images["bromo-lanskap"]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        {/* useSearchParams di dalam PackageBrowser butuh batas Suspense
            agar halaman ini tetap bisa dirender statis saat build. */}
        <Suspense fallback={<div className="h-72" />}>
          <PackageBrowser packages={packages} />
        </Suspense>
      </div>
    </>
  );
}
