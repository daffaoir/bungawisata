import { packageList } from "@/content/packages";
import type { AppLocale } from "@/i18n/routing";
import { parsePackage, type Package, type Region } from "./schema";

/**
 * Divalidasi sekali saat modul dimuat. Kalau ada data paket yang salah bentuk,
 * `npm run build` gagal dengan pesan yang menyebut slug dan field-nya —
 * bukan situs yang diam-diam tayang dengan konten bolong.
 */
const packages: Package[] = packageList.map(parsePackage);

const duplicateSlug = packages
  .map((pkg) => pkg.slug)
  .find((slug, index, all) => all.indexOf(slug) !== index);

if (duplicateSlug) {
  throw new Error(
    `Slug paket duplikat: "${duplicateSlug}". Setiap paket harus punya slug unik.`,
  );
}

export function getAllPackages(): Package[] {
  return packages;
}

export function getPackagesByRegion(region: Region): Package[] {
  return packages.filter((pkg) => pkg.region === region);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((pkg) => pkg.slug === slug);
}

export function getFeaturedPackages(limit = 3): Package[] {
  const featured = packages.filter((pkg) => pkg.featured);
  const rest = packages.filter((pkg) => !pkg.featured);

  // Kalau paket unggulan belum cukup, lengkapi dengan paket lain supaya
  // bagian "Paket Pilihan" di beranda tidak pernah tampil setengah kosong.
  return [...featured, ...rest].slice(0, limit);
}

/** Daftar destinasi unik, terurut abjad — untuk mengisi dropdown filter. */
export function getDestinations(region?: Region): string[] {
  const source = region ? getPackagesByRegion(region) : packages;

  return [...new Set(source.map((pkg) => pkg.destination))].sort((a, b) =>
    a.localeCompare(b, "id"),
  );
}

export const DURATION_BUCKETS = ["short", "medium", "long"] as const;
export type DurationBucket = (typeof DURATION_BUCKETS)[number];

export const PRICE_BUCKETS = ["low", "mid", "high"] as const;
export type PriceBucket = (typeof PRICE_BUCKETS)[number];

export function matchesDuration(days: number, bucket: DurationBucket): boolean {
  if (bucket === "short") return days <= 4;
  if (bucket === "medium") return days >= 5 && days <= 8;
  return days >= 9;
}

export function matchesPrice(price: number, bucket: PriceBucket): boolean {
  if (bucket === "low") return price < 10_000_000;
  if (bucket === "mid") return price >= 10_000_000 && price <= 25_000_000;
  return price > 25_000_000;
}

export type PackageFilterState = {
  region?: Region | "all";
  destination?: string;
  duration?: DurationBucket;
  price?: PriceBucket;
  query?: string;
};

export type PackageSort = "default" | "price-asc" | "price-desc" | "duration-asc";

/**
 * Pencarian sengaja menelusuri judul KEDUA bahasa sekaligus, jadi mengetik
 * "Turkey" saat situs berbahasa Indonesia tetap menemukan paket Turki.
 */
function matchesQuery(pkg: Package, query: string): boolean {
  const haystack = [
    pkg.destination,
    pkg.content.id.title,
    pkg.content.en.title,
    pkg.content.id.summary,
    pkg.content.en.summary,
    ...pkg.tags,
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterPackages(
  source: Package[],
  filters: PackageFilterState,
  sort: PackageSort = "default",
): Package[] {
  const { region, destination, duration, price, query } = filters;

  const result = source.filter((pkg) => {
    if (region && region !== "all" && pkg.region !== region) return false;
    if (destination && pkg.destination !== destination) return false;
    if (duration && !matchesDuration(pkg.durationDays, duration)) return false;
    if (price && !matchesPrice(pkg.priceFrom, price)) return false;
    if (query?.trim() && !matchesQuery(pkg, query.trim())) return false;
    return true;
  });

  if (sort === "price-asc") {
    return [...result].sort((a, b) => a.priceFrom - b.priceFrom);
  }
  if (sort === "price-desc") {
    return [...result].sort((a, b) => b.priceFrom - a.priceFrom);
  }
  if (sort === "duration-asc") {
    return [...result].sort((a, b) => a.durationDays - b.durationDays);
  }

  return result;
}

/** Paket lain dengan region sama, untuk bagian "Paket Serupa". */
export function getRelatedPackages(current: Package, limit = 3): Package[] {
  const sameRegion = packages.filter(
    (pkg) => pkg.slug !== current.slug && pkg.region === current.region,
  );
  const others = packages.filter(
    (pkg) => pkg.slug !== current.slug && pkg.region !== current.region,
  );

  return [...sameRegion, ...others].slice(0, limit);
}

/** Konten paket dalam bahasa aktif. */
export function localizedContent(pkg: Package, locale: AppLocale) {
  return pkg.content[locale];
}
