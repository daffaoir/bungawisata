import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { PackageBrowser } from "@/components/package/PackageBrowser";
import { PageHeader } from "@/components/shared/PageHeader";
import { images } from "@/content/images";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";
import { getAllPackages } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/paket">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Packages" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/paket", locale as AppLocale),
  };
}

export default async function PackagesPage({
  params,
}: PageProps<"/[locale]/paket">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Packages" });
  const packages = getAllPackages();

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("description")}
        image={images["bromo-lanskap"]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        {/* useSearchParams di dalam PackageBrowser butuh batas Suspense
            agar halaman ini tetap bisa dirender statis saat build. */}
        <Suspense fallback={<div className="h-72" />}>
          <PackageBrowser packages={packages} />
        </Suspense>
      </div>
    </>
  );
}
