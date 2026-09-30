import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Header keamanan dasar untuk semua respons. CSP penuh sengaja tidak
 * dipasang: JSON-LD inline dan skrip Next tanpa nonce akan terblokir. Cukup
 * `frame-ancestors` supaya situs tidak bisa dibingkai situs lain.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  /**
   * Bahasa Indonesia tampil tanpa prefix. Middleware next-intl sudah
   * mengalihkan `/id/...`, tapi dengan 307 (sementara); di sini dibuat 308
   * supaya mesin pencari memindahkan sinyalnya ke URL tanpa prefix.
   * `redirects` dijalankan sebelum proxy, jadi tidak bentrok dengan rewrite
   * internal next-intl.
   */
  async redirects() {
    return [
      // Gambar OG dulu route `[locale]/opengraph-image`; sekarang berkas
      // statis. Harus di atas aturan `/id/:path*`.
      {
        source: "/:locale(id|en)/opengraph-image",
        destination: "/og/:locale.png",
        permanent: true,
      },
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
      // PDF itinerary dulu dirender route `/api/itinerary/...`; sekarang
      // berkas statis (lihat `src/lib/static-files.ts`). Tautan lama yang
      // sudah dibagikan tetap sampai.
      {
        source: "/api/itinerary/:locale(id|en)/:slug",
        destination: "/itinerary/:locale/:slug.pdf",
        permanent: true,
      },
    ];
  },
  images: {
    // Foto dilayani dari `public/` (lihat `src/content/images.ts`). Di
    // Cloudflare, OpenNext mengoptimasi lewat binding `IMAGES` (Cloudflare
    // Images, free 5.000 transformasi unik/bulan). Hanya
    // WebP: AVIF pada kualitas yang sama tampak lebih lembut (detail foto
    // lanskap hilang); browser lama tetap mendapat JPEG.
    formats: ["image/webp"],
    // Sumber foto stok lebarnya 2560px, jadi batas atas 2560; varian 3840
    // hanya pembesaran yang membuang kuota.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    // Wajib sejak Next 16. 75 = default, 85 = foto besar (hero/galeri).
    qualities: [75, 85],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
