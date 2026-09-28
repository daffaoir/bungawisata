# Plan — seo-domain (2026-09-28)

- **Repo:** `C:\Users\rinyo\Documents\Project\bungawisata`
- **Wawancara & data asli:** `docs/interviews/2026-09-28-seo-domain.md` (keputusan user + data Google Business Profile, sosmed, ulasan)
- **Audit sumber:** Lighthouse situs live `bungawisata.vercel.app` + audit kode, keduanya 2026-09-28 (ringkasannya di bagian "Baseline")
- **Status:** disetujui 2026-09-28, dikerjakan

## Tujuan
Situs siap dipasang di `bungawisata.co.id` begitu PANDI mengaktifkan domain, dengan SEO lokal yang kuat untuk kata kunci tour travel di Malang. Standar teknisnya meliputi performa mobile, data terstruktur, header keamanan, dan aksesibilitas. Konten situs tidak boleh berisi klaim palsu.

## Baseline (2026-09-28)
- **Lighthouse mobile (P/A/BP/SEO):**
  - `/`: 65/96/100/100, LCP 4,2 s, TBT 840 ms
  - `/paket`: 56/95/100/100, CLS 0,148
  - `/paket/bali-4d3n`: 92/96/100/100
- **Lighthouse desktop:** 90–99.
- Daftar paket di `/paket` di-render client-only (`BAILOUT_TO_CLIENT_SIDE_RENDERING` karena `useSearchParams`), sehingga tidak ada link `/paket/...` di HTML awal.
- Kata "Malang" tidak muncul di `src/messages/*.json` maupun di `src/content/packages/*`.
- JSON-LD `TravelAgency` hanya ada di beranda, tanpa `geo`, jam buka, logo, maupun `@id`. Belum ada BreadcrumbList.
- Belum ada header keamanan selain HSTS. Kontras `#6f6f6f` (3,81) dan `gold-600` (4,29) masih di bawah 4,5.
- Heading di `/paket` dan `/galeri` loncat dari h1 ke h3.
- `/id` dialihkan dengan 307, bukan permanen.

## Catatan untuk builder
- Next.js 16 punya breaking changes. Baca `AGENTS.md` dan panduan di `node_modules/next/dist/docs/` sebelum menyentuh API metadata, sitemap, `opengraph-image`, `headers()`, `redirects()`, dan proxy.
- **Branch dan commit:**
  - Branch aktif `master`. Commit per langkah, conventional commits, tanpa Co-Authored-By.
  - **Jangan push**, karena push ke `master` memicu deploy Vercel. Boss meminta izin user dulu.
- Jangan membaca atau menampilkan `.env.local`.
- **Aturan konten (keputusan user):**
  - Foto boleh dari sumber stok berlisensi bebas komersial (Unsplash License). Foto **tidak boleh** diberi caption yang mengklaim itu dokumentasi perjalanan Bunga Wisata.
  - **Dilarang** membuat testimoni, statistik, tahun berdiri, atau sertifikasi karangan. Pakai hanya data di `docs/interviews/2026-09-28-seo-domain.md`.
  - Harga boleh tetap berupa estimasi, tapi wajib diberi label estimasi.
- Pertahankan palet, font, logo, dan pola komponen yang ada (`PageHeader`, `Section`, `ClosingCta`, `WhatsAppCta`, `buildAlternates`, `buildOpenGraph`). Semua CTA tetap ke WhatsApp.
- **Verify:**
  - Sebelum tiap commit: `npm run lint`, `npx tsc --noEmit`, `npm test`.
  - Di akhir tiap grup: `npm run build`.
- Teks ID dan EN selalu diubah berpasangan.

## Langkah

### Grup A — Kebenaran data & konten

