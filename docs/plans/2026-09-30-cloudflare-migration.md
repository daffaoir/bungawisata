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

- [x] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` exit 0.
- [x] `npx opennextjs-cloudflare build` exit 0 dan `npm run cf:size` melaporkan gzip ≤ 3.072 KiB.
  - Tester tidak menjalankan `opennextjs-cloudflare build` (dilarang: preview :8787 memegang `.open-next`). `npm run cf:size` pada `.open-next` yang ada: exit 0, 2894 KiB. Bagian build dibuktikan sesi utama: `opennextjs-cloudflare build` exit 0 (dua kali, sebelum dan sesudah redirect OG), `cf:size` 2894 KiB.
- [x] Worker bundle tidak memuat `@react-pdf` maupun `resvg.wasm`.
- [x] `public/itinerary/{id,en}/*.pdf` = 28 berkas PDF valid (`%PDF`), `public/og/{id,en}.png` 1200x630.
- [x] Preview lokal (`opennextjs-cloudflare preview`): `/`, `/en`, `/paket`, `/paket/bali-4d3n`, `/en/packages/bali-4d3n`, `/layanan`, `/layanan/<slug>`, `/galeri`, `/testimoni`, `/tentang-kami`, `/kontak`, `/panduan`, `/panduan/<slug>` → 200; halaman acak → 404 bermerek; `/id/paket` → 308 `/paket`; `sitemap.xml`, `robots.txt` → 200.
- [x] Tombol unduh PDF di detail paket mengunduh PDF dengan nama `Bunga Wisata - ... .pdf`; `/api/itinerary/id/bali-4d3n` → 308 ke PDF baru.
- [x] `og:image` di `/` dan `/en` menunjuk `/og/<locale>.png` absolut dan berkasnya 200 image/png.
- [x] `/_next/image?...` mengembalikan gambar (lokal); tidak ada error di console.
- [ ] Tidak ada referensi `@vercel/analytics`/`_vercel` tersisa; beacon Cloudflare dirender hanya bila token ada.
  - Tidak ada referensi tersisa (terverifikasi) dan beacon tidak dirender tanpa token (terverifikasi). Kasus "dengan token" hanya dicek lewat kode (`layout.tsx:108`), tidak di runtime: butuh build ulang dengan token. Bukan bug.
- [x] Tampilan `/` dan `/en` di 1280px dan 375px sama seperti sebelumnya.
- [x] (setelah dashboard) `*.workers.dev` dan lalu `https://bungawisata.co.id` lolos daftar halaman di atas; `www` → 308 apex; header `server: cloudflare`.
  - Diverifikasi sesi utama 2026-09-30/10-01, lihat "Cutover" di bawah.

## Verification

Tanggal: 2026-09-30. Tester, commit `7a67adf`, preview Workers `opennextjs-cloudflare preview` di http://localhost:8787 (sudah berjalan, dibangun sesi utama dengan `NEXT_PUBLIC_SITE_URL=https://bungawisata.co.id`; tidak dihentikan tester).

### Perintah Verify

| Perintah | Exit |
|---|---|
| `npm run lint` | 0 |
| `npx tsc --noEmit` | 0 |
| `npm test` | 0 (14 file, 135 test) |
| `npm run build` | 0 (prebuild: "28 PDF, 2 OG image (17204 ms)"; Next.js 16.3.7) |
| `npm run cf:size` | 0 ("Worker gzip 2894 KiB / batas 3072 KiB") |

### Acceptance

1. Verify commands: PASS (tabel di atas).
2. OpenNext build + ukuran: SEBAGIAN. `cf:size` PASS 2894 KiB; `opennextjs-cloudflare build` tidak dijalankan tester (instruksi), hanya bisa dipastikan bahwa `.open-next` yang ada melayani semua halaman.
3. Bundle: PASS. `handler.mjs.meta.json` 0 kecocokan `@react-pdf|fontkit|resvg`; tidak ada `*.wasm` di `.open-next/` sama sekali. Catatan: meta memuat 2 referensi `next/dist/compiled/@vercel/og/index.edge.js` (internal Next), tanpa wasm, ukuran tetap di bawah batas.
4. Berkas statis: PASS. 28 PDF, semua diawali `%PDF`; `public/og/id.png`, `en.png` = PNG 1200 x 630. Juga ada di `.open-next/assets/itinerary`, `.open-next/assets/og`.
5. Rute preview: PASS. 200 (`x-opennext-cache: HIT`): `/`, `/en`, `/paket`, `/en/packages`, `/paket/bali-4d3n`, `/en/packages/bali-4d3n`, `/layanan`, `/layanan/study-tour`, `/galeri`, `/testimoni`, `/tentang-kami`, `/kontak`, `/panduan`, `/panduan/bromo-dari-malang`, `/sitemap.xml` (application/xml), `/robots.txt` (text/plain, Sitemap `https://bungawisata.co.id/sitemap.xml`). `/halaman-acak-xyz` → 404 bermerek ("404" emas + "Halaman tidak ditemukan", sama dengan live). `/id/paket` → 308 `/paket`. Catatan: `/en/paket` → **307** `/en/packages` (perilaku next-intl; tidak ada di checklist).
6. Unduh PDF: PASS. Tombol di `/paket/bali-4d3n` dan `/en/packages/bali-4d3n` (1280 dan 375, juga ikon di bar bawah mobile 44x44) → `href=/itinerary/<locale>/bali-4d3n.pdf`, `download="Bunga Wisata - Bali 4H3M.pdf"` (id) / `"Bunga Wisata - Bali 4D3N.pdf"` (en); klik Playwright memicu download dengan nama itu, berkas 172058/172143 byte, `%PDF-` ... `%%EOF`. `/api/itinerary/id/bali-4d3n` → 308 `/itinerary/id/bali-4d3n.pdf` (200 application/pdf). Ekstra: `/id/opengraph-image` → 308 `/og/id.png`, `/en/opengraph-image` → 308 `/og/en.png`.
7. og:image: PASS. `/` → `https://bungawisata.co.id/og/id.png`, `/en` → `https://bungawisata.co.id/og/en.png` (og + twitter, 1200x630); `/og/id.png`, `/og/en.png` → 200 image/png.
8. `/_next/image`: PASS. `/_next/image?url=%2Flogo-mark.png&w=640&q=75` → 200 image/png 41814 B; semua `<img>` di halaman yang diuji tanpa gambar rusak. Console: tidak ada error kecuali log "Failed to load resource: 404" di halaman 404 (yang memang diharapkan).
9. Vercel analytics / beacon: SEBAGIAN (lihat catatan checklist). `git grep '@vercel/analytics|_vercel'` (tanpa docs) = tidak ada hasil; HTML `/` dan `/en` tanpa `cloudflareinsights`.
10. Tampilan: PASS. Tidak ada scroll horizontal (scrollWidth = clientWidth di 1280 dan 375); `home-id-desktop.png` identik tata letaknya dengan `live-home-id-desktop.png` (hanya foto hero rotasi berbeda).
11. workers.dev / domain produksi: belum bisa dites.

Screenshot (tidak di-commit, 25 MB; disimpan lokal di luar repo): `home-id-{desktop,mobile}.png`, `home-en-{desktop,mobile}.png`, `package-detail-{desktop,mobile}.png`, `package-detail-en-{desktop,mobile}.png`, `not-found-{desktop,mobile}.png`, `pdf-button-{desktop,mobile}.png`, `live-home-id-desktop.png` (pembanding live).

### Bug

Tidak ada bug yang ditemukan.

### Code review (`/code-review`, medium)

1 temuan: generator PDF tidak memuat berkas `.env*` (PDF memakai nomor/email cadangan). Diperbaiki di `7ce8112` dengan `loadEnvConfig` dari `@next/env` sebelum modul konten diimpor; dites dengan berkas env dummy.

## Cutover (2026-09-30 malam s.d. 2026-10-01)

- Workers Builds terhubung (Worker `bungawisata`, branch `master`, build variables `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CF_BEACON_TOKEN`). Build pertama antre ±11 menit di Initializing, lalu sukses.
- `bungawisata.daffarioalexandra.workers.dev`: semua rute 200/404/308 sesuai checklist, `x-opennext-cache: HIT`, beacon Web Analytics ada, foto WebP dengan lebar sesuai `w` (640→640, 2560→2560), tampilan 1280/375 sama.
- DNS: A `@` ke Vercel dihapus, Custom Domain Worker `bungawisata.co.id` ditambahkan. CNAME `www` → `bungawisata.co.id` (proxied) + Redirect Rule template "Redirect from WWW to root" (308, preserve query string). SSL/TLS **Always Use HTTPS** dinyalakan (sebelumnya `http://` tampil tanpa redirect dan `http://www` 522).
- Domain asli: semua halaman ID/EN 200, 404 bermerek, sitemap 31 URL, PDF/OG 200, redirect lama 308, canonical/og:image memakai `.co.id`, `Server: cloudflare`, sertifikat Google Trust Services s.d. 2026-12-29 (auto-renew).
- Lighthouse headless (tanpa extension): mobile beranda 64, `/paket` 78, detail 66; desktop beranda 97; TTFB 50-60 ms. Setara dengan Vercel sebelumnya (mobile `/paket` 71-81). LCP mobile 4-5 dtk berasal dari render delay hero + JS, bukan hosting; jadi tugas terpisah (backlog).
- Vercel: project `bungawisata` dihapus user (domain tim `bungawisata.co.id` tetap, dipakai `dashboard.bungawisata.co.id`). Dashboard tetap 307 ke login di Vercel; `bungawisata.vercel.app` kini 404.
