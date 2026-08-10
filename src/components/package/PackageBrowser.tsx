"use client";

import { RotateCcw, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { EmptyState } from "@/components/shared/EmptyState";
import { Select } from "@/components/shared/Select";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { cn } from "@/lib/cn";
import {
  DURATION_BUCKETS,
  PRICE_BUCKETS,
  filterPackages,
  type DurationBucket,
  type PriceBucket,
} from "@/lib/packages";
import { REGIONS, type Package, type Region } from "@/lib/schema";
import { PackageCard } from "./PackageCard";

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

export function PackageBrowser({ packages }: { packages: Package[] }) {
  const t = useTranslations("Packages.filters");
  const tEmpty = useTranslations("Packages.empty");
  const tCommon = useTranslations("Common");
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() =>
    readInitialState(new URLSearchParams(searchParams.toString())),
  );

  // Menulis langsung ke history — bukan router.replace — supaya mengetik di
  // kolom pencarian tidak memicu permintaan RSC pada setiap ketukan.
  useEffect(() => {
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
  }, [filters]);

  /** Destinasi menyesuaikan region aktif agar pilihannya tidak sia-sia. */
  const destinations = useMemo(() => {
    const source =
      filters.region === "all"
        ? packages
        : packages.filter((pkg) => pkg.region === filters.region);

    return [...new Set(source.map((pkg) => pkg.destination))].sort((a, b) =>
      a.localeCompare(b, "id"),
    );
  }, [packages, filters.region]);

  const results = useMemo(
    () =>
      filterPackages(packages, {
        region: filters.region,
        destination: filters.destination || undefined,
        duration: filters.duration || undefined,
        price: filters.price || undefined,
        query: filters.query,
      }),
    [packages, filters],
  );

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(EMPTY);

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
      <div className="border border-line bg-white p-6 sm:p-8">
        <div
          role="group"
          aria-label={tCommon("viewAllPackages")}
          className="flex flex-wrap gap-2"
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
                  "border px-5 py-2.5 text-[0.68rem] font-semibold tracking-[0.1em] uppercase",
                  "transition-colors duration-300",
                  isActive
                    ? "border-ink bg-ink text-canvas"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="relative">
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
              className="w-full border border-line bg-white py-3 ps-11 pe-4 text-sm text-ink transition-colors duration-300 hover:border-ink/40 focus:border-ink focus:outline-none"
            />
          </div>

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

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="text-[0.7rem] tracking-[0.12em] text-ink-muted uppercase"
        >
          {t("resultCount", { count: results.length })}
        </p>

        {isFiltered ? (
          <button
            type="button"
            onClick={() => setFilters(EMPTY)}
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] text-gold-600 uppercase transition-colors hover:text-ink"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            {t("reset")}
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <StaggerGroup className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((pkg) => (
            <StaggerItem key={pkg.slug} className="h-full">
              <PackageCard pkg={pkg} />
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
