import type { MetadataRoute } from "next";
import type { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/metadata";
import { getAllPackages } from "@/lib/packages";

/**
 * Situs dibangun statis, jadi tanggal build adalah saat terakhir kontennya
 * bisa berubah.
 */
const BUILD_DATE = new Date();

type Href = Parameters<typeof getPathname>[0]["href"];

function entry(href: Href, priority: number): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(href, locale),
    ]),
  );

  return {
    url: languages[routing.defaultLocale],
    lastModified: BUILD_DATE,
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
