# Plan — Redesign "Hangat Keluarga" (2026-09-30)

## Latar

Pemilik menilai situs terasa kaku, rumit untuk sebuah landing page, dan
"terlihat seperti AI vibe coding". Audit 2026-09-30 (desktop 1280px + mobile
375px, 7 halaman) menemukan:

- Semua kotak persegi bergaris rambut: kartu layanan, paket, "Kenapa kami",
  ulasan, panel filter.
- Pola judul yang sama di setiap section: garis emas → eyebrow uppercase →
  serif besar. Tombol dan label semuanya uppercase.
- Beranda punya 8 section dan panjangnya 12.138px di HP (±15 layar).
- Galeri: tombol panah jauh di kanan atas, di HP terselip di antara teks dan
  foto.
- Hampir monokrom, tanpa animasi yang berarti.
- Foto buram. Penyebabnya:
  - File di-download pada q72 lalu di-encode ulang q70 (detail tinggal
    37–90%), dengan plafon 1600px.
  - AVIF q75 di Next ≈ q47.
  - `deviceSizes` berhenti di 1920.
  - `sizes` hero desktop salah hitung.
  - 6 foto sumbernya memang lembek.

Referensi yang dipakai (hasil riset, sudah dicek bisa dibuka): Kudanil
Explorer, Flash Pack, Bawah Reserve, SeaTrek, InsideJapan, Hipcamp.

## Keputusan (wawancara 2026-09-30)

| Topik | Keputusan |
|---|---|
| Arah | **Hangat Keluarga**: krem hangat, cokelat tua, aksen kunyit/terakota, foto & kartu membulat (radius 20–24px), tombol pill, tanpa garis kotak |
| Font | **Fraunces** (judul, serif lunak) + **Plus Jakarta Sans** (body/UI) via `next/font/google` |
| Beranda | Diringkas menjadi ±6 section |
| Animasi | Sedang dan halus. CSS scroll-driven animation + fallback; hormati `prefers-reduced-motion`. Tanpa scroll hijack |
| Cakupan | Semua halaman |
| Copy | Judul, tombol, dan label ditulis ulang: sentence case, bahasa lisan yang hangat. Fakta, harga, itinerary, dan kebijakan tidak berubah; tidak ada klaim baru |
| Logo | Bentuk tetap, hitam diganti cokelat tua palet baru |
| Foto orang | Foto stok Unsplash traveler/rombongan sebagai ilustrasi suasana. **Tidak** diberi label sebagai tim/peserta Bunga Wisata (kebijakan konten tetap berlaku) |
| Git | Kerja di branch `redesign-hangat`. Vercel membuat preview deploy per push; production baru berubah setelah merge ke `master` |

Di luar cakupan: isi PDF itinerary (tata letak PDF tidak diubah), harga asli,
dan data paket.

## Sistem desain baru (ringkas)

- **Warna (token `@theme`):**
  - Latar `cream #FAF6EE`, `sand #F1E8D8` (section selang-seling).
  - Teks `cocoa #2B2118`, `cocoa-soft`, `cocoa-muted`.
  - Aksen `turmeric` (tombol utama / sorotan) dan `terracotta` (dipakai
    hemat).
  - Section gelap memakai cokelat tua, bukan hitam.
  - Hijau WhatsApp hanya untuk aksi WA.
  - Semua pasangan teks/latar ≥ 4.5:1 (dicek dengan skrip kontras).
- **Bentuk:** foto dan kartu `rounded-3xl` (24px), chip/tombol `rounded-full`.
  Tanpa border sebagai pemisah; pemisahnya warna latar dan jarak.
- **Tipografi:**
  - Judul sentence case, Fraunces 500–600.
  - Eyebrow uppercase dihapus. Kalau perlu penanda kecil, pakai teks biasa
    kecil (bukan uppercase tracked).
  - Tombol sentence case.
- **Ritme:** section bervariasi (full-bleed, latar sand, layout asimetris);
  tidak ada deretan grid kartu kotak yang sama.
- **Motion:**
  - `.reveal` (fade + naik 16px) dan `.reveal-photo` (clip-path inset + scale
    1.06→1) lewat `animation-timeline: view()`.
  - Parallax ringan (≤40px) di foto hero.
  - Strip geser (scroll-snap) dengan progress bar.
  - Hover kartu hanya di `@media (hover:hover)`.
  - Tombol WA berdenyut sekali.
  - Hero tampil langsung (tanpa fade) supaya LCP tidak tertunda.

