import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Semua halaman dibuat statis saat build dan tidak ada revalidasi, jadi cache
 * cukup dibaca dari Static Assets (tanpa R2/KV). `enableCacheInterception`
 * melayani halaman prerender sebelum kode Next dimuat, sehingga CPU per
 * request tetap jauh di bawah batas 10 ms free plan.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
