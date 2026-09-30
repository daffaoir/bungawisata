# Plan: pindah situs ke Cloudflare Workers (free plan)

Tanggal: 2026-09-30. Branch: `rio/nifty-babbage-5592a0`.

## Latar

- Vercel Hobby: storage tim `daffaoirs-projects` 100% dari 10 GB; tiap deploy bungawisata ±67 MB (foto stok 2560px). Hobby juga non-komersial.
- Cloudflare free plan boleh komersial; zone `bungawisata.co.id` sudah di Cloudflare DNS (A `@` dan CNAME `www` ke Vercel, DNS only).

## Hasil spike (build OpenNext di worktree)

- `@opennextjs/cloudflare@1.20.7` (peer: next >=16.3.6, wrangler ^4.125) + `wrangler@4.144.0` build dan jalan lokal (`opennextjs-cloudflare preview`).
- `proxy.ts` next-intl berjalan (dukungan Node middleware OpenNext berlabel experimental): `/id/*` → 308, `/en/paket` → `/en/packages`, 404 bermerek.
- Incremental cache `static-assets` + `enableCacheInterception`: halaman SSG dilayani dari aset (`x-opennext-cache: HIT`), jadi CPU per request kecil (batas free 10 ms).
- Bundle Worker (gzip, `wrangler deploy --dry-run`): sekarang **3.887 KiB**; tanpa route PDF 3.181 KiB; tanpa PDF dan `opengraph-image` **2.894 KiB**. Batas free **3.072 KiB** → PDF dan OG wajib jadi file statis.
- `opennextjs-cloudflare` butuh `esbuild` di root (`^0.28`, selaras vite).

## Keputusan (wawancara 2026-09-30)

1. PDF itinerary (28) dan OG image (2) dibuat oleh script prebuild ke `public/`, bukan oleh Worker.
2. Deploy: Cloudflare Workers Builds (repo GitHub terhubung di dashboard), production branch `master`.
3. Analytics: Cloudflare Web Analytics lewat snippet, dirender hanya bila `NEXT_PUBLIC_CF_BEACON_TOKEN` diisi. `@vercel/analytics` dihapus.
4. Vercel: setelah cutover terverifikasi, domain dilepas dan project dihapus **di hari yang sama** (konfirmasi sekali lagi sebelum hapus; dilakukan user).
5. `dashboard-bungawisata` di luar cakupan.

## Langkah kode

1. Dependensi: `@opennextjs/cloudflare`, dev `wrangler`, `esbuild`, `tsx`; hapus `@vercel/analytics`.
2. `wrangler.jsonc` (name `bungawisata`, `nodejs_compat`, assets `.open-next/assets`, `WORKER_SELF_REFERENCE`, `images` binding `IMAGES`), `open-next.config.ts` (static-assets incremental cache + cache interception), `.node-version` = 24.
3. Script `scripts/generate-static-files.mts` (dijalankan `tsx`): 28 PDF ke `public/itinerary/<locale>/<slug>.pdf` dan `public/og/<locale>.png` (1200x630, desain sama). Hook `prebuild` dan `predev`. Output di-`.gitignore`.
4. Hapus `src/app/api/itinerary/...` dan `src/app/[locale]/opengraph-image.tsx`. Layout mengisi `openGraph.images` / `twitter.images` ke `/og/<locale>.png`. `PriceBox` menaut ke `/itinerary/<locale>/<slug>.pdf` dengan `download="<nama berkas>"`. Redirect 308 `/api/itinerary/:locale/:slug` → PDF baru.
5. `public/_headers`: cache immutable `/_next/static/*` + header keamanan untuk aset statis.
6. Web Analytics snippet di layout (bersyarat env). `.env.example` dan README diperbarui; `.vercelignore` dihapus.
7. Script npm: `preview`, `deploy`, `upload`, `cf:size` (cek gzip ≤ 3.072 KiB lewat `wrangler deploy --dry-run`). CI: langkah Build memakai `opennextjs-cloudflare build` lalu cek ukuran.
8. `.gitignore`: `.open-next`, `.wrangler`, `.dev.vars*`, output generate.

## Langkah dashboard (user, setelah merge ke master) — dirinci di chat

A. Cloudflare → Web Analytics → tambah situs `bungawisata.co.id` → salin token.
B. Cloudflare → Workers & Pages → Create → Import repository `daffaoir/bungawisata`, nama `bungawisata`, build/deploy command, build variables.
C. Verifikasi di `*.workers.dev` (Claude).
D. Cutover: Worker → Domains & Routes → custom domain apex; `www` proxied + Redirect Rule 308 ke apex.
E. Verifikasi di domain (Claude), lalu Vercel: lepas domain → hapus project.

## Acceptance checklist

- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` exit 0.
- [ ] `npx opennextjs-cloudflare build` exit 0 dan `npm run cf:size` melaporkan gzip ≤ 3.072 KiB.
- [ ] Worker bundle tidak memuat `@react-pdf` maupun `resvg.wasm`.
- [ ] `public/itinerary/{id,en}/*.pdf` = 28 berkas PDF valid (`%PDF`), `public/og/{id,en}.png` 1200x630.
- [ ] Preview lokal (`opennextjs-cloudflare preview`): `/`, `/en`, `/paket`, `/paket/bali-4d3n`, `/en/packages/bali-4d3n`, `/layanan`, `/layanan/<slug>`, `/galeri`, `/testimoni`, `/tentang-kami`, `/kontak`, `/panduan`, `/panduan/<slug>` → 200; halaman acak → 404 bermerek; `/id/paket` → 308 `/paket`; `sitemap.xml`, `robots.txt` → 200.
- [ ] Tombol unduh PDF di detail paket mengunduh PDF dengan nama `Bunga Wisata - ... .pdf`; `/api/itinerary/id/bali-4d3n` → 308 ke PDF baru.
- [ ] `og:image` di `/` dan `/en` menunjuk `/og/<locale>.png` absolut dan berkasnya 200 image/png.
- [ ] `/_next/image?...` mengembalikan gambar (lokal); tidak ada error di console.
- [ ] Tidak ada referensi `@vercel/analytics`/`_vercel` tersisa; beacon Cloudflare dirender hanya bila token ada.
- [ ] Tampilan `/` dan `/en` di 1280px dan 375px sama seperti sebelumnya.
- [ ] (setelah dashboard) `*.workers.dev` dan lalu `https://bungawisata.co.id` lolos daftar halaman di atas; `www` → 308 apex; header `server: cloudflare`.
