import type { AppLocale } from "@/i18n/routing";
import type { Package } from "@/lib/schema";

/** Akhiran yang ditambahkan `title.template` di layout. */
export const TITLE_SUFFIX = " | Bunga Wisata";

const DURATION_SUFFIX = /\s+\d+\s+(Hari|Days?)\s+\d+\s+(Malam|Nights?)\s*$/i;

/**
 * Judul `<title>` halaman paket, dibentuk untuk kata kunci pencarian lokal
 * ("paket tour … dari Malang"). Durasi disingkat supaya judul tidak
 * terpotong di hasil Google.
 */
export function packageMetaTitle(pkg: Package, locale: AppLocale): string {
  // "Jepang: Tokyo – Fuji – …" cukup "Jepang" supaya judul tidak terpotong.
  const name = pkg.content[locale].title
    .replace(DURATION_SUFFIX, "")
    .split(":")[0]
    .trim();
  const d = pkg.durationDays;
  const n = pkg.durationNights;

  return locale === "id"
    ? `Paket Tour ${name} ${d}H${n}M dari Malang`
    : `${name} ${d}D${n}N Tour from Malang`;
}
