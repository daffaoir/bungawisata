import { packageList } from "@/content/packages";
import type { AppLocale } from "@/i18n/routing";
import {
  filterIndex,
  type PackageFilterState,
  type PackageIndexEntry,
  type PackageSort,
} from "./package-filters";
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

export {
  DURATION_BUCKETS,
  PRICE_BUCKETS,
  matchesDuration,
  matchesPrice,
  type DurationBucket,
  type PackageFilterState,
  type PackageIndexEntry,
  type PackageSort,
  type PriceBucket,
} from "./package-filters";

/**
 * Indeks ringan satu paket untuk filter di client. Pencarian sengaja
 * menelusuri teks KEDUA bahasa sekaligus, jadi mengetik "Turkey" saat situs
 * berbahasa Indonesia tetap menemukan paket Turki.
 */
export function toIndexEntry(pkg: Package): PackageIndexEntry {
  return {
    slug: pkg.slug,
    region: pkg.region,
    destination: pkg.destination,
    durationDays: pkg.durationDays,
    priceFrom: pkg.priceFrom,
    searchText: [
      pkg.destination,
      pkg.content.id.title,
      pkg.content.en.title,
      pkg.content.id.summary,
      pkg.content.en.summary,
      ...pkg.tags,
    ]
      .join(" ")
      .toLowerCase(),
  };
}

export function filterPackages(
  source: Package[],
  filters: PackageFilterState,
  sort: PackageSort = "default",
): Package[] {
  const bySlug = new Map(source.map((pkg) => [pkg.slug, pkg]));

  return filterIndex(source.map(toIndexEntry), filters, sort).map(
    (entry) => bySlug.get(entry.slug)!,
  );
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
