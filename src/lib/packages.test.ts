import { describe, expect, it } from "vitest";
import {
  filterPackages,
  getAllPackages,
  getDestinations,
  getFeaturedPackages,
  getPackageBySlug,
  getPackagesByRegion,
  getRelatedPackages,
  matchesDuration,
  matchesPrice,
} from "./packages";

const all = getAllPackages();

describe("data paket", () => {
  it("memuat dan memvalidasi seluruh paket tanpa error", () => {
    expect(all.length).toBeGreaterThan(0);
  });

  it("punya paket di kedua region", () => {
    expect(getPackagesByRegion("dalam-negeri").length).toBeGreaterThan(0);
    expect(getPackagesByRegion("luar-negeri").length).toBeGreaterThan(0);
  });

  it("mengembalikan undefined untuk slug yang tidak ada", () => {
    expect(getPackageBySlug("paket-yang-tidak-pernah-ada")).toBeUndefined();
  });
});

describe("matchesDuration", () => {
  it("memisahkan durasi ke bucket yang benar", () => {
    expect(matchesDuration(4, "short")).toBe(true);
    expect(matchesDuration(5, "short")).toBe(false);
    expect(matchesDuration(8, "medium")).toBe(true);
    expect(matchesDuration(9, "medium")).toBe(false);
    expect(matchesDuration(9, "long")).toBe(true);
  });
});

describe("matchesPrice", () => {
  it("menempatkan harga tepat di batas ke bucket yang benar", () => {
    expect(matchesPrice(9_999_999, "low")).toBe(true);
    expect(matchesPrice(10_000_000, "low")).toBe(false);
    expect(matchesPrice(10_000_000, "mid")).toBe(true);
    expect(matchesPrice(25_000_000, "mid")).toBe(true);
    expect(matchesPrice(25_000_001, "mid")).toBe(false);
    expect(matchesPrice(25_000_001, "high")).toBe(true);
  });
});

describe("filterPackages", () => {
  it("mengembalikan semua paket saat filter kosong", () => {
    expect(filterPackages(all, {})).toHaveLength(all.length);
  });

  it("memperlakukan region 'all' sama dengan tanpa filter region", () => {
    expect(filterPackages(all, { region: "all" })).toHaveLength(all.length);
  });

  it("menyaring berdasarkan region", () => {
    const result = filterPackages(all, { region: "luar-negeri" });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((pkg) => pkg.region === "luar-negeri")).toBe(true);
  });

  it("menggabungkan region, durasi, dan harga sekaligus", () => {
    const result = filterPackages(all, {
      region: "luar-negeri",
      duration: "long",
      price: "mid",
    });

    expect(
      result.every(
        (pkg) =>
          pkg.region === "luar-negeri" &&
          pkg.durationDays >= 9 &&
          pkg.priceFrom >= 10_000_000 &&
          pkg.priceFrom <= 25_000_000,
      ),
    ).toBe(true);
  });

  it("menemukan paket lewat judul bahasa Inggris meski situs berbahasa Indonesia", () => {
    const result = filterPackages(all, { query: "Türkiye" });

    expect(result.map((pkg) => pkg.slug)).toContain("turki-9d8n");
  });

  it("mengabaikan besar-kecil huruf dan mencocokkan semua kata kunci", () => {
    expect(filterPackages(all, { query: "bali" })).toHaveLength(
      filterPackages(all, { query: "BALI" }).length,
    );

    expect(filterPackages(all, { query: "bali turki" })).toHaveLength(0);
  });

  it("mengembalikan array kosong saat tidak ada yang cocok", () => {
    expect(filterPackages(all, { destination: "Antartika" })).toHaveLength(0);
  });

  it("mengurutkan berdasarkan harga tanpa mengubah array sumber", () => {
    const original = [...all];
    const sorted = filterPackages(all, {}, "price-asc");

    expect(sorted[0].priceFrom).toBeLessThanOrEqual(
      sorted[sorted.length - 1].priceFrom,
    );
    expect(all).toEqual(original);
  });
});

describe("getDestinations", () => {
  it("mengembalikan destinasi unik dan terurut", () => {
    const destinations = getDestinations();

    expect(new Set(destinations).size).toBe(destinations.length);
    expect([...destinations].sort((a, b) => a.localeCompare(b, "id"))).toEqual(
      destinations,
    );
  });

  it("membatasi destinasi sesuai region", () => {
    const domestic = getDestinations("dalam-negeri");

    expect(domestic).not.toContain("Turki");
  });
});

describe("getFeaturedPackages", () => {
  it("mengisi kekurangan dengan paket lain agar jumlahnya selalu terpenuhi", () => {
    expect(getFeaturedPackages(5)).toHaveLength(Math.min(5, all.length));
  });

  it("menempatkan paket unggulan lebih dulu", () => {
    const featured = getFeaturedPackages(all.length);
    const lastFeaturedIndex = featured.findLastIndex((pkg) => pkg.featured);
    const firstNonFeaturedIndex = featured.findIndex((pkg) => !pkg.featured);

    if (firstNonFeaturedIndex !== -1) {
      expect(lastFeaturedIndex).toBeLessThan(firstNonFeaturedIndex);
    }
  });
});

describe("getRelatedPackages", () => {
  it("tidak pernah menyertakan paket itu sendiri", () => {
    const current = all[0];
    const related = getRelatedPackages(current);

    expect(related.map((pkg) => pkg.slug)).not.toContain(current.slug);
  });

  it("mendahulukan paket dengan region yang sama", () => {
    const current = getPackagesByRegion("luar-negeri")[0];
    const related = getRelatedPackages(current, 2);

    expect(related[0].region).toBe("luar-negeri");
  });
});
