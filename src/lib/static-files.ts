import type { AppLocale } from "@/i18n/routing";

/**
 * Berkas yang dibuat `scripts/generate-static-files.mts` sebelum `next build`
 * dan `next dev`, lalu dilayani apa adanya dari `public/`.
 *
 * PDF itinerary dan gambar Open Graph sengaja tidak dirender oleh server:
 * pustaka pembuatnya (@react-pdf, resvg) membuat bundle Cloudflare Worker
 * melewati batas 3 MB free plan. Path di sini dipakai bersama oleh script
 * dan komponen, jadi tautan dan berkasnya tidak bisa berselisih.
 */

/** Folder keluaran di bawah `public/`, juga dipakai `.gitignore`. */
export const ITINERARY_DIR = "itinerary";
export const OG_DIR = "og";

export function itineraryPdfPath(locale: AppLocale, slug: string): string {
  return `/${ITINERARY_DIR}/${locale}/${slug}.pdf`;
}

export function ogImagePath(locale: AppLocale): string {
  return `/${OG_DIR}/${locale}.png`;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
