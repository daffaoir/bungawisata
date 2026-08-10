import { defineRouting } from "next-intl/routing";

/**
 * Bahasa Indonesia adalah default dan tampil tanpa prefix (`/paket`),
 * sedangkan Inggris selalu berprefix (`/en/packages`).
 *
 * Kunci pada `pathnames` adalah path internal — harus sama persis dengan
 * struktur folder di `src/app/[locale]/`. Nilainya adalah path yang terlihat
 * di browser untuk tiap bahasa.
 */
export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "as-needed",
  /**
   * Tanpa ini, pengunjung dengan browser berbahasa Inggris otomatis dialihkan
   * dari `/` ke `/en` — termasuk perayap mesin pencari, sehingga halaman utama
   * berbahasa Indonesia sulit terindeks. Pilihan bahasa kini sepenuhnya di
   * tangan pengunjung lewat pengalih bahasa (yang tetap disimpan di cookie).
   */
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/paket": { id: "/paket", en: "/packages" },
    "/paket/[slug]": { id: "/paket/[slug]", en: "/packages/[slug]" },
    "/tentang-kami": { id: "/tentang-kami", en: "/about" },
    "/galeri": { id: "/galeri", en: "/gallery" },
    "/testimoni": { id: "/testimoni", en: "/testimonials" },
    "/kontak": { id: "/kontak", en: "/contact" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

/**
 * Path tanpa segmen dinamis — aman dipakai `<Link href={…}>` tanpa `params`.
 * Dipakai oleh menu navigasi, yang isinya hanya halaman statis.
 */
export type StaticAppPathname = Exclude<AppPathname, `${string}[${string}`>;
