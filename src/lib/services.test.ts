import { describe, expect, it } from "vitest";
import { countWords } from "./content-schema";
import { getAllServices, serviceTexts } from "./services";
import { TITLE_SUFFIX } from "./seo";

const SLUGS = [
  "tour-rombongan",
  "study-tour",
  "gathering-event",
  "private-tour",
  "tiket-pesawat",
];

describe("layanan", () => {
  const services = getAllServices();

  it("memuat kelima layanan sesuai urutan", () => {
    expect(services.map((s) => s.slug)).toEqual(SLUGS);
  });

  it.each(services.map((s) => [s.slug, s] as const))(
    "%s: konten ID & EN cukup panjang dan judulnya muat",
    (_slug, service) => {
      for (const locale of ["id", "en"] as const) {
        expect(countWords(serviceTexts(service, locale))).toBeGreaterThanOrEqual(450);
        expect((service.content[locale].metaTitle + TITLE_SUFFIX).length).toBeLessThanOrEqual(65);
        expect(service.content[locale].title).toMatch(/Malang/);
      }
    },
  );

  it("teks tidak memuat klaim angka karangan", () => {
    const all = JSON.stringify(services);
    expect(all).not.toMatch(/\b(sejak|since) (19|20)\d\d\b/i);
    expect(all).not.toMatch(/\b\d{1,3}[.,]?\d{3}\+? (pelanggan|peserta|customers|travellers)/i);
  });
});
