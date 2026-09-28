import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import id from "@/messages/id.json";
import { getAllPackages } from "@/lib/packages";
import { TITLE_SUFFIX, packageMetaTitle } from "@/lib/seo";

const messages = { id, en } as const;
const MAX_TITLE = 65;

/** Semua namespace yang punya `metaDescription` + judul halamannya. */
function pageMeta(dict: Record<string, unknown>) {
  return Object.entries(dict).flatMap(([ns, value]) => {
    if (!value || typeof value !== "object") return [];
    const v = value as Record<string, unknown>;
    if (typeof v.metaDescription !== "string") return [];
    const title = (v.metaTitle ?? v.title) as string;
    return [{ ns, title: title + TITLE_SUFFIX, description: v.metaDescription }];
  });
}

describe.each(["id", "en"] as const)("SEO copy (%s)", (locale) => {
  const dict = messages[locale] as unknown as Record<string, unknown>;
  const meta = dict.Meta as Record<string, string>;

  it("judul & deskripsi default memuat Malang dan panjangnya wajar", () => {
    expect(meta.defaultTitle).toMatch(/Malang/);
    expect(meta.defaultTitle.length).toBeLessThanOrEqual(MAX_TITLE);
    expect(meta.defaultDescription).toMatch(/Malang/);
    expect(meta.defaultDescription.length).toBeGreaterThanOrEqual(110);
    expect(meta.defaultDescription.length).toBeLessThanOrEqual(165);
  });

  it.each(pageMeta(dict).map((m) => [m.ns, m] as const))(
    "%s: title ≤ 65 dan description 110–165 karakter",
    (_ns, m) => {
      expect(m.title.length).toBeLessThanOrEqual(MAX_TITLE);
      expect(m.description.length).toBeGreaterThanOrEqual(110);
      expect(m.description.length).toBeLessThanOrEqual(165);
    },
  );

  it("judul paket memuat 'Malang' dan tidak terlalu panjang", () => {
    for (const pkg of getAllPackages()) {
      const title = packageMetaTitle(pkg, locale) + TITLE_SUFFIX;
      expect(title).toMatch(/Malang/);
      expect(title.length).toBeLessThanOrEqual(MAX_TITLE);
    }
  });
});
