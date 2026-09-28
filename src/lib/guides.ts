import { guideList } from "@/content/guides";
import type { AppLocale } from "@/i18n/routing";
import { guideSchema, type Guide } from "./content-schema";
import { getPackageBySlug } from "./packages";
import { getServiceBySlug } from "./services";

/**
 * Divalidasi sekali saat modul dimuat; data yang salah bentuk atau merujuk
 * paket/layanan yang tidak ada menggagalkan build.
 */
const guides: Guide[] = guideList
  .map((input) => {
    const result = guideSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        `Panduan "${(input as { slug?: string }).slug}" tidak valid:\n${result.error.issues
          .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
          .join("\n")}`,
      );
    }

    const guide = result.data;
    for (const slug of guide.relatedPackages) {
      if (!getPackageBySlug(slug)) {
        throw new Error(`Panduan "${guide.slug}" merujuk paket "${slug}" yang tidak ada.`);
      }
    }
    for (const slug of guide.relatedServices) {
      if (!getServiceBySlug(slug)) {
        throw new Error(`Panduan "${guide.slug}" merujuk layanan "${slug}" yang tidak ada.`);
      }
    }

    return guide;
  })
  // Terbaru di atas.
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const duplicate = guides
  .map((guide) => guide.slug)
  .find((slug, index, all) => all.indexOf(slug) !== index);
if (duplicate) throw new Error(`Slug panduan duplikat: "${duplicate}"`);

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

/** Semua teks satu bahasa — untuk tes panjang konten. */
export function guideTexts(guide: Guide, locale: AppLocale): string[] {
  const c = guide.content[locale];
  return [
    c.title,
    c.excerpt,
    ...c.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.list ?? []),
    ]),
  ];
}