## Langkah

1. **Branch & fondasi desain.**
   - Buat branch `redesign-hangat`.
   - Ganti font di `src/app/[locale]/layout.tsx`.
   - Tulis ulang token dan utilitas di `src/app/globals.css`: warna, radius,
     `.reveal`/`.reveal-photo`/parallax, fallback `@supports` +
     `prefers-reduced-motion`.
   - Hapus utilitas `eyebrow`/`rule-gold`.
   - Tulis ulang `docs/design.md` bagian sistem desain dan "gaya yang
     dihindari" sesuai arah baru.
2. **Komponen dasar (`src/components/shared`):**
   - `Button`: pill, sentence case, varian utama/sekunder/WA.
   - `Section`: tone cream/sand/cocoa.
   - `SectionHeading`: tanpa eyebrow.
   - Juga: `Badge`/chip, `PageHeader` (foto inset membulat, lebih pendek),
     `Select`, `FaqAccordion`, `TestimonialCard`, `ServiceCard`,
     `EmptyState`, `ClosingCta`.
   - Ganti implementasi `Reveal`/`Stagger` ke utilitas CSS baru.
3. **Layout:**
   - `Header`: nav sentence case, latar krem + blur saat di-scroll.
   - `MobileNav`: panel membulat, tautan besar.
   - `Footer`: cokelat tua, kolom disederhanakan.
   - `FloatingWhatsApp`: pill "Tanya via WhatsApp" di desktop, lingkaran di
     HP, denyut sekali.
   - `Logo`: warna cokelat, lewat `scripts/prepare-logo.mjs`, termasuk
     `logo-full.png` dan ikon.
4. **Beranda diringkas menjadi 6 section:**
   1. **Hero:** foto besar inset 8–12px, radius 24px, judul di kiri bawah di
      atas gradien tipis, CTA WA + "Lihat paket", chip rating Google 4,7.
   2. **Paket pilihan:** strip geser (scroll-snap) + tab Dalam/Luar negeri.
      Menggabungkan `RegionSplit` + `FeaturedPackages`; ada progress bar dan
      tombol panah di bawah strip.
   3. **Layanan:** layout asimetris (foto besar + daftar 5 layanan dengan
      tautan), menggantikan 5 kartu kotak.
   4. **Cara pesan:** 3–4 langkah via WhatsApp. Poin "Kenapa kami" (itinerary
      jelas, harga transparan, bisa custom) dilebur di sini.
   5. **Galeri:** strip geser foto membulat dengan rasio bervariasi;
      progress bar + panah **di bawah** foto (menjawab keluhan poin 1).
   6. **Ulasan Google + CTA penutup:** kartu krem, bukan blok hitam.

   Komponen yang tidak dipakai lagi dihapus.
5. **Kartu paket & halaman paket:**
   - `PackageCard`: foto 4:5 membulat, chip harga di atas foto, judul +
     durasi di bawah, tanpa kotak.
   - `/paket`: header lebih pendek, filter chip pill, panel tanpa kotak.
   - Detail `/paket/[slug]`:
     - Hero inset membulat.
     - Sorotan sebagai chip.
     - Timeline itinerary lebih hangat.
     - Kotak harga membulat; `StickyPriceBar` ikut gaya baru.
6. **Halaman lain:**
   - `/layanan` + detail.
   - `/tentang-kami` (memakai foto suasana rombongan).
   - `/galeri` (grid membulat dengan rasio bervariasi).
   - `/kontak` (kartu kontak + peta membulat).
   - `/panduan` + detail.
   - `/testimoni` dan 404.
7. **Copy.** Tulis ulang judul, subjudul, tombol, dan label di
   `src/messages/id.json` + `en.json` (serta teks judul di `src/content/*`
   bila ada) dengan sentence case dan bahasa lisan. Aturan:
   - Tanpa klaim, angka, atau kebijakan baru.
   - Struktur kunci kedua bahasa tetap sama.
