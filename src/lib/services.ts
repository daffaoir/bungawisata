import { serviceList } from "@/content/services";
import type { AppLocale } from "@/i18n/routing";
import { serviceSchema, type Service } from "./content-schema";
import { getPackageBySlug } from "./packages";
import type { Package } from "./schema";

/**
 * Divalidasi sekali saat modul dimuat; data yang salah bentuk atau merujuk
 * paket yang tidak ada menggagalkan build.
 */
const services: Service[] = serviceList.map((input) => {
  const result = serviceSchema.safeParse(input);
  if (!result.success) {
    throw new Error(
      `Layanan "${(input as { slug?: string }).slug}" tidak valid:\n${result.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  for (const slug of result.data.relatedPackages) {
    if (!getPackageBySlug(slug)) {
      throw new Error(
        `Layanan "${result.data.slug}" merujuk paket "${slug}" yang tidak ada.`,
      );
    }
  }

  return result.data;
});

const duplicate = services
  .map((service) => service.slug)
  .find((slug, index, all) => all.indexOf(slug) !== index);
if (duplicate) throw new Error(`Slug layanan duplikat: "${duplicate}"`);

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceRelatedPackages(service: Service): Package[] {
  return service.relatedPackages.flatMap((slug) => {
    const pkg = getPackageBySlug(slug);
    return pkg ? [pkg] : [];
  });
}

/** Semua teks satu bahasa — untuk tes panjang konten. */
export function serviceTexts(service: Service, locale: AppLocale): string[] {
  const c = service.content[locale];
  return [
    c.title,
    ...c.intro,
    ...c.suitableFor,
    ...c.weHandle,
    ...c.steps.flatMap((step) => [step.title, step.text]),
    ...service.faq.flatMap((item) => [item.question[locale], item.answer[locale]]),
  ];
}
