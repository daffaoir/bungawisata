"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { EmptyState } from "@/components/shared/EmptyState";
import { Select } from "@/components/shared/Select";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { cn } from "@/lib/cn";
import {
  DURATION_BUCKETS,
  PRICE_BUCKETS,
  REGIONS,
  filterIndex,
  type DurationBucket,
  type PackageIndexEntry,
  type PriceBucket,
  type Region,
} from "@/lib/package-filters";

type RegionFilter = Region | "all";

type FilterState = {
  region: RegionFilter;
  destination: string;
  duration: DurationBucket | "";
  price: PriceBucket | "";
  query: string;
};

const EMPTY: FilterState = {
  region: "all",
  destination: "",
  duration: "",
  price: "",
  query: "",
};

function isRegion(value: string | null): value is Region {
  return REGIONS.includes(value as Region);
}

function readInitialState(params: URLSearchParams): FilterState {
  const region = params.get("region");
  const duration = params.get("duration");
  const price = params.get("price");

  return {
    region: isRegion(region) ? region : "all",
    destination: params.get("destination") ?? "",
    duration: DURATION_BUCKETS.includes(duration as DurationBucket)
      ? (duration as DurationBucket)
      : "",
    price: PRICE_BUCKETS.includes(price as PriceBucket)
      ? (price as PriceBucket)
      : "",
    query: params.get("q") ?? "",
  };
}

/**
 * Kartu paket dirender di server dan diteruskan lewat `cards` (per slug);
 * client hanya menerima `index` ringan untuk memfilter. Dengan begitu data
 * itinerary lengkap dan zod tidak ikut ter-bundle ke browser.
 */