1. [x] **Samakan identitas bisnis dengan Google Business Profile (GBP)**
   - **File:** `src/content/site.ts`, `src/content/site.test.ts`
   - **Field baru di `site`:**
     - `legalName: "CV. Bunga Wisata Malang"`
     - `businessName: "Bunga Wisata Tour and Travel"`. Nama brand `"Bunga Wisata"` tetap dipakai di UI.
     - `geo: { lat: -7.8897902, lng: 112.591502 }`
     - `phoneE164: "+6281233909129"`
   - **Jam buka:** `hours` diganti menjadi Senin–Sabtu 08.00–17.00 WIB, Minggu & hari libur tutup. Tambahkan data terstruktur yang bisa dipakai untuk `openingHoursSpecification`.
   - **Link Maps:** `MAPS_LINK` diganti ke URL Google Maps berbasis CID. Formatnya stabil; ID diambil dari profil 2026-09-28, dengan hex `0x8ecdaa50c2683617`:
     ```
     https://maps.google.com/?cid=10290067987447166487
     ```
     Link ini juga dipakai `hasMap` dan tombol "Lihat semua ulasan di Google" (`GOOGLE_REVIEWS_URL = MAPS_LINK`). Builder memverifikasi di browser bahwa link membuka profil "Bunga Wisata Tour and Travel". Kalau tidak terbuka, pakai URL `https://www.google.com/maps/place/Bunga+Wisata+Tour+and+Travel/@-7.8897902,112.591502,17z`. URL "tulis ulasan" dibuat hanya kalau bisa diverifikasi.
   - **Email:**
     - `email` jadi opsional, dibaca dari env `NEXT_PUBLIC_CONTACT_EMAIL` dan **tanpa fallback**.
     - Hapus `halo@bungawisata.com`.
     - Semua pemakai email (Kontak, Footer, JSON-LD, PDF) menyembunyikan email kalau kosong.
   - **Tes:**
     - Tidak ada string `bungawisata.com` di `site`.
     - `email` undefined kalau env kosong.
     - `hours` memuat 6 hari kerja.
   - **Commit:** `fix(content): align business identity with Google Business Profile`

2. [x] **Ganti statistik karangan dengan bukti nyata**
   - **File:** `src/content/site.ts`, komponen yang memakai `stats` (cari `stats.` dan `AnimatedCounter`), `src/messages/*.json`
   - **Ganti** `travelers/destinations/years` menjadi:
     - rating Google **4,7** (label "dari 30 ulasan Google", link ke `GOOGLE_REVIEWS_URL`)
     - **6,7 rb** pengikut Facebook
     - jumlah paket, dihitung dari `getAllPackages().length`, bukan hardcode
   - Hapus "sejak 2015" dan klaim tahun berdiri lain di `src/messages/*.json`.
   - **Commit:** `fix(content): replace invented stats with verifiable proof`

3. [x] **Testimoni jadi kutipan ulasan Google asli**
   - **File:** `src/content/testimonials.ts` (+ tes), `src/components/home/TestimonialStrip.tsx`, `src/components/shared/TestimonialCard.tsx`, `src/app/[locale]/testimoni/page.tsx`, `src/messages/*.json`
   - **Isi `testimonials`:** 4 ulasan dari file wawancara.
     - Kutipan asli berbahasa Indonesia, dirapikan ejaan ringan tanpa mengubah makna.
     - Versi EN diberi label terjemahan.
     - Nama ditulis nama depan + inisial.
     - Tambah field `source: "google"` dan waktu relatif ("setahun lalu").
   - **Tampilan:**
     - Hapus field `trip`, karena paketnya tidak diketahui.
     - Tambahkan ringkasan "★ 4,7 · 30 ulasan di Google" dan tombol "Lihat semua ulasan di Google".
   - **Jangan** menambah schema `Review`/`AggregateRating`, karena ulasan tentang bisnis sendiri tidak memenuhi syarat rich result Google.
   - **Tes:** setiap testimoni punya `source`, dan tidak ada nama dari daftar lama (Rina Kusuma, Andi Prasetyo, dst.).
   - **Commit:** `feat(testimonials): show real Google reviews instead of invented quotes`

4. [x] **Harga = estimasi, FAQ & About tanpa klaim karangan**
   - **File:** `src/components/package/PriceBox.tsx`, `PackageCard.tsx`, sticky price bar, template PDF itinerary (cari di `src/lib`/`src/components` `@react-pdf`), `src/content/faq.ts`, teks About di `src/messages/*.json`
   - **Harga:** label "Mulai dari" + catatan kecil "Harga estimasi — konfirmasi via WhatsApp" (EN "Estimated price — confirm on WhatsApp") di kartu, detail, dan PDF. Paket Bangkok–Pattaya (harga asli) boleh tanpa label estimasi. Tambahkan flag `priceIsEstimate` di schema paket.
   - **FAQ:** angka kebijakan karangan (DP 30%, 14 hari, minimal 15 peserta) diganti kalimat netral bahwa ketentuan dijelaskan saat pemesanan.
   - **About:** cerita dibatasi pada fakta di file wawancara, yaitu:
     - usaha keluarga di Karangploso, Malang
     - melayani tour dalam dan luar negeri, rombongan, event, dan tiket pesawat
     - tagline
   - **Commit:** `fix(content): mark package prices as estimates and drop invented policies`

