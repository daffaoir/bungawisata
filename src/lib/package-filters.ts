/**
 * Logika filter paket yang ringan — tanpa data paket dan tanpa zod — supaya
 * aman di-bundle ke client oleh `PackageBrowser`. Data lengkap paket tetap
 * di server; client hanya menerima `PackageIndexEntry`.
 */

export const REGIONS = ["dalam-negeri", "luar-negeri"] as const;
export type Region = (typeof REGIONS)[number];

export const DURATION_BUCKETS = ["short", "medium", "long"] as const;
export type DurationBucket = (typeof DURATION_BUCKETS)[number];

export const PRICE_BUCKETS = ["low", "mid", "high"] as const;
export type PriceBucket = (typeof PRICE_BUCKETS)[number];

/** Data minimum satu paket untuk filter & pencarian di client. */
export type PackageIndexEntry = {
  slug: string;
  region: Region;
  destination: string;
  durationDays: number;
  priceFrom: number;
  /** Judul, ringkasan (kedua bahasa), destinasi, dan tag — huruf kecil. */
  searchText: string;
};

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

function matchesQuery(entry: PackageIndexEntry, query: string): boolean {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => entry.searchText.includes(term));
}

export function filterIndex<T extends PackageIndexEntry>(
  source: T[],
  filters: PackageFilterState,
  sort: PackageSort = "default",
): T[] {
  const { region, destination, duration, price, query } = filters;

  const result = source.filter((entry) => {
    if (region && region !== "all" && entry.region !== region) return false;
    if (destination && entry.destination !== destination) return false;
    if (duration && !matchesDuration(entry.durationDays, duration)) return false;
    if (price && !matchesPrice(entry.priceFrom, price)) return false;
    if (query?.trim() && !matchesQuery(entry, query.trim())) return false;
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
