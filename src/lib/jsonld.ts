import { SITE_URL, MAPS_LINK, site } from "@/content/site";

/** `@id` entitas bisnis — dirujuk oleh paket, layanan, dan artikel. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Entitas bisnis tunggal untuk seluruh situs. Datanya mengikuti Google
 * Business Profile supaya Google menautkan situs ke profil yang sama.
 */
export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: site.businessName,
    alternateName: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    description,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo-full.png`,
    image: `${SITE_URL}/logo-full.png`,
    telephone: site.phoneE164,
    ...(site.email ? { email: site.email } : {}),
    priceRange: "Rp",
    address: {
      "@type": "PostalAddress",
      // Nama jalan dan kawasan digabung: Google membaca `streetAddress`
      // sebagai satu baris, sedangkan alamat kantor ini butuh keduanya.
      streetAddress: `${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.hours.flatMap((entry) =>
      entry.schema
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: entry.schema.dayOfWeek,
              opens: entry.schema.opens,
              closes: entry.schema.closes,
            },
          ]
        : [],
    ),
    areaServed: [
      { "@type": "City", name: "Malang" },
      { "@type": "City", name: "Batu" },
      { "@type": "AdministrativeArea", name: "Jawa Timur" },
      { "@type": "Country", name: "Indonesia" },
    ],
    hasMap: MAPS_LINK,
    sameAs: Object.values(site.social),
  };
}

/**
 * Breadcrumb dari beranda sampai halaman aktif. URL harus absolut — buat
 * lewat `absoluteUrl` di `@/lib/metadata`.
 */
export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Serialisasi aman untuk `<script type="application/ld+json">`. */
export function serializeJsonLd(data: unknown): string {
  // `<` di-escape agar teks apa pun mustahil menutup tag <script>.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
