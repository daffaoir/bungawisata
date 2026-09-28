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

- [ ] Verify: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` semuanya exit 0
- [ ] `npm test` menjalankan test baru `src/content/faq.test.ts` dan `src/content/site.test.ts`, keduanya lulus
- [ ] Tidak ada "TODO" terlihat: di setiap halaman di atas (ID & EN), setelah semua `<details>` FAQ di Kontak dibuka, `document.body.innerText` tidak mengandung `TODO` (case-insensitive)
- [ ] Jawaban FAQ uang muka, minimal peserta, dan pembatalan (ID & EN) terbaca sebagai kalimat utuh untuk pengunjung, tanpa kata "sesuaikan"/"adjust" yang ditujukan ke pemilik — cara cek: buka accordion di `/kontak` dan `/en/contact`
- [ ] `grep -rn "bungawisata\.com" src README.md` hanya menemukan `email: "halo@bungawisata.com"` di `src/content/site.ts`
- [ ] SITE_URL: dengan dev/prod server berjalan, `/sitemap.xml` dan `/robots.txt` memakai origin yang sama dengan `SITE_URL` efektif (fallback `https://bungawisata.co.id` bila env tidak di-set); `<link rel="canonical">`, `<link rel="alternate" hreflang="id|en|x-default">`, dan `og:url`/`og:image` di `/` dan `/en/packages/bali-4d3n` memakai origin yang sama. Kalau `.env.local` menimpa nilainya, tester mencatat origin yang terpakai dan mengandalkan `site.test.ts` untuk fallback
- [ ] Setiap item disetujui di `docs/design.md` terlihat di desktop 1280px — bukti: screenshot per item
- [ ] Setiap item disetujui di `docs/design.md` terlihat di mobile 375px — bukti: screenshot per item
- [ ] Desktop 1280px: semua halaman di atas (ID & EN) tanpa scroll horizontal (`scrollWidth <= innerWidth`) dan tanpa error di console
- [ ] Mobile 375px: semua halaman di atas (ID & EN) tanpa scroll horizontal dan tanpa error di console; menu mobile bisa dibuka-tutup dan pengalih bahasa berfungsi
- [ ] CTA WhatsApp (header/floating/kartu paket/detail paket/kontak) masih membuka URL `wa.me`/`api.whatsapp.com`; tombol unduh PDF di detail paket masih mengunduh PDF (HTTP 200, `application/pdf`)
- [ ] Identitas tetap: palet, font (Playfair Display heading, Inter body), dan logo tidak berubah — bandingkan dengan screenshot sebelum perubahan
- [ ] Konten karangan tidak berubah: `git diff <sha-awal>..HEAD -- src/content/testimonials.ts src/content/packages` kosong, dan di `src/content/site.ts` hanya baris fallback `SITE_URL` yang berubah
- [ ] Tidak ada push: `git status` menunjukkan branch `master` ahead dari `origin/master` (commit belum di-push)

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

## Verification
> Diisi tester: perintah + exit code, PASS/FAIL per item + bukti (screenshot/output), bug + cara reproduksi.
