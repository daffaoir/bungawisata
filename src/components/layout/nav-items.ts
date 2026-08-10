import type { StaticAppPathname } from "@/i18n/routing";

/**
 * Sumber tunggal daftar navigasi — dipakai header desktop, menu mobile,
 * dan footer. `key` merujuk ke namespace `Nav` di file terjemahan.
 */
/**
 * Testimoni sengaja tidak punya menu sendiri — cukup tampil di beranda lewat
 * `TestimonialStrip`. Halaman `/testimoni` tetap ada dan tetap bisa diakses
 * lewat tautan "Lihat semua testimoni" di beranda, hanya tidak didaftarkan
 * di sini supaya tidak muncul di navbar maupun footer.
 */
export const NAV_ITEMS: ReadonlyArray<{
  href: StaticAppPathname;
  key: string;
}> = [
  { href: "/", key: "home" },
  { href: "/paket", key: "packages" },
  { href: "/tentang-kami", key: "about" },
  { href: "/galeri", key: "gallery" },
  { href: "/kontak", key: "contact" },
];