8. **Foto tajam:**
   - `scripts/download-stock-images.mjs`:
     - Unduh `w=2560&q=85`.
     - Encode ulang `jpeg q88 mozjpeg 4:4:4` (satu kali saja).
     - Tambah flag `--force`.
   - Ganti 6 ID lembek di `src/content/images.ts`:
     - `jepang-fushimi-inari` → `photo-1558862107-d49ef2a04d72`
     - `komodo-padar` → `photo-1660279582815-8d9a2b0d7e27`
     - `dubai-gurun` → `photo-1637935142056-03d421b2b13c`
     - `gili-penyu` → `photo-1709483095301-2d1f3e95b1d4`
     - `yogya-prambanan` → `photo-1578469550956-0e16b69c6a3d`
     - `vietnam-ha-long` → `photo-1561461221-959c3f16234b`

     Setiap foto dicek visual sebelum dipakai.
   - Tambah 3–5 foto suasana traveler/rombongan (Unsplash License, orang
     tidak menjadi fokus wajah close-up).
   - Unduh ulang semua foto dengan `--force`.
   - Perbarui `docs/CREDITS-FOTO.md`.
9. **Konfigurasi gambar:**
   - `next.config.ts`:
     - `deviceSizes` sampai 2560.
     - `qualities: [75, 85]`.
     - `formats: ["image/webp"]` (detail lebih baik daripada AVIF q75 dan
       menghemat kuota transformasi Vercel).
   - `quality={85}` untuk gambar besar (hero, PageHeader, hero detail
     paket, galeri).
   - Perbaiki `sizes` hero sesuai lebar render sebenarnya.
10. **Verifikasi & rilis:**
    1. Jalankan Verify (lint, tsc, test, build).
    2. Ambil screenshot semua halaman di 1280 & 375 (ID + EN untuk beranda).
    3. Cek kontras, scroll horizontal, console error, dan
       `prefers-reduced-motion`.
    4. Periksa preview deploy Vercel.
    5. Subagent `tester` + `/code-review`, lalu perbaiki temuan.
    6. Merge ke `master`, push, cek production.

## Acceptance checklist

- [ ] Verify: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`
      semuanya exit 0; CI hijau di branch dan di `master`.
- [ ] Tidak ada teks uppercase tracked (eyebrow) dan tidak ada tombol
      uppercase di semua halaman (cek computed `text-transform` di 1280 & 375).
- [ ] Font judul Fraunces dan body Plus Jakarta Sans (computed style).
- [ ] Foto kartu/hero/galeri memakai radius ≥ 20px; tombol utama pill;
      tidak ada kartu dengan border 1px sebagai satu-satunya pemisah.
- [ ] Beranda punya ≤ 6 section utama di antara header dan footer; tinggi
      halaman di 375px turun minimal 30% dari 12.138px (≤ 8.500px).
- [ ] Galeri & strip paket: kontrol panah/progress berada **di bawah** strip,
      bisa digeser dengan swipe/drag, tanpa scroll horizontal di `<body>`.
- [ ] Animasi reveal berjalan saat scroll di Chrome; dengan
      `prefers-reduced-motion: reduce` semua konten langsung tampil; tidak ada
      konten yang tertinggal `opacity: 0` setelah halaman di-scroll penuh.
- [ ] Hero beranda tampil tanpa animasi masuk (LCP tidak tertunda).
- [ ] Foto: semua file `public/images/stock` lebar ≥ 2400px (kecuali sumber
      aslinya lebih kecil, dicatat); 6 foto lembek sudah diganti;
      `/_next/image` untuk hero desktop DPR2 menyajikan lebar ≥ 1600.
- [ ] Kontras teks ≥ 4.5:1 untuk semua pasangan warna teks/latar di token.
- [ ] Tidak ada scroll horizontal dan tidak ada error console di semua
      halaman (1280 & 375).
- [ ] Copy: sentence case, tidak ada klaim/angka/kebijakan baru (diff
      `src/messages` diperiksa); ID dan EN berstruktur sama (test lulus).
- [ ] Foto suasana orang tidak diberi caption/label sebagai tim atau peserta
      Bunga Wisata.
- [ ] Logo tampil cokelat tua di header, footer, favicon/OG.
- [ ] CTA WhatsApp tetap ada di hero, detail paket (kotak harga + sticky
      bar), kontak, penutup, dan tombol mengambang, dengan tautan `wa.me` yang
      benar.
- [ ] Screenshot sebelum/sesudah 1280 & 375 ditunjukkan ke pemilik.
- [ ] Merge ke `master`, production `bungawisata.co.id` menampilkan desain
      baru, halaman utama merespons 200.

## Progress

(diisi saat pengerjaan)
