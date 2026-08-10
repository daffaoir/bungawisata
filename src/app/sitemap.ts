import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPackages } from "@/lib/packages";

type Href = Parameters<typeof getPathname>[0]["href"];

function entry(href: Href, priority: number): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${SITE_URL}${getPathname({ href, locale })}`,
    ]),
  );

  return {
    url: languages[routing.defaultLocale],
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    entry("/paket", 0.9),
    entry("/tentang-kami", 0.6),
    entry("/galeri", 0.5),
    entry("/testimoni", 0.5),
    entry("/kontak", 0.6),
    ...getAllPackages().map((pkg) =>
      entry({ pathname: "/paket/[slug]", params: { slug: pkg.slug } }, 0.8),
    ),
  ];
}
