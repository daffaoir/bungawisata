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
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
    ];
  },
  images: {
    // Foto dilayani dari `public/` (lihat `src/content/images.ts`). AVIF
    // lebih kecil daripada WebP; browser lama tetap mendapat WebP/JPEG.
    formats: ["image/avif", "image/webp"],
    // Batas atas 1920: sumber foto hanya 1600px, jadi varian 2048/3840
    // hanya pembesaran yang membuang kuota.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