5. [x] **Galeri jadi "inspirasi destinasi" + link Instagram**
   - **File:** `src/app/[locale]/galeri/page.tsx`, `src/content/gallery.ts`, `src/messages/*.json`
   - Judul dan deskripsi menegaskan bahwa ini galeri destinasi.
   - Tambah CTA "Lihat dokumentasi perjalanan kami di Instagram @bungawisata".
   - Caption hanya menyebut nama tempat.
   - **Commit:** `fix(gallery): present stock photos as destination inspiration`

6. [x] **Konten paket menyebut keberangkatan dari Malang**
   - **File:** `src/content/packages/*.ts`
   - **Paket domestik:** titik kumpul/penjemputan Malang–Batu, dengan opsi Surabaya/Juanda bila relevan. Bromo–Ijen berkumpul di Malang.
   - **Paket luar negeri:** summary menyebut "berangkat dari Surabaya (Juanda) atau Jakarta, bisa dibantu transfer dari Malang".
   - **Summary:** 120–160 karakter, unik, memuat nama destinasi + "dari Malang" bila wajar.
   - **Tes:** panjang summary ID/EN 100–170 karakter. Tes yang sudah ada tetap lolos.
   - **Commit:** `content(packages): state Malang departure and tighten summaries`

### Grup B — SEO on-page & data terstruktur

7. [x] **Kata kunci di title, description, H1**
   - **File:** `src/messages/id.json`, `en.json`, `src/components/home/Hero.tsx`, `src/app/[locale]/paket/[slug]/page.tsx`
   - **Default title ID:**
     ```
     Bunga Wisata — Tour & Travel Malang | Paket Tour Rombongan & Luar Negeri
     ```
     Maksimal ±60 karakter tampil, sesuaikan agar tidak terpotong. Description 140–160 karakter menyebut Malang, rombongan, dalam dan luar negeri. Versi EN setara ("Malang, East Java").
   - **H1 beranda:** memuat "Tour & Travel Malang" secara natural. Kalimat emosional yang sekarang boleh dipindah jadi subjudul.
   - **Title paket:**
     - format `Paket Tour {Destinasi} {durasi} dari Malang`
     - EN `{Destination} Tour Package {duration} from Malang`
     - batasi ±60 karakter
   - **Halaman lain:**
     - description minimal 120 karakter untuk Galeri, Testimoni, Kontak, Tentang
     - perbaiki title About yang menyebut brand dua kali
   - **Tes:** semua title (template diterapkan) ≤ 65 karakter dan description 110–165 karakter untuk seluruh key `Meta`/`*.meta` di kedua locale.
   - **Commit:** `feat(seo): target Malang tour keywords in titles, descriptions and H1`

8. [x] **Entitas bisnis global + BreadcrumbList**
   - **File:** `src/lib/jsonld.ts` (baru) + `src/lib/jsonld.test.ts`, `src/app/[locale]/layout.tsx`, `page.tsx` beranda, `paket/[slug]/page.tsx`, halaman dalam lain
   - **`organizationJsonLd(locale)`:**
     - `@type: ["TravelAgency","LocalBusiness"]`
     - `@id: ${SITE_URL}/#organization`
     - `name` = businessName, plus `legalName`, `alternateName: "Bunga Wisata"`
     - `url`, `logo` (URL absolut logo PNG), `image`
     - `telephone` E.164, `address`
     - `geo`: `GeoCoordinates`
     - `openingHoursSpecification` dari `site.hours`
     - `priceRange: "Rp"`
     - `areaServed`: Malang, Batu, Jawa Timur, Indonesia
     - `sameAs`: 3 sosmed
     - `hasMap`: URL Maps kanonik
     - `email` hanya kalau ada
   - **Penempatan:** dirender sekali di layout, sehingga muncul di semua halaman. Hapus duplikat di beranda.
   - **Helper:** buat `breadcrumbJsonLd(items)` dan pasang di semua halaman selain beranda.
   - **TouristTrip:** `provider: { "@id": …#organization }`, tambahkan `@id` trip.
   - **Tes:** bentuk JSON-LD (field wajib ada, `email` hilang kalau undefined, tidak ada `<` mentah setelah serialisasi).
   - **Commit:** `feat(seo): site-wide business entity and breadcrumbs in JSON-LD`

