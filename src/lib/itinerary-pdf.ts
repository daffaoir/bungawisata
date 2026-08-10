import type { AppLocale } from "@/i18n/routing";
import type { Meal, Package } from "@/lib/schema";

/**
 * Pembantu murni untuk PDF itinerary — dipisah dari komponen @react-pdf
 * supaya bisa diuji tanpa merender dokumen apa pun.
 */

/**
 * Kode makan pada lembar itinerary. Versi Indonesia memakai singkatan yang
 * lazim di industri (Mp/Ms/Mm); versi Inggris memakai B/L/D.
 */
const MEAL_CODES: Record<AppLocale, Record<Meal, string>> = {
  id: { breakfast: "Mp", lunch: "Ms", dinner: "Mm" },
  en: { breakfast: "B", lunch: "L", dinner: "D" },
};

/**
 * Huruf yang tidak punya bentuk terurai (NFD) sehingga harus dipetakan manual.
 * Daftarnya sengaja pendek — hanya yang benar-benar muncul di data kita atau
 * yang lazim di nama tempat Eropa.
 */
const PDF_FALLBACKS: Record<string, string> = {
  ı: "i",
  İ: "I",
  ł: "l",
  Ł: "L",
  đ: "d",
  Đ: "D",
  ħ: "h",
  ŧ: "t",
  ə: "e",
};

/**
 * Cek kasar apakah sebuah karakter ada di encoding WinAnsi.
 *
 * Latin-1 (0x20–0x7E dan 0xA0–0xFF) seluruhnya ada, ditambah sejumlah tanda
 * baca tipografis yang WinAnsi taruh di 0x80–0x9F.
 */
const WINANSI_EXTRAS = new Set([
  "€", "‚", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Œ", "Ž",
  "‘", "’", "“", "”", "•", "–", "—", "˜", "™", "š", "›", "œ", "ž", "Ÿ",
]);

function isWinAnsi(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  if (code >= 0x20 && code <= 0x7e) return true;
  if (code >= 0xa0 && code <= 0xff) return true;
  return WINANSI_EXTRAS.has(char);
}

/**
 * Menyiapkan teks agar aman dirender dengan Helvetica bawaan PDF.
 *
 * @react-pdf memakai encoding WinAnsi untuk font standar, dan karakter di
 * luar tabel itu **hilang tanpa peringatan** — bukan diganti kotak. Jadi
 * "Kuşadası" akan tampil sebagai "Kuadas" kalau tidak ditangani. Di sini
 * hurufnya diuraikan lebih dulu (ş → s + cedilla, lalu tanda cedilla dibuang),
 * dan sisanya dipetakan lewat `PDF_FALLBACKS`.
 *
 * Situsnya sendiri tetap menampilkan ejaan aslinya — penyederhanaan ini hanya
 * berlaku di dalam PDF.
 */
export function toPdfText(value: string): string {
  return [...value]
    .map((char) => {
      if (isWinAnsi(char)) return char;
      if (PDF_FALLBACKS[char]) return PDF_FALLBACKS[char];

      // Buang tanda diakritik: "ş" → "s", "ğ" → "g".
      const stripped = char.normalize("NFD").replace(/\p{M}/gu, "");
      if (stripped && [...stripped].every(isWinAnsi)) return stripped;

      return "";
    })
    .join("");
}

/** `["breakfast", "dinner"]` → `"Mp-Mm"`; daftar kosong → string kosong. */
export function formatMealCodes(meals: Meal[], locale: AppLocale): string {
  return meals.map((meal) => MEAL_CODES[locale][meal]).join("-");
}

/** `4` hari `3` malam → `"4H3M"` (id) atau `"4D3N"` (en). */
export function formatDurationCode(
  days: number,
  nights: number,
  locale: AppLocale,
): string {
  return locale === "id" ? `${days}H${nights}M` : `${days}D${nights}N`;
}

/**
 * Nama berkas unduhan, mis. `Bunga Wisata - Bangkok Pattaya 4H3M.pdf`.
 *
 * Diturunkan dari slug, bukan dari judul, karena judul mengandung tanda pisah
 * en dash dan koma yang tidak nyaman dipakai sebagai nama berkas di Windows.
 */
export function buildItineraryFilename(
  pkg: Pick<Package, "slug" | "durationDays" | "durationNights">,
  locale: AppLocale,
): string {
  const name = pkg.slug
    // Buang penanda durasi di ujung slug (`-4d3n`); durasinya ditulis ulang
    // di bawah mengikuti bahasa yang diminta.
    .replace(/-\d+d\d+n$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const duration = formatDurationCode(
    pkg.durationDays,
    pkg.durationNights,
    locale,
  );

  return `Bunga Wisata - ${name} ${duration}.pdf`;
}

/**
 * Nilai untuk header `Content-Disposition`.
 *
 * Nama berkasnya mengandung spasi, jadi versi ASCII harus dikutip. `filename*`
 * ditambahkan sesuai RFC 5987 agar peramban yang mendukungnya memakai nama
 * dengan karakter non-ASCII secara utuh.
 */
export function buildContentDisposition(filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");

  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
