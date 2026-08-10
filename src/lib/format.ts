import type { AppLocale } from "@/i18n/routing";

const INTL_LOCALE: Record<AppLocale, string> = {
  id: "id-ID",
  en: "en-US",
};

/** Rp 24.500.000 (id) / IDR 24,500,000 (en) */
export function formatPrice(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    // Intl menyisipkan NBSP setelah simbol; ganti dengan spasi biasa agar
    // pemenggalan baris dan pencocokan teks di test tidak mengejutkan.
    .replace(/ /g, " ");
}

/** Versi ringkas untuk kartu: Rp 24,5 jt / IDR 24.5M */
export function formatPriceCompact(value: number, locale: AppLocale): string {
  const millions = value / 1_000_000;
  const rounded = Math.round(millions * 10) / 10;
  const number = new Intl.NumberFormat(INTL_LOCALE[locale], {
    maximumFractionDigits: 1,
  }).format(rounded);

  return locale === "id" ? `Rp ${number} jt` : `IDR ${number}M`;
}