9. [x] **Sitemap, redirect, canonical, OG**
   - **File:** `src/app/sitemap.ts`, `next.config.ts` (atau `src/proxy.ts`), `src/lib/metadata.ts`, `src/app/[locale]/paket/[slug]/opengraph-image.tsx` (baru, opsional kalau foto lokal sudah ada dari langkah 12)
   - **Sitemap:** tambahkan `lastModified`. Nilainya dari tanggal build, atau dari field `updatedAt` per paket/layanan/panduan kalau ditambahkan.
   - **Redirect:** `/id` dan `/id/:path*` harus **308** ke tanpa prefix. Pastikan tidak bentrok dengan middleware next-intl.
   - **Canonical beranda** konsisten dengan hreflang dan sitemap, pilih salah satu: dengan atau tanpa `/`.
   - **og:image paket:** memakai foto lokal lengkap dengan width, height, dan alt. Twitter card memakai tag yang sama dengan halaman lain.
   - **Commit:** `fix(seo): sitemap lastmod, permanent /id redirect, consistent canonicals`

### Grup C — Performa, standar, aksesibilitas

10. [x] **`/paket` di-render di server**
    - **File:** `src/app/[locale]/paket/page.tsx`, `src/components/package/PackageBrowser.tsx`
    - Hapus ketergantungan `useSearchParams` saat render awal. Semua 14 kartu (dengan link) harus ada di HTML statis.
    - Filter dijalankan di client, dan state awalnya dibaca dari URL setelah mount **tanpa** mengosongkan list. Contoh: `window.location.search` di `useEffect`, atau `nuqs`-style shallow update memakai `history.replaceState`.
    - Hapus fallback `h-72`, dan pastikan tidak ada layout shift.
    - **Tes:** unit test logika filter tetap lolos.
    - **Cek build:** HTML `/paket` di `.next` memuat 14 href `/paket/`.
    - **Commit:** `perf(packages): server-render the package list for crawlers and CLS`

11. [x] **Kurangi JS client di mobile**
    - **File:** `src/components/motion/*`, `src/components/home/*`, `src/app/[locale]/layout.tsx`
    - Audit komponen `"use client"`, lalu pilih yang sesuai:
      - `motion`: pakai `LazyMotion` + `m`, atau ganti animasi reveal dengan CSS (`@starting-style` / IntersectionObserver ringan)
      - `GalleryCarousel` di-lazy-load
      - `AnimatedCounter` diganti render statis kalau tidak perlu
    - **Gambar prioritas:** hero beranda dan hero detail paket `priority`/`fetchPriority="high"`, dengan `sizes` yang benar (hindari varian 3840w).
    - **Target Lighthouse mobile** (median 3 run, lokal `next start` atau preview): `/` ≥ 85, `/paket` ≥ 85, CLS < 0,1. Catat angka sebelum dan sesudah di Progress.
    - **Commit:** `perf(home): cut client JavaScript and prioritise hero images`

12. [x] **Foto stok di-host lokal**
    - **File:** `public/images/**`, `src/content/images.ts`, `next.config.ts`, `docs/CREDITS-FOTO.md` (baru)
    - Unduh foto Unsplash yang dipakai ke `public/images/`, maksimal lebar 1600, dikompresi.
    - Catat fotografer dan URL sumber di `CREDITS-FOTO.md`.
    - Hapus `remotePatterns` Unsplash.
    - Set `images.formats: ["image/avif","image/webp"]`.
    - Pastikan total aset wajar, kurang dari ±25 MB.
    - **Commit:** `perf(images): self-host stock photos with credits and AVIF`

13. [x] **Header keamanan & ikon**
    - **File:** `next.config.ts`, `src/app/apple-icon.png`, `src/app/manifest.ts` (baru)
    - **`headers()` untuk semua path:**
      - `X-Content-Type-Options: nosniff`
      - `Referrer-Policy: strict-origin-when-cross-origin`
      - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
      - `X-Frame-Options: SAMEORIGIN`
      - `Content-Security-Policy: frame-ancestors 'self'`
    - CSP penuh **tidak** dipasang, karena JSON-LD inline dan skrip Next tanpa nonce akan rusak.
    - Set `poweredByHeader: false`.
    - **Ikon:** tambahkan `apple-icon` 180×180 dan `manifest` (name, short_name, theme_color gold, icons) dari logo yang ada.
    - **Commit:** `chore(security): baseline security headers, manifest and apple icon`

