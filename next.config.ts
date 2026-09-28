import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
    // Foto sementara diambil dari Unsplash — daftarnya terpusat di
    // `src/content/images.ts`. Setelah diganti dokumentasi asli di
    // `public/images/`, blok ini boleh dihapus.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
