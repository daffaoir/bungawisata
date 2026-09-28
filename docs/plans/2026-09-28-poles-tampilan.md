# Plan — poles-tampilan (2026-09-28)

- **Repo:** `C:\Users\rinyo\Documents\Project\bungawisata`
- **PRD:** docs/PRD.md#poles-tampilan-sebelum-domain-bungawisataco-id-2026-09-28 · **Design:** docs/design.md (ditulis designer setelah audit; hanya item berstatus **disetujui** yang dikerjakan)
- **Wawancara:** `docs/interviews/2026-09-28-poles-tampilan.md`
- **Status:** draft

## Catatan untuk builder
- Next.js 16 punya breaking changes: baca `AGENTS.md` dan panduan terkait di `node_modules/next/dist/docs/` sebelum menyentuh API Next (metadata, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`).
- Branch aktif adalah **`master`** (bukan `main`). Commit per langkah, conventional commits, tanpa Co-Authored-By. **Jangan push** — push ke `master` memicu deploy Vercel; boss minta izin user dulu.
- Jangan membaca atau mengubah `.env.local`.
- Jangan mengubah konten karangan (testimoni, statistik, email, sosmed, "sejak 2015", harga) — lihat `docs/KONTEN-PLACEHOLDER.md`.
- Pertahankan palet, font, dan logo. Semua CTA tetap ke WhatsApp.
- Jalankan `## Verify` (CLAUDE.md) sebelum tiap commit; minimal `npm run lint` + `npx tsc --noEmit` + `npm test`, dan `npm run build` sebelum commit terakhir tiap grup.

## Langkah
> Kecil, berurutan, satu commit per langkah. Builder mengerjakan dari atas.

1. [ ] **Hapus penanda "TODO" yang terlihat di jawaban FAQ (ID & EN)** — file: `src/content/faq.ts`, `src/content/faq.test.ts` (baru)
   - Jawaban `payment`, `group-size`, `cancellation` (ID & EN): buang awalan "TODO: sesuaikan…" / "TODO: adjust…" dan rapikan kalimat supaya wajar dibaca pengunjung. Isi (30%, 14 hari, minimal 15 peserta, pindah tanggal/pengembalian penuh) dipertahankan.
   - `cancellation` tinggal instruksi ke pemilik kalau hanya dibuang awalannya; ubah jadi kalimat untuk pengunjung dengan makna yang sama, contoh: ID "Ketentuan pembatalan, termasuk tenggat dan besaran potongan biaya di tiap tahap, kami jelaskan saat pemesanan. Hubungi kami lewat WhatsApp untuk rinciannya." / EN "Our cancellation terms, including deadlines and the fee retained at each stage, are explained when you book. Message us on WhatsApp for the details."
   - Komentar JSDoc `TODO` di baris atas array boleh tetap.
   - Test baru: setiap `question` dan `answer` di `faq` (semua locale) tidak mengandung string `TODO` (case-insensitive) dan tidak kosong.
   - Commit: `fix(content): remove visible TODO markers from FAQ answers`

2. [ ] **Ganti fallback `SITE_URL` ke `https://bungawisata.co.id`** — file: `src/content/site.ts`, `src/content/site.test.ts` (baru), `README.md`, `docs/KONTEN-PLACEHOLDER.md`
   - `src/content/site.ts`: fallback `https://bungawisata.com` → `https://bungawisata.co.id`. Pertimbangkan `??` → `||` supaya env berisi string kosong juga jatuh ke fallback (bukan `new URL("")` yang error).
   - Jangan ubah `email: "halo@bungawisata.com"` (konten karangan, di luar scope).
   - Pastikan semua pemakai URL absolut sudah lewat `SITE_URL` (hasil survei planner: `src/app/[locale]/layout.tsx` metadataBase, `src/lib/metadata.ts` canonical + hreflang + x-default, `src/app/sitemap.ts`, `src/app/robots.ts`, JSON-LD di `src/app/[locale]/page.tsx` dan `src/app/[locale]/paket/[slug]/page.tsx`). OG image memakai metadataBase. Tidak ada domain hardcoded lain di `src/` selain email. Kalau builder menemukan yang lain, arahkan ke `SITE_URL`.
   - Test baru `src/content/site.test.ts`: dengan `vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined)` + `vi.resetModules()` + dynamic import, `SITE_URL === "https://bungawisata.co.id"`; dengan env `https://contoh.test/` hasilnya `https://contoh.test` (trailing slash dibuang).
   - `README.md` baris contoh env (`NEXT_PUBLIC_SITE_URL=https://bungawisata.com`) → `https://bungawisata.co.id`.
   - `docs/KONTEN-PLACEHOLDER.md` baris `SITE_URL`: nilai sekarang `https://bungawisata.co.id`, catat bahwa domain belum terdaftar.
   - Commit: `fix(seo): default SITE_URL to bungawisata.co.id`

3. [ ] **Gerbang: tunggu `docs/design.md` disetujui** — tidak ada file diubah.
   - Builder hanya mengerjakan item yang ditandai disetujui di `docs/design.md`. Item yang tidak disetujui atau bertentangan dengan "Di luar scope" dilewati dan dicatat di Progress.

4. [ ] **Grup A — layout global** (Header, MobileNav, LocaleSwitcher, Footer, FloatingWhatsApp, ScrollToTop, token di `globals.css`, komponen shared seperti `Button`, `Section`, `PageHeader`) — file: `src/components/layout/*`, `src/components/shared/*`, `src/app/globals.css`, `src/app/[locale]/layout.tsx` sesuai item design.md
   - Kerjakan item design.md yang berlabel global/shared. Perubahan token tidak boleh mengganti palet atau font.
   - Commit: `style(layout): <ringkas item>`

5. [ ] **Grup B — Beranda** (`/`, `/en`) — file: `src/app/[locale]/page.tsx`, `src/components/home/*`, `src/messages/{id,en}.json` (hanya kalau item butuh teks UI baru; teks ID & EN wajib ditambah bersamaan)
   - Commit: `style(home): <ringkas item>`

6. [ ] **Grup C — Daftar paket** (`/paket`, `/en/packages`) — file: `src/app/[locale]/paket/page.tsx`, `src/components/package/PackageBrowser.tsx`, `PackageCard.tsx`, `src/components/shared/Select.tsx`, `EmptyState.tsx`
   - Commit: `style(packages): <ringkas item>`

7. [ ] **Grup D — Detail paket** (`/paket/[slug]`, `/en/packages/[slug]`) — file: `src/app/[locale]/paket/[slug]/page.tsx`, `src/components/package/{ItineraryTimeline,InclusionList,PackageGallery,PriceBox}.tsx`
   - Tombol unduh PDF itinerary dan CTA WhatsApp harus tetap berfungsi.
   - Commit: `style(package-detail): <ringkas item>`

8. [ ] **Grup E — Galeri & Testimoni** — file: `src/app/[locale]/galeri/page.tsx`, `src/app/[locale]/testimoni/page.tsx`, `src/components/shared/TestimonialCard.tsx`
   - Isi testimoni tidak diubah.
   - Commit: `style(gallery,testimonials): <ringkas item>`

9. [ ] **Grup F — Tentang kami & Kontak** — file: `src/app/[locale]/tentang-kami/page.tsx`, `src/app/[locale]/kontak/page.tsx`, `src/components/shared/FaqAccordion.tsx`
   - Commit: `style(about,contact): <ringkas item>`

10. [ ] **Grup G — Halaman 404** — file: `src/app/[locale]/not-found.tsx`
    - Commit: `style(404): <ringkas item>`

11. [ ] **Swa-cek akhir builder** — tidak ada file diubah kecuali perbaikan kecil yang ditemukan (commit terpisah `fix(ui): …`)
    - Jalankan seluruh `## Verify`. Buka tiap halaman ID & EN di 375px dan cek `document.documentElement.scrollWidth <= window.innerWidth`.

> Grup 4–10 yang tidak punya item disetujui di `docs/design.md` dilewati (catat "tidak ada item" di Progress). Kalau satu grup punya banyak item, boleh dipecah jadi beberapa commit, tetapi jangan menggabungkan dua grup dalam satu commit.

## Acceptance checklist
> Hanya tester yang mencentang, setelah melihatnya sendiri. Jangan dihapus atau dilunakkan.

Halaman yang diuji (ID / EN): `/` · `/en`; `/paket` · `/en/packages`; `/paket/bali-4d3n` · `/en/packages/bali-4d3n` (plus satu paket lain bebas); `/galeri` · `/en/gallery`; `/testimoni` · `/en/testimonials`; `/tentang-kami` · `/en/about`; `/kontak` · `/en/contact`; `/halaman-tidak-ada` · `/en/halaman-tidak-ada` (404).

- [x] Verify: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` semuanya exit 0
- [x] `npm test` menjalankan test baru `src/content/faq.test.ts` dan `src/content/site.test.ts`, keduanya lulus
- [x] Tidak ada "TODO" terlihat: di setiap halaman di atas (ID & EN), setelah semua `<details>` FAQ di Kontak dibuka, `document.body.innerText` tidak mengandung `TODO` (case-insensitive)
- [x] Jawaban FAQ uang muka, minimal peserta, dan pembatalan (ID & EN) terbaca sebagai kalimat utuh untuk pengunjung, tanpa kata "sesuaikan"/"adjust" yang ditujukan ke pemilik — cara cek: buka accordion di `/kontak` dan `/en/contact`
- [x] `grep -rn "bungawisata\.com" src README.md` hanya menemukan `email: "halo@bungawisata.com"` di `src/content/site.ts`
- [ ] SITE_URL: dengan dev/prod server berjalan, `/sitemap.xml` dan `/robots.txt` memakai origin yang sama dengan `SITE_URL` efektif (fallback `https://bungawisata.co.id` bila env tidak di-set); `<link rel="canonical">`, `<link rel="alternate" hreflang="id|en|x-default">`, dan `og:url`/`og:image` di `/` dan `/en/packages/bali-4d3n` memakai origin yang sama. Kalau `.env.local` menimpa nilainya, tester mencatat origin yang terpakai dan mengandalkan `site.test.ts` untuk fallback
  - FAIL (tester): sitemap/robots/canonical/hreflang/og:image = https://bungawisata.co.id (OK), tetapi `og:url` tidak ada sama sekali di `/` maupun `/en/packages/bali-4d3n` (tidak pernah di-set, sudah begitu sebelum perubahan).
- [ ] Setiap item disetujui di `docs/design.md` terlihat di desktop 1280px — bukti: screenshot per item
  - FAIL (tester): A2 tautan panah beranda 41px (<44); A7 kontras subjudul /tentang-kami p5 3.04:1 di 1280. Item lain terlihat (lihat Verification).
- [ ] Setiap item disetujui di `docs/design.md` terlihat di mobile 375px — bukti: screenshot per item
  - FAIL (tester): A2 belum penuh — tautan panah "Lihat galeri lengkap"/"Baca semua testimoni" (EN juga) tinggi 41px, nomor WA besar di Kontak 40px (<44). A7 — kontras subjudul PageHeader di /tentang-kami <4.5:1 (p5 1.88 di 375, 3.04 di 1280) dan /kontak 375 (p5 2.52).
- [x] Desktop 1280px: semua halaman di atas (ID & EN) tanpa scroll horizontal (`scrollWidth <= innerWidth`) dan tanpa error di console
- [x] Mobile 375px: semua halaman di atas (ID & EN) tanpa scroll horizontal dan tanpa error di console; menu mobile bisa dibuka-tutup dan pengalih bahasa berfungsi
- [x] CTA WhatsApp (header/floating/kartu paket/detail paket/kontak) masih membuka URL `wa.me`/`api.whatsapp.com`; tombol unduh PDF di detail paket masih mengunduh PDF (HTTP 200, `application/pdf`)
- [x] Identitas tetap: palet, font (Playfair Display heading, Inter body), dan logo tidak berubah — bandingkan dengan screenshot sebelum perubahan
- [x] Konten karangan tidak berubah: `git diff <sha-awal>..HEAD -- src/content/testimonials.ts src/content/packages` kosong, dan di `src/content/site.ts` hanya baris fallback `SITE_URL` yang berubah
- [x] Tidak ada push: `git status` menunjukkan branch `master` ahead dari `origin/master` (commit belum di-push)

## Pertanyaan terbuka
- Wawancara menyebut branch `main`, tetapi repo memakai `master`. Plan memakai `master`.
- Apakah `NEXT_PUBLIC_SITE_URL` di-set di `.env.local` dan di Environment Variables Vercel? Kalau di Vercel masih `https://bungawisata.com` atau `*.vercel.app`, perubahan fallback tidak berpengaruh di produksi (mengubah Vercel di luar scope).
- `bungawisata.co.id` belum terdaftar. Kalau di-push sebelum domain aktif, canonical/sitemap di `bungawisata.vercel.app` menunjuk ke domain yang belum hidup — push sebaiknya menunggu domain aktif, atau env Vercel sementara diset ke URL vercel.app.

## Progress
> Builder menambah satu baris per langkah: tanggal · langkah · sha · catatan.

- 2026-09-28 · 1 · 6183e7e · TODO dibuang dari jawaban FAQ payment/group-size/cancellation (ID+EN); cancellation ditulis ulang untuk pengunjung; test baru `faq.test.ts`. Catatan: repo baru di-clone perlu `npx next typegen` sebelum `tsc` (PageProps/LayoutProps global).
- 2026-09-28 · 2 · 74b0471 · Fallback SITE_URL → https://bungawisata.co.id, `??` → `||`; test `site.test.ts` (3 kasus); README + KONTEN-PLACEHOLDER. Tidak ada domain hardcoded lain. `og:url` memang tidak pernah di-set (sudah begitu sebelum perubahan).
- 2026-09-28 · 3 · — · Gerbang: dipakai keputusan di wawancara (P1+P2 disetujui, P3 dilewati: A8, B6, B7, D4, D5; E2 = hapus; B3 = boleh).
- 2026-09-28 · 4 (A) · c06372e, b51f301, 779ed3a, e0014f6, e847113, d157267 · A1 `amount: "some"`; A2 target sentuh 44px (LocaleSwitcher, MobileNav via NavLink `variant="mobile"`, Button sm/md, footer, tautan panah, "Kembali ke daftar paket"); A3 `ClosingCta` baru di Beranda/Tentang/Testimoni, `CtaBanner` dihapus; A4+A5 tombol WA mengambang lebih kecil di HP + disembunyikan saat menu terbuka, ruang bawah footer; A6 `SectionHeading` aksi setelah subjudul di HP (+`hideActionOnMobile`); A7 gradien/padding PageHeader. C1 selesai lewat A1.
- 2026-09-28 · 5 (B) · 8f68316, 9ad1413, 08df3bf, abc7e90 · B1 foto hero HP (bromo-kaldera) + B2 tombol full-width + B3 hero → bromo-kaldera, region → raja-ampat-gugusan / jepang-chureito; B4 scroll-padding + jalur ke tepi viewport di lg; B5 WhyUs 2×2 tanpa nomor.
- 2026-09-28 · 6 (C) · 38fce11, fbf29d2, dfd0e6c, d508613 · C2 segmen region 3 kolom + tombol Filter (`Packages.filters.toggle` ID+EN, `aria-expanded`); C3 durasi pindah ke baris eyebrow; C4 label harga 0.75rem; C5 padding. Surprise: di 320px label segmen tidak muat satu baris → dibiarkan wrap (fix d508613); di 375 muat.
- 2026-09-28 · 7 (D) · 694d976, b53db36 · D2 galeri persegi, layout per jumlah foto, hover 1.03; D1 bilah sticky: harga utuh + PDF ikon 44px + "Tanya/Ask" (`PackageDetail.askShort`), terukur muat di 320 & 375 untuk Rp 24.900.000 / IDR 24,900,000; D3 `PackageFacts` di bawah ringkasan (<lg) memakai hook fakta bersama dengan PriceBox.
- 2026-09-28 · 8 (E) · ae96ae0, b12c53d, d66a6f3, 238bdc4 · E1 bintang emas solid, kutipan utuh, tanpa tabIndex/hover; E4 varian `quote` 2 kolom di /testimoni; E2 `Gallery.placeholderNote` + pemakaiannya dihapus; E3 keterangan galeri selalu terlihat (span 2 → rasio 8/3).
- 2026-09-28 · 9 (F) · ef151db, 85168a2 · F1 Kontak dibuka blok WhatsApp (nomor besar + tombol + jam), kanal lain berlabel 44px; F2 lokasi 2 kolom + "Buka di Google Maps" (`Contact.openMaps`), section kanal berikon dihapus; F3 CTA WA setelah FAQ; F4 cerita 2 kolom (judul+foto sticky, pakai `<section>` biasa karena `overflow-hidden` di Section mematikan sticky), nilai tanpa kotak/ikon.
- 2026-09-28 · 10 (G) · 179ff4e, b3ec188 · G1 catch-all `[locale]/[...rest]/page.tsx` → `notFound()`; /halaman-tidak-ada dan /en/halaman-tidak-ada kini 404 bermerek (HTTP 404); G2 404 emas-600 + "Lihat paket wisata" (`NotFound.packagesCta`) + WA. Root `app/not-found.tsx` tidak perlu (proxy selalu menambah locale).
- 2026-09-28 · 11 · d508613 · Swa-cek di `next start` :3000: 17 halaman × 375/1280 `scrollWidth <= innerWidth`, tanpa "TODO" (FAQ dibuka), tanpa error console selain 404 dokumen di halaman 404; tidak ada kartu tertahan opacity 0 setelah scroll; sitemap/robots/canonical/hreflang = https://bungawisata.co.id; PDF 200 application/pdf.
- 2026-09-28 · fix ronde 1 · 606964f, 3396001, 84d819f, 190e958 · (1) `buildOpenGraph` di `src/lib/metadata.ts`: og:url absolut = canonical di semua halaman ber-canonical; siteName/type/locale ikut diisi dan og:image induk diteruskan lewat `parent` (metadata digabung dangkal, jadi tanpa itu og:image hilang). (2) "Lihat galeri lengkap"/"Baca semua testimoni" + nomor WA Kontak `min-h-11` → 44px. (3) PageHeader: lapisan rata ink/65 di <lg, gradien ≥ink/70 sampai 60% lebar di lg, subjudul white/90; terukur dari piksel latar paling terang ≥5.2:1 di 10 halaman × 375/1280. `docs/plans/_tmp_f.js` tidak ada.

## Verification
> Diisi tester: perintah + exit code, PASS/FAIL per item + bukti (screenshot/output), bug + cara reproduksi.

### Verifikasi tester — 2026-09-28 (HEAD 604f00d, `next start` :3000 PID 11364, dihentikan dengan `taskkill //PID 11364`)

**Verify (CLAUDE.md)** — tanpa perlu `next typegen` (types sudah ada):
- `npm run lint` → exit 0
- `npx tsc --noEmit` → exit 0
- `npm test` → exit 0 (7 files, 63 tests); `vitest run src/content/faq.test.ts src/content/site.test.ts` → 2 files, 4 tests passed
- `npm run build` → exit 0

**Acceptance**
- Verify exit 0 — PASS
- Test baru faq/site lulus — PASS
- Tanpa "TODO" (16 halaman × 1280/375, semua `<details>` dibuka) — PASS
- FAQ uang muka/minimal peserta/pembatalan kalimat utuh ID+EN — PASS (satu-satunya "disesuaikan" adalah pertanyaan pengunjung "Bisakah itinerary disesuaikan…", bukan instruksi pemilik)
- grep `bungawisata.com` → hanya `src/content/site.ts:58 email` — PASS
- SITE_URL — **FAIL**: robots `Sitemap: https://bungawisata.co.id/sitemap.xml`, sitemap 60 URL semua `https://bungawisata.co.id`, canonical + hreflang id/en/x-default + og:image di `/`, `/en`, `/paket/bali-4d3n`, `/en/packages/bali-4d3n` semua origin itu. Tetapi `<meta property="og:url">` tidak ada. Repro: `curl -s localhost:3000/ | grep og:url` → kosong.
- Item design 1280 — **FAIL** (A2, A7; lihat di bawah)
- Item design 375 — **FAIL** (A2, A7)
- 1280 tanpa horizontal scroll / console error — PASS (scrollWidth 1280 di 16 halaman; satu-satunya error "Failed to load resource: 404" di dua URL 404, sesuai harapan karena status dokumen 404)
- 375 tanpa horizontal scroll / console error; menu buka-tutup; pengalih bahasa — PASS (scrollWidth 375 di 16 halaman; menu terbuka `[data-mobile-nav-open]`, klik EN → `/en`, menu tertutup; tombol Tutup menutup)
- CTA WA + PDF — PASS (semua CTA `https://wa.me/6281233909129?text=…`; `/api/itinerary/{id,en}/bali-4d3n` 200 `application/pdf`, tombol punya atribut `download`)
- Identitas — PASS (diff `globals.css` hanya +10 baris tanpa warna/font; screenshot tetap Playfair/Inter, logo sama)
- Konten karangan — PASS (diff testimonials/packages kosong; site.ts hanya baris fallback + komentar)
- Tidak ada push — PASS (`master...origin/master [ahead 29]`)

**Item design P1/P2 (screenshot di `docs/design-audit/after/`, gitignored)**
- A1 PASS — kartu /paket, /en/packages, ?region=luar-negeri di 375 opacity 1 setelah scroll (`A1-cards-mobile.png`, `A1-cards-en-mobile.png`)
- A2 **FAIL (sebagian)** — OK: ID/EN 44×44, menu mobile 44 tinggi, footer 44, segmen 106×44, sticky 44, tombol hero 53. Kurang: "Lihat galeri lengkap"/"Baca semua testimoni" (+EN) 41px (`-my-3 py-3` dengan teks 0.72rem); nomor WA di Kontak 277×40. Repro: 375×812, `/`, ukur `getBoundingClientRect().height` tautan `a[href="/galeri"]` di main → 41.
- A3, A4 (WA mengambang 48px, right/bottom 16, disembunyikan saat menu terbuka), A5, A6 — PASS (`home-*-*.png`, `A2-mobilenav-mobile.png`)
- A7 **FAIL** — gradien baru terpasang (ink/90→/60→/10), tinggi header 303px (/paket 1280). Kontras subjudul white/70 diukur per piksel latar (5th percentile): /paket 7.7 (1280) / 4.7 (375), /testimoni 5.5 / 4.7, /galeri 4.9 / 4.7, /kontak 5.3 / **2.5**, /tentang-kami **3.0** / **1.9**. Repro: buka `/tentang-kami` di 375×812, subjudul di atas langit senja terang (`A7-pageheader-tentang-mobile.png`, `A7-pageheader-tentang-desktop.png`, `A7-pageheader-kontak-mobile.png`).
- B1 PASS — foto hero 375×281 tepat di bawah header (top 77) (`B1-hero-mobile.png`); B2 PASS (dua tombol 335px); B3, B4, B5 PASS (`home-id-desktop.png`, `home-id-mobile.png`)
- C2 PASS — segmen 3×106×44, satu baris; tombol FILTER/FILTERS `aria-expanded` false→true (`C2-filter-mobile.png`, `C2-filter-open-mobile.png`, `-en-`); C3–C5 PASS (`paket-*`)
- D1 PASS — bilah fixed di 375: "Rp 24.900.000" dan "IDR 24,900,000" utuh (scrollWidth = clientWidth), PDF ikon 44×44 `[download]`, "TANYA"/"ASK" 44 tinggi (`D1-sticky_*-mobile.png`); D2, D3 PASS (`bali-*`)
- E1, E2 (catatan stok hilang), E3, E4 PASS (`galeri-*`, `testi-*`)
- F1 PASS — blok WhatsApp pertama, nomor besar + tombol wa.me + jam (`F1-contact-mobile.png`, `F1-contact-en-mobile.png`); F2, F3, F4 PASS (`kontak-*`, `tentang-*`)
- G1 PASS — `/halaman-tidak-ada` & `/en/halaman-tidak-ada` HTTP 404, header+footer bermerek (`G1-404-mobile.png`, `viewport_halaman-tidak-ada-desktop.png`); G2 PASS

**Hasil: FAIL** — A2 (dua tautan 41px, nomor WA 40px), A7 (kontras subjudul /tentang-kami & /kontak mobile), og:url tidak ada.