export function PackageBrowser({
  index,
  cards,
}: {
  index: PackageIndexEntry[];
  cards: Record<string, ReactNode>;
}) {
  const t = useTranslations("Packages.filters");
  const tEmpty = useTranslations("Packages.empty");
  const tCommon = useTranslations("Common");
  /**
   * Render awal (termasuk HTML statis) selalu menampilkan semua paket supaya
   * mesin pencari melihat seluruh tautan dan tidak ada layout shift. Filter
   * dari URL baru diterapkan setelah mount.
   */
  const [filters, setFilters] = useState<FilterState>(EMPTY);
  const [hasReadUrl, setHasReadUrl] = useState(false);
  /** Hanya berlaku di bawah `lg`; di desktop semua field selalu terlihat. */
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const moreFiltersId = useId();

  useEffect(() => {
    const initial = readInitialState(
      new URLSearchParams(window.location.search),
    );
    // Sinkronisasi sekali dengan URL (sistem eksternal) setelah hidrasi.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(initial);
    setHasReadUrl(true);
  }, []);

  // Menulis langsung ke history — bukan router.replace — supaya mengetik di
  // kolom pencarian tidak memicu permintaan RSC pada setiap ketukan.
  useEffect(() => {
    // Jangan menimpa URL sebelum filter awal dari URL terbaca.
    if (!hasReadUrl) return;

    const params = new URLSearchParams();
    if (filters.region !== "all") params.set("region", filters.region);
    if (filters.destination) params.set("destination", filters.destination);
    if (filters.duration) params.set("duration", filters.duration);
    if (filters.price) params.set("price", filters.price);
    if (filters.query.trim()) params.set("q", filters.query.trim());

    const queryString = params.toString();
    const url = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", url);
  }, [filters, hasReadUrl]);

  /** Destinasi menyesuaikan region aktif agar pilihannya tidak sia-sia. */
  const destinations = useMemo(() => {
    const source =
      filters.region === "all"
        ? index
        : index.filter((pkg) => pkg.region === filters.region);

    return [...new Set(source.map((pkg) => pkg.destination))].sort((a, b) =>
      a.localeCompare(b, "id"),
    );
  }, [index, filters.region]);

  const results = useMemo(
    () =>
      filterIndex(index, {
        region: filters.region,
        destination: filters.destination || undefined,
        duration: filters.duration || undefined,
        price: filters.price || undefined,
        query: filters.query,
      }),
    [index, filters],
  );

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(EMPTY);
  const activeMoreFilters = [
    filters.destination,
    filters.duration,
    filters.price,
  ].filter(Boolean).length;

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      // Destinasi yang dipilih bisa jadi tidak ada di region yang baru.
      if (key === "region") next.destination = "";
      return next;
    });
  }

  return (
    <div>
      {/*
        Di ponsel panel ini harus ringkas: baris segmen region, lalu kolom
        cari + tombol "Filter" yang membuka tiga pilihan lainnya. Di `lg`
        semuanya terlihat dalam satu kotak seperti sebelumnya — pembungkus
        `lg:contents` meleburkan anak-anaknya ke grid empat kolom.
      */}
      <div className="lg:rounded-3xl lg:bg-canvas-alt lg:p-6">
        <div
          role="group"
          aria-label={tCommon("viewAllPackages")}
          className="flex gap-1.5 sm:gap-2"
        >
          {(["all", ...REGIONS] as const).map((region) => {
            const isActive = filters.region === region;
            const label =
              region === "all"
                ? t("all")
                : region === "dalam-negeri"
                  ? tCommon("domestic")
                  : tCommon("international");

            return (
              <button
                key={region}
                type="button"
                onClick={() => update("region", region)}
                aria-pressed={isActive}
                className={cn(
                  "min-h-11 rounded-full px-4 text-[0.925rem] font-medium sm:px-5 sm:text-[0.95rem]",
                  "transition-colors duration-300",
                  isActive
                    ? "bg-ink text-canvas"
                    : "bg-canvas-alt text-ink hover:bg-gold-100 lg:bg-canvas",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-3 lg:mt-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex gap-3 lg:contents">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <input
                type="search"
                value={filters.query}
                onChange={(event) => update("query", event.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("search")}
                className="min-h-12 w-full rounded-full border border-ink/15 bg-canvas py-3 ps-11 pe-4 text-[0.95rem] text-ink transition-colors duration-300 placeholder:text-ink-muted hover:border-ink/40 focus:border-ink/60 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowMoreFilters((open) => !open)}
              aria-expanded={showMoreFilters}
              aria-controls={moreFiltersId}
              className={cn(
                "inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.925rem] font-medium lg:hidden",
                "transition-colors duration-300",
                showMoreFilters || activeMoreFilters > 0
                  ? "border-ink bg-ink text-canvas"
                  : "border-ink/15 bg-canvas text-ink hover:border-ink/40",
              )}
            >
              <SlidersHorizontal
                className="size-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {t("toggle", { count: activeMoreFilters })}
            </button>
          </div>

          <div
            id={moreFiltersId}
            className={cn("gap-3 lg:contents", showMoreFilters ? "grid" : "hidden")}
          >
            <Select
              value={filters.destination}
              onChange={(value) => update("destination", value)}
              label={t("destination")}
              options={[
                { value: "", label: t("allDestinations") },
                ...destinations.map((destination) => ({
                  value: destination,
                  label: destination,
                })),
              ]}
            />

            <Select
              value={filters.duration}
              onChange={(value) => update("duration", value as DurationBucket | "")}
              label={t("duration")}
              options={[
                { value: "", label: t("allDurations") },
                { value: "short", label: t("durationShort") },
                { value: "medium", label: t("durationMedium") },
                { value: "long", label: t("durationLong") },
              ]}
            />

            <Select
              value={filters.price}
              onChange={(value) => update("price", value as PriceBucket | "")}
              label={t("price")}
              options={[
                { value: "", label: t("allPrices") },
                { value: "low", label: t("priceLow") },
                { value: "mid", label: t("priceMid") },
                { value: "high", label: t("priceHigh") },
              ]}
            />
          </div>
        </div>
      </div>

      <h2 className="sr-only">{t("resultsHeading")}</h2>
      <div className="mt-8 flex min-h-11 flex-wrap items-center justify-between gap-3 lg:mt-10">
        <p
          aria-live="polite"
          className="text-[0.95rem] text-ink-muted"
        >
          {t("resultCount", { count: results.length })}
        </p>

        {isFiltered ? (
          <button
            type="button"
            onClick={() => setFilters(EMPTY)}
            className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-gold-700 transition-colors hover:text-ink"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            {t("reset")}
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <StaggerGroup className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((pkg) => (
            <StaggerItem key={pkg.slug} className="h-full">
              {cards[pkg.slug]}
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <div className="mt-6">
          <EmptyState
            title={tEmpty("title")}
            description={tEmpty("description")}
            action={
              <WhatsAppCta intent="custom" size="lg" label={tEmpty("cta")} />
            }
          />
        </div>
      )}
    </div>
  );
}
