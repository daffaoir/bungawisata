import { describe, expect, it } from "vitest";
import { formatPrice, formatPriceCompact } from "./format";

describe("formatPrice", () => {
  it("memakai pemisah ribuan Indonesia dan tanpa desimal", () => {
    const result = formatPrice(24_500_000, "id");

    expect(result).toContain("24.500.000");
    expect(result).toContain("Rp");
    expect(result).not.toContain(",00");
  });

  it("memakai pemisah ribuan Inggris", () => {
    expect(formatPrice(24_500_000, "en")).toContain("24,500,000");
  });

  it("tidak menyisakan non-breaking space yang menyulitkan pencocokan teks", () => {
    expect(formatPrice(4_850_000, "id")).not.toContain(" ");
  });
});

describe("formatPriceCompact", () => {
  it("membulatkan ke satu angka desimal dalam jutaan", () => {
    expect(formatPriceCompact(24_500_000, "id")).toBe("Rp 24,5 jt");
    expect(formatPriceCompact(4_850_000, "id")).toBe("Rp 4,9 jt");
  });

  it("memakai format Inggris untuk locale en", () => {
    expect(formatPriceCompact(24_500_000, "en")).toBe("IDR 24.5M");
  });

  it("menghilangkan desimal untuk angka bulat", () => {
    expect(formatPriceCompact(19_000_000, "id")).toBe("Rp 19 jt");
  });
});