14. [x] **Kontras & urutan heading**
    - **File:** `src/app/globals.css`, komponen yang memakai abu `#6f6f6f` dan `text-gold-600` untuk teks kecil, `PackageBrowser`/`PackageCard`, halaman galeri
    - Teks abu dan eyebrow gold mencapai rasio ≥ 4,5 dengan menggelapkan token. Hue tetap.
    - Tidak ada lompatan h1 ke h3: tambahkan h2 (boleh `sr-only`) atau turunkan level.
    - **Target:** Lighthouse Accessibility 100 di `/`, `/paket`, `/galeri`.
    - **Commit:** `fix(a11y): meet 4.5:1 text contrast and fix heading order`

15. [x] **Vercel Web Analytics**
    - **File:** `package.json`, `src/app/[locale]/layout.tsx`
    - Pasang `@vercel/analytics`, lalu render `<Analytics />` di layout.
    - Custom event (klik WA) **tidak** dibuat, karena di plan Hobby tidak tersedia. Catat sebagai ide kalau nanti pindah ke Pro atau GA4.
    - **Commit:** `feat(analytics): add Vercel Web Analytics`

### Grup D — Halaman baru

16. [x] **Halaman layanan (`/layanan`, `/layanan/[slug]`)**
    - **File:**
      - `src/content/services/*.ts` + `index.ts` (schema zod meniru `src/lib/packages.ts`)
      - `src/lib/services.ts` (+ tes)
      - `src/app/[locale]/layanan/page.tsx`, `src/app/[locale]/layanan/[slug]/page.tsx`
      - `src/i18n/routing.ts`: `/layanan` → en `/services`, `/layanan/[slug]` → en `/services/[slug]`
      - `nav-items.ts`: menu "Layanan"
      - `sitemap.ts`, `src/messages/*.json`
    - **5 layanan** (slug ID; slug EN boleh sama atau terlokalisasi, konsisten dengan pola paket):
      - `tour-rombongan`
      - `study-tour`
      - `gathering-event` (outing kantor, event, outbound Malang–Batu)
      - `private-tour` (keluarga/grup kecil)
      - `tiket-pesawat`
    - **Isi tiap layanan** (ID dan EN, ditulis unik, tanpa angka atau klaim karangan):
      - H1 berkata kunci, contohnya "Tour Rombongan dari Malang"
      - intro 2–3 paragraf
      - "cocok untuk"
      - "yang kami urus" (bus/transport, hotel, tiket, tour leader, dokumentasi) sebagai daftar kemampuan umum, tanpa jumlah armada
      - alur pemesanan 4 langkah
      - 4–6 FAQ
      - paket terkait (link ke `/paket/...`)
      - CTA WhatsApp dengan `intent` baru
    - **Target panjang:** ±500–800 kata per bahasa.
    - **Data terstruktur:** `Service` (`provider` ke `@id` organisasi, `areaServed`) + Breadcrumb. `FAQPage` boleh ditambahkan.
    - **Beranda:** tambahkan section singkat "Layanan kami" yang menaut ke kelima halaman.
    - **Commit:** `feat(services): add service landing pages for groups, study tours, events, private tours and flights`

17. [x] **Form "minta penawaran" → WhatsApp**
    - **File:** `src/components/shared/QuoteRequestForm.tsx` (baru, client), `src/lib/whatsapp.ts` (fungsi `buildQuoteMessage`, + tes), halaman layanan dan `/kontak`
    - **Field:**
      - layanan (select)
      - tujuan
      - jumlah peserta
      - perkiraan tanggal/bulan
      - kota jemput (default Malang)
      - budget per orang (opsional)
      - nama
    - **Perilaku submit:**
      - Validasi ringan.
      - Buka `wa.me` dengan pesan terstruktur sesuai locale. **Tidak ada data yang dikirim ke server.**
      - Label dan `aria` lengkap, touch target ≥ 44 px.
    - **Tes:** `buildQuoteMessage` menghasilkan pesan yang memuat semua field terisi dan melewati field kosong.
    - **Commit:** `feat(contact): quote request form that composes a WhatsApp message`

