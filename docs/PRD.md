# PRD — Bunga Wisata (website company profile & katalog paket)

> Apa dan kenapa. Bukan cara. Satu file per repo; tiap fitur besar punya bagian sendiri di "Fitur".

## Masalah
Bunga Wisata (usaha tour & travel keluarga, Karangploso, Malang) butuh situs yang meyakinkan calon pelanggan untuk menghubungi lewat WhatsApp. Situs sudah berisi hasil Rencana V2 (tema hitam–gading–emas, Playfair Display + Inter, 14 paket, PDF itinerary), tapi belum pernah diaudit tampilannya secara menyeluruh, masih menampilkan penanda "TODO:" di jawaban FAQ, dan URL absolutnya (canonical, sitemap, OG) masih menunjuk ke `bungawisata.com`, domain yang bukan milik user.

## Pengguna
- Calon pelanggan tour & travel — kebanyakan membuka dari HP; ingin melihat paket, harga indikatif, itinerary, lalu bertanya lewat WhatsApp.
- Pemilik usaha (papa) — ingin situs yang tampak profesional dan bisa dibagikan dengan domain sendiri (`bungawisata.co.id`).

## Tujuan & ukuran sukses
- Setiap halaman (ID & EN) tampil rapi di desktop 1280px dan mobile 375px: tanpa scroll horizontal, tanpa error console.
- Tidak ada teks "TODO" yang terlihat oleh pengunjung di halaman mana pun.
- Semua URL absolut (metadataBase, canonical, hreflang, sitemap, robots, OG, JSON-LD) memakai `https://bungawisata.co.id` bila `NEXT_PUBLIC_SITE_URL` tidak di-set.
- Semua CTA tetap mengarah ke WhatsApp.

## Fitur

### Poles tampilan sebelum domain bungawisata.co.id (2026-09-28)
- **Cerita pengguna:** Sebagai calon pelanggan yang membuka dari HP, saya ingin situs yang rapi dan mudah dibaca di semua halaman supaya saya yakin untuk menghubungi Bunga Wisata lewat WhatsApp.
- **Alur utama:**
  1. Designer mengaudit semua halaman (beranda, paket, detail paket, galeri, testimoni, tentang kami, kontak, 404) di 1280 & 375, ID & EN, lalu menulis daftar perbaikan di `docs/design.md`.
  2. User menyetujui item perbaikan di gerbang.
  3. Builder menghapus penanda "TODO" di jawaban FAQ, mengganti fallback `SITE_URL` ke `https://bungawisata.co.id`, lalu mengerjakan item desain yang disetujui per halaman/section.
  4. Tester memverifikasi (Verify + cek visual 1280 & 375, ID & EN).
- **Aturan bisnis:**
  - Identitas dipertahankan: palet (ink/canvas/gold), font (Playfair Display + Inter), logo. Layout section yang lemah boleh dirombak.
  - Jawaban FAQ dipertahankan isinya; hanya penanda "TODO: sesuaikan…/adjust…" yang hilang, dan kalimat hasilnya harus tetap wajar dibaca pengunjung. Komentar `TODO` di kode boleh tetap.
  - `NEXT_PUBLIC_SITE_URL` tetap bisa menimpa fallback.
  - Semua CTA tetap ke WhatsApp.
- **Di luar scope:**
  - Konten karangan (testimoni fiktif, statistik 2.500/40/10, email, akun sosmed, "sejak 2015", harga indikatif) — dibiarkan apa adanya (lihat `docs/KONTEN-PLACEHOLDER.md`).
  - Foto asli, konten nyata, fitur baru.
  - Deploy, push ke remote, pengaturan Vercel/DNS, pendaftaran domain.
- **Plan:** `docs/plans/2026-09-28-poles-tampilan.md`

## Batasan
- Stack: Next.js 16 (App Router, versi dengan breaking changes — baca `node_modules/next/dist/docs/`), next-intl (ID tanpa prefix, EN di `/en` dengan path terlokalisasi), Tailwind v4, motion, Vitest.
- Perangkat: mobile-first (375px) dan desktop (1280px).
- Bahasa: Indonesia (default) dan Inggris.
- Repo public: jangan menaruh secret; `.env.local` tidak disentuh.
- Push ke `master` memicu deploy Vercel — hanya dengan izin user.

## Pertanyaan terbuka
- Domain `bungawisata.co.id` belum terdaftar (per 2026-09-28). Kalau perubahan fallback di-deploy sebelum domain aktif, canonical/sitemap di `bungawisata.vercel.app` akan menunjuk ke domain yang belum hidup — kapan boleh push?
- Apakah env `NEXT_PUBLIC_SITE_URL` di Vercel/`.env.local` sudah di-set? Kalau ya, nilainya yang dipakai, bukan fallback.
