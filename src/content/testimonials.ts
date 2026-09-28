import type { AppLocale } from "@/i18n/routing";

export type Testimonial = {
  id: string;
  /** Nama depan + inisial, sesuai yang tampil publik di Google. */
  name: string;
  source: "google";
  /** Waktu relatif seperti yang tampil di Google saat dikutip. */
  when: Record<AppLocale, string>;
  rating: 1 | 2 | 3 | 4 | 5;
  /**
   * Kutipan asli berbahasa Indonesia (ejaan dirapikan ringan tanpa mengubah
   * makna). Versi EN adalah terjemahan dan ditandai begitu di UI.
   */
  quote: Record<AppLocale, string>;
};

/**
 * Kutipan ulasan publik di profil Google "Bunga Wisata Tour and Travel",
 * diambil 2026-09-28 (lihat docs/interviews/2026-09-28-seo-domain.md).
 * Jangan menambah testimoni yang tidak punya sumber nyata.
 */
export const testimonials: Testimonial[] = [
  {
    id: "google-aristi",
    name: "Aristi V. F.",
    source: "google",
    when: { id: "setahun lalu", en: "a year ago" },
    rating: 5,
    quote: {
      id: "Pelayanannya bagus banget, makanan enak, crew-nya on time, harga terjangkau. Bisnya juga bagus-bagus.",
      en: "Really great service, good food, the crew was on time and the price was affordable. The buses were great too.",
    },
  },
  {
    id: "google-n",
    name: "N.",
    source: "google",
    when: { id: "setahun lalu", en: "a year ago" },
    rating: 5,
    quote: {
      id: "Mantap banget pelayanannya, crew ramah-ramah, sangat dijamu saat tour. Obyek wisatanya juga bagus dan terupdate. Harga tour terjangkau dengan fasilitas yang didapat. Rekomen buat yang mau tour atau event.",
      en: "Excellent service, friendly crew, and we were really well looked after on the tour. The sights were great and up to date, and the price was very fair for what we got. Recommended for tours or events.",
    },
  },
  {
    id: "google-intan",
    name: "Intan N. A.",
    source: "google",
    when: { id: "setahun lalu", en: "a year ago" },
    rating: 5,
    quote: {
      id: "Senang banget sama TL-nya, pelayanannya juga bagus banget, harganya terjangkau.",
      en: "Loved our tour leaders. The service was really good and the price was affordable.",
    },
  },
  {
    id: "google-ilham",
    name: "Muhammad Ilham M.",
    source: "google",
    when: { id: "5 tahun lalu", en: "5 years ago" },
    rating: 5,
    quote: {
      id: "Recommended, harganya terjangkau dan pelayanannya memuaskan.",
      en: "Recommended: affordable prices and satisfying service.",
    },
  },
];