18. [x] **Panduan (artikel)**
    - **File:** `src/content/guides/*.ts`, `src/lib/guides.ts` (+ tes), `src/app/[locale]/panduan/page.tsx`, `src/app/[locale]/panduan/[slug]/page.tsx`, routing (`/panduan` → en `/guides`), sitemap, footer link
    - **4 artikel evergreen** (ID dan EN, ±800–1.200 kata, fakta umum yang bisa dipertanggungjawabkan, tanpa aturan visa atau harga yang cepat basi):
      - "Paket Wisata Bromo dari Malang: rute, waktu terbaik, dan persiapan"
      - "Tips memilih tour rombongan untuk kantor & komunitas"
      - "Checklist persiapan study tour sekolah"
      - "Persiapan tour luar negeri pertama dari Malang"
    - **Isi tiap artikel:** tanggal terbit/perbarui, link internal ke paket/layanan, CTA WA.
    - **Data terstruktur:** `Article`/`BlogPosting` (author = organisasi) + Breadcrumb.
    - **Commit:** `feat(guides): add evergreen travel guides for local search`

### Grup E — Peluncuran domain

19. [x] **Runbook peluncuran domain untuk user**
    - **File:** `docs/DOMAIN-LAUNCH.md` (baru), `README.md`, `docs/KONTEN-PLACEHOLDER.md`
    - Runbook ditulis sebagai langkah bernomor. Tiap langkah menyebut tempat (URL/menu), nilai persis, arti istilah, dan cara cek berhasil. Isi langkahnya:
      1. Cek domain sudah aktif, yaitu email PANDI/Niagahoster dan `nslookup` tidak lagi NXDOMAIN.
      2. Cloudflare → Add a domain → Free, lalu catat 2 nameserver.
      3. Panel Niagahoster → Domain → Nameserver → ganti ke Cloudflare. Cek status "Active" di Cloudflare.
      4. Vercel → project `bungawisata` → Settings → Domains:
         - tambah `bungawisata.co.id` sebagai Production
         - tambah `www.bungawisata.co.id` dengan redirect 308 ke apex
         - salin record A/CNAME persis seperti yang ditampilkan Vercel ke Cloudflare dengan **proxy mati (DNS only, awan abu-abu)**
         - cek status "Valid Configuration" dan SSL aktif
      5. Vercel → Environment Variables (Production):
         - `NEXT_PUBLIC_SITE_URL=https://bungawisata.co.id`
         - `NEXT_PUBLIC_CONTACT_EMAIL=info@bungawisata.co.id` (setelah langkah 7)
         - redeploy, lalu cek `view-source` canonical dan `/sitemap.xml`
      6. Biarkan `bungawisata.vercel.app` tetap hidup. Canonical sudah menunjuk ke domain baru, jadi opsi redirect ke domain baru di Vercel boleh dinyalakan.
      7. Cloudflare → Email → Email Routing:
         - aktifkan
         - verifikasi Gmail papa
         - buat aturan `info@` → Gmail papa
         - kirim email uji
      8. Google Search Console:
         - Add property → **Domain** `bungawisata.co.id`
         - salin TXT ke Cloudflare DNS, lalu verifikasi
         - Sitemaps → kirim `https://bungawisata.co.id/sitemap.xml`
         - URL Inspection → Request indexing untuk beranda dan `/layanan`
      9. Google Business Profile (akses Manager dari papa/staf):
         - isi website `https://bungawisata.co.id`
         - pastikan jam dan kategori sesuai
         - tambahkan kategori sekunder bila relevan (mis. "Agen Tiket Pesawat")
      10. Ganti link bio Instagram (sekarang `bungawisatamalang.com` yang mati), website di Facebook, dan TikTok ke domain baru.
      11. Vercel → Analytics → Enable Web Analytics.
    - Perbarui README (env) dan `KONTEN-PLACEHOLDER.md` (status setiap item setelah plan ini).
    - **Commit:** `docs: add domain launch runbook`

## Di luar scope
- Mengubah DNS/registrar/Vercel/Search Console atas nama user. Itu ada di runbook, atau dikerjakan asisten dengan izin per aksi setelah domain aktif.
- CSP penuh dengan nonce, GA4, custom events, iklan berbayar.
- Jadwal keberangkatan dan sisa kursi. Halaman catering.
- Mengganti logo, palet, dan font.

## Acceptance checklist
> Diperiksa independen oleh `tester` setelah semua langkah selesai.

