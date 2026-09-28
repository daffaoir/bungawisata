import { describe, expect, it } from "vitest";
import { countWords } from "./content-schema";
import { getAllGuides, guideTexts } from "./guides";
import { TITLE_SUFFIX } from "./seo";

describe("panduan", () => {
  const guides = getAllGuides();

  it("memuat empat artikel", () => {
    expect(guides).toHaveLength(4);
  });

  it.each(guides.map((g) => [g.slug, g] as const))(
    "%s: artikel ID & EN cukup panjang, tanggal wajar, judul muat",
    (_slug, guide) => {
      expect(guide.updatedAt >= guide.publishedAt).toBe(true);
      for (const locale of ["id", "en"] as const) {
        expect(countWords(guideTexts(guide, locale))).toBeGreaterThanOrEqual(700);
        expect((guide.content[locale].metaTitle + TITLE_SUFFIX).length).toBeLessThanOrEqual(65);
      }
    },
  );
});
