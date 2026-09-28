import { describe, expect, it } from "vitest";
import { getAllPackages } from "@/lib/packages";

/**
 * `summary` dipakai sebagai meta description halaman detail paket. Google
 * memotong di sekitar 155–160 karakter, dan deskripsi yang sama persis di
 * beberapa halaman dianggap duplikat — jadi panjang dan keunikannya dijaga.
 */
const MIN = 100;
const MAX = 170;
const LOCALES = ["id", "en"] as const;

describe("package summaries (meta description)", () => {
  const packages = getAllPackages();

  for (const pkg of packages) {
    for (const locale of LOCALES) {
      it(`${pkg.slug} [${locale}] is ${MIN}–${MAX} characters`, () => {
        const { length } = pkg.content[locale].summary;
        expect(length).toBeGreaterThanOrEqual(MIN);
        expect(length).toBeLessThanOrEqual(MAX);
      });
    }
  }

  it("has no duplicate summaries across packages and locales", () => {
    const summaries = packages.flatMap((pkg) =>
      LOCALES.map((locale) => pkg.content[locale].summary.trim()),
    );
    const duplicates = summaries.filter(
      (summary, index) => summaries.indexOf(summary) !== index,
    );
    expect(duplicates).toEqual([]);
  });
});