- [x] **Verify** (`npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`) semua exit 0.
- [x] `grep -r "bungawisata.com" src public` kosong (selain komentar yang menjelaskan domain itu bukan milik kita).
- [x] Tidak ada nama testimoni lama maupun angka "2.500"/"2500", "sejak 2015", atau "since 2015" di `src/`.
- [x] Testimoni di `/` dan `/testimoni` adalah 4 ulasan Google dengan link "Lihat semua ulasan di Google". Rating 4,7 dan 30 ulasan tampil.
  - Catatan tester: `/testimoni` menampilkan 4 ulasan; beranda menampilkan 3 dari 4 (`testimonials.slice(0, 3)` di `TestimonialStrip`), semuanya ulasan asli.
- [x] Jam buka di Kontak, Footer, dan JSON-LD: Senin–Sabtu 08.00–17.00, Minggu tutup.
  - Catatan tester: "Minggu & hari libur Tutup" tertulis di Kontak; Footer hanya "Senin – Sabtu · 08.00 – 17.00 WIB"; JSON-LD hanya Mon–Sat (Minggu tutup secara implisit).
- [x] Email tidak tampil di mana pun saat `NEXT_PUBLIC_CONTACT_EMAIL` kosong, dan tampil kalau diisi (cek dengan build lokal env `info@example.test`).
- [x] Harga di kartu, detail, dan PDF diberi label estimasi, kecuali Bangkok–Pattaya.
- [x] Title/H1 beranda memuat "Malang". Title halaman paket berformat "Paket Tour … dari Malang". Tidak ada title > 65 karakter dan tidak ada description < 110 atau > 165 karakter (ID & EN).
- [ ] HTML statis `/paket` dan `/en/packages` memuat link ke 14 paket, tanpa `BAILOUT_TO_CLIENT_SIDE_RENDERING`.
  - Gagal (tester 2026-09-29): 14 link unik ada, tetapi HTML **setiap** halaman memuat satu `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">`. Sumbernya `<Analytics />` dari `@vercel/analytics/next` (memakai `useSearchParams` di dalam `Suspense fallback={null}`) di layout, bukan daftar paket. Secara maksud lolos, secara harfiah gagal.
- [x] Setiap halaman memuat satu JSON-LD organisasi dengan `@id`, `geo`, `openingHoursSpecification`, `logo`, dan `sameAs` 3 akun. Halaman selain beranda punya `BreadcrumbList`. Halaman paket berisi `TouristTrip` dengan `provider.@id`, dan halaman layanan berisi `Service`. Semua lolos Schema Markup Validator / Rich Results Test (lokal via paste HTML).
  - Catatan tester: validator Google tidak dijalankan (lokal). Divalidasi dengan `JSON.parse` + cek field di 62 halaman sitemap.
