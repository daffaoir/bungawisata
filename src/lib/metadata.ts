import type { Metadata } from "next";
import { SITE_URL, site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

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
 * `type`, dan `locale` ikut diisi di sini, bukan hanya `url`. Gambar OG
 * bawaan tetap datang dari `[locale]/opengraph-image.tsx`.
 */
export function buildOpenGraph(
  href: Href,
  locale: AppLocale,
  {
    title,
    description,
    images,
  }: {
    title: string;
    description: string;
    images?: NonNullable<Metadata["openGraph"]>["images"];
  },
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: site.name,
    locale: locale === "id" ? "id_ID" : "en_US",
    url: `${SITE_URL}${getPathname({ href, locale })}`,
    title,
    description,
    ...(images ? { images } : {}),
  };
}
