import type { Metadata, ResolvingMetadata } from "next";
import { SITE_URL, site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

/** URL absolut satu halaman dalam bahasa tertentu. */
export function absoluteUrl(href: Href, locale: AppLocale): string {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

/**
 * Item breadcrumb (beranda + `trail`) dengan URL absolut, siap untuk
 * `breadcrumbJsonLd`.
 */
export function breadcrumbItems(
  locale: AppLocale,
  homeLabel: string,
  trail: ReadonlyArray<{ name: string; href: Href }>,
) {
  return [{ name: homeLabel, href: "/" as Href }, ...trail].map((item) => ({
    name: item.name,
    url: absoluteUrl(item.href, locale),
  }));
}

/**
 * Canonical + hreflang untuk satu halaman, dalam kedua bahasa.
 *
 * Tanpa ini Google bisa menganggap versi ID dan EN sebagai konten duplikat.
 */
export function buildAlternates(href: Href, locale: AppLocale) {
  const languages = Object.fromEntries(
    routing.locales.map((target) => [
      target,
      `${SITE_URL}${getPathname({ href, locale: target })}`,
    ]),
  );

  return {
    canonical: `${SITE_URL}${getPathname({ href, locale })}`,
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}

/**
 * Open Graph lengkap untuk satu halaman, termasuk `og:url` absolut yang
 * sama dengan canonical.
 *
 * Metadata antar-segmen digabung secara dangkal: `openGraph` milik halaman
 * menggantikan seluruh `openGraph` dari layout. Karena itu `siteName`,
 * `type`, dan `locale` ikut diisi di sini, bukan hanya `url`. Bila `images`
 * tidak diisi, gambar dari segmen induk (`[locale]/opengraph-image.tsx`)
 * diteruskan lewat `parent` supaya tidak hilang.
 */
export async function buildOpenGraph(
  href: Href,
  locale: AppLocale,
  {
    title,
    description,
    images,
    parent,
  }: {
    title: string;
    description: string;
    images?: NonNullable<Metadata["openGraph"]>["images"];
    parent?: ResolvingMetadata;
  },
): Promise<NonNullable<Metadata["openGraph"]>> {
  const inherited =
    images ?? (parent ? (await parent).openGraph?.images : undefined);

  return {
    type: "website",
    siteName: site.name,
    locale: locale === "id" ? "id_ID" : "en_US",
    url: `${SITE_URL}${getPathname({ href, locale })}`,
    title,
    description,
    ...(inherited ? { images: inherited } : {}),
  };
}
