import { z } from "zod";

/**
 * Schema halaman layanan (`/layanan/[slug]`) dan artikel panduan
 * (`/panduan/[slug]`). Divalidasi saat build — data yang salah bentuk
 * menggagalkan `npm run build`, bukan tayang bolong.
 */

const nonEmpty = z.string().trim().min(1);
const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug hanya huruf kecil, angka, tanda hubung");

/** Teks dua bahasa. */
const localized = z.object({ id: nonEmpty, en: nonEmpty });

/** Sama bentuknya dengan `FaqItem` di `src/content/faq.ts`. */
const faqItemSchema = z.object({
  id: slug,
  question: localized,
  answer: localized,
});

// ── Layanan ─────────────────────────────────────────────────────────────

const serviceContentSchema = z.object({
  /** Nama pendek untuk kartu, menu, dan breadcrumb, mis. "Tour Rombongan". */
  name: nonEmpty,
  /** H1 berkata kunci, mis. "Tour Rombongan dari Malang". */
  title: nonEmpty,
  /** `<title>` sebelum akhiran " — Bunga Wisata" (maks. 50 karakter). */
  metaTitle: nonEmpty.max(50),
  /** Meta description, 110–165 karakter. */
  metaDescription: nonEmpty.min(110).max(165),
  /** Teks kartu di beranda & `/layanan`, dan subjudul header. */
  summary: nonEmpty.min(60).max(200),
  /** 2–3 paragraf pembuka. */
  intro: z.array(nonEmpty).min(2).max(3),
  suitableForTitle: nonEmpty,
  suitableFor: z.array(nonEmpty).min(3).max(8),
  weHandleTitle: nonEmpty,
  weHandle: z.array(nonEmpty).min(4).max(10),
  /** Alur pemesanan, tepat 4 langkah. */
  steps: z.array(z.object({ title: nonEmpty, text: nonEmpty })).length(4),
});

export const serviceSchema = z.object({
  slug,
  /** Kunci ikon lucide yang didukung `ServiceIcon`. */
  icon: z.enum(["users", "graduation-cap", "party-popper", "heart", "plane"]),
  /** Path foto dari `images` (`src/content/images.ts`). */
  heroImage: nonEmpty,
  /** Slug paket terkait (maks. 3); divalidasi ada di `lib/services.ts`. */
  relatedPackages: z.array(slug).max(3).default([]),
  /** Pesan pembuka WhatsApp yang sudah terisi. */
  whatsappMessage: localized,
  faq: z.array(faqItemSchema).min(4).max(6),
  content: z.object({
    id: serviceContentSchema,
    en: serviceContentSchema,
  }),
});

export type ServiceInput = z.input<typeof serviceSchema>;
export type Service = z.output<typeof serviceSchema>;
export type ServiceIconName = Service["icon"];

// ── Panduan ─────────────────────────────────────────────────────────────

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "format YYYY-MM-DD");

const guideSectionSchema = z.object({
  heading: nonEmpty,
  paragraphs: z.array(nonEmpty).min(1),
  /** Daftar poin opsional setelah paragraf. */
  list: z.array(nonEmpty).optional(),
});

const guideContentSchema = z.object({
  /** H1 artikel. */
  title: nonEmpty,
  metaTitle: nonEmpty.max(50),
  metaDescription: nonEmpty.min(110).max(165),
  /** Ringkasan untuk kartu di `/panduan` dan lead artikel. */
  excerpt: nonEmpty.min(80).max(240),
  sections: z.array(guideSectionSchema).min(4),
});

export const guideSchema = z.object({
  slug,
  heroImage: nonEmpty,
  publishedAt: isoDate,
  updatedAt: isoDate,
  relatedPackages: z.array(slug).max(3).default([]),
  relatedServices: z.array(slug).max(3).default([]),
  content: z.object({
    id: guideContentSchema,
    en: guideContentSchema,
  }),
});

export type GuideInput = z.input<typeof guideSchema>;
export type Guide = z.output<typeof guideSchema>;

/** Jumlah kata seluruh teks satu bahasa — dipakai tes panjang konten. */
export function countWords(texts: ReadonlyArray<string>): number {
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}
