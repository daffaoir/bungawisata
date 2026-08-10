import { SITE_URL } from "@/content/site";
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
