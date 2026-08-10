import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