- [x] `/sitemap.xml` memuat `<lastmod>` serta semua halaman layanan dan panduan. `/id` dan `/id/paket` membalas 308.
- [x] Header respons memuat `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, dan tidak ada `X-Powered-By`.
- [x] `/manifest.webmanifest` dan `apple-icon` ada.
- [ ] Lighthouse mobile (median 3 run, `next start`): `/` dan `/paket` Performance ≥ 85, Accessibility 100, SEO 100, CLS < 0,1.
  - Gagal (tester 2026-09-29): median `/` Perf 81, `/paket` Perf 84; SEO 92 di keduanya (audit `canonical`, karena canonical ke `bungawisata.co.id`). A11y 100 dan CLS 0 lolos.
- [x] Tidak ada request ke `images.unsplash.com`. `docs/CREDITS-FOTO.md` mencantumkan semua foto.
  - Catatan tester: 64 foto tercantum, tapi hanya URL sumber; nama fotografer (diminta langkah 12) belum ada.
- [x] `/layanan` menampilkan 5 layanan, dan tiap halaman layanan ID/EN punya H1 berkata kunci, FAQ, paket terkait, form penawaran, dan CTA WA.
- [x] Form penawaran membuka `wa.me/6281233909129?text=…` berisi field yang diisi. Tidak ada request jaringan lain saat submit.
- [x] `/panduan` menampilkan 4 artikel ID/EN dengan `BlogPosting` + Breadcrumb dan link internal.
- [x] Menu desktop dan mobile memuat "Layanan". Semua halaman baru rapi di 1280 px dan 375 px (screenshot).
- [x] `docs/DOMAIN-LAUNCH.md` ada dan memuat 11 langkah di atas.

## Progress
- 2026-09-28: plan dibuat setelah wawancara dan audit.
- 2026-09-29 (builder): langkah 1–19 selesai, satu commit per langkah kecuali:
  - Langkah 1+2 digabung karena `site.stats` dipakai di tempat yang sama.
  - Langkah 16–18 digabung (`276cb9e`) karena routing, sitemap, dan messages memuat ketiganya sekaligus; dipecah akan menghasilkan commit yang tidak bisa di-build.
- Keputusan saat implementasi:
  - Library `motion` dihapus. Reveal/timeline pakai CSS scroll-driven animation (hanya geser, tanpa fade, supaya kontras tidak gagal di tengah animasi); menu mobile pakai transisi CSS.
  - `/paket` mengirim indeks ringan ke client; kartu dirender di server (JS `/paket` turun ±386 KB).
  - Satu elemen `<Link>` yang dirender di dua tempat di `ServicesStrip` membuat prerender beranda macet >60 detik; diperbaiki dengan dua elemen terpisah.
  - OG image paket memakai foto lokal + alt; `width/height` tidak diisi karena rasio foto bervariasi.
- Lighthouse mobile lokal (`next start`, median 3 run), sebelum → sesudah:
  - `/`: Perf 72 → 77, A11y 96 → 100
  - `/paket`: Perf 57 → 80, A11y 96 → 100
  - `/galeri`: Perf 83, A11y 100; `/layanan/tour-rombongan`: Perf 85, A11y 100
  - CLS 0 di semua halaman. SEO 92 dan BP 96 di lokal hanya karena canonical ke `bungawisata.co.id` dan skrip Vercel Analytics yang tidak ada di localhost.
  - **Belum tercapai:** target Perf ≥ 85 untuk `/` dan `/paket`. LCP ±4 s (simulasi) didominasi *element render delay* akibat runtime React/Next + next-intl di client. Langkah lanjutan yang disarankan: kirim teks sebagai props ke komponen client dan lepas `NextIntlClientProvider`, lalu ukur ulang di domain produksi (PageSpeed Insights).
- 2026-09-29 (tester): verifikasi independen di `c642f3b`.
  - Verify: `npm run lint` 0, `npx tsc --noEmit` 0, `npm test` 0 (13 file, 135 tes), `npm run build` 0. Build tambahan dengan `NEXT_PUBLIC_CONTACT_EMAIL=info@example.test` juga 0.
  - 18 dari 20 item lolos. Gagal: (1) `BAILOUT_TO_CLIENT_SIDE_RENDERING` masih ada di semua halaman, berasal dari `<Analytics />` Vercel, bukan daftar paket (14 link ada di HTML statis); (2) Lighthouse Perf `/` 81 dan `/paket` 84 (< 85), SEO 92 karena canonical.
  - Lighthouse mobile lokal (`next start -p 3210`, 3 run): `/` Perf 85/81/80 (median 81), A11y 100, BP 96, SEO 92, LCP 3,67 s, TBT 369 ms, CLS 0. `/paket` Perf 85/83/84 (median 84), A11y 100, BP 96, SEO 92, LCP 3,84 s, TBT 210 ms, CLS 0. BP 96 hanya karena `/_vercel/insights/script.js` 404.
  - Semua 62 URL sitemap (ID+EN) 200, title ≤ 65, description 110–165, JSON-LD bisa di-parse; tidak ada horizontal scroll di 1280/375; satu-satunya error console adalah skrip Vercel Insights 404.
  - Catatan kecil: `CREDITS-FOTO.md` belum mencantumkan nama fotografer; beranda menampilkan 3 dari 4 ulasan; Footer tidak menulis "Minggu tutup" secara eksplisit.
  - Screenshot: `.playwright-mcp/seo-domain/` (tidak di-commit).
- 2026-09-29 (builder, perbaikan setelah tester + code-review):
  - `BAILOUT_TO_CLIENT_SIDE_RENDERING` berasal dari `<Analytics />` versi `/next` (memakai `useSearchParams`). Diganti `@vercel/analytics/react` (`2c2b784`). Setelah build, `/paket`, `/en/packages`, dan beranda tidak lagi memuat penanda itu, dan 14 link paket tetap ada.
  - Code-review menemukan filter `/paket` basi saat navigasi client-side dari `/paket` ke `/paket?region=…` lewat footer. Link region di footer kini `<a>` biasa (`6a5418e`), dan skenario ini sudah dicek ulang di browser.
  - Verify: lint 0, tsc 0, test 0 (135 tes), build 0.
  - Performance mobile `/` (median 81) dan `/paket` (84) masih di bawah 85. Keputusan lanjutannya ada di user.
