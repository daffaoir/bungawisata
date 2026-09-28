# Wawancara 2026-09-28 — poles tampilan sebelum domain bungawisata.co.id

- Tujuan: situs (sudah berisi hasil Rencana V2: tema hitam–gading–emas, Playfair+Inter, 14 paket) dipoles sebelum dipasang di domain bungawisata.co.id. Pemakai: calon pelanggan tour & travel, banyak dari HP; semua CTA ke WhatsApp.
- Cakupan: visual/UX + sedikit konten.
- Konten karangan (testimoni fiktif, statistik 2.500/40/10, email, sosmed, "sejak 2015", harga indikatif): **BIARKAN apa adanya**. Tidak termasuk tugas ini.
- Satu pengecualian konten: hapus awalan "TODO:" / "TODO: sesuaikan..." yang tampil ke pengunjung di jawaban FAQ (src/content/faq.ts, ID & EN). Isi jawaban dipertahankan, hanya penanda TODO yang hilang (kalimat harus tetap enak dibaca). Komentar kode TODO boleh dibiarkan.
- Visual: user minta AUDIT MENYELURUH semua halaman (beranda, paket, detail paket, galeri, testimoni, tentang kami, kontak, 404) di desktop 1280 dan mobile 375, ID dan EN. Designer mengaudit lalu mengusulkan daftar perbaikan; user menyetujui di gerbang.
- Batas: pertahankan identitas (palet, font, logo), tapi BOLEH merombak layout section tertentu yang lemah.
- Domain: ganti fallback SITE_URL di src/content/site.ts dari https://bungawisata.com (bukan milik user) ke https://bungawisata.co.id. Pastikan sitemap/robots/OG/hreflang/metadataBase ikut benar. Pemasangan domain di Vercel/DNS TIDAK termasuk.
- Tidak termasuk: konten nyata, foto asli, fitur baru, deploy, perubahan Vercel/DNS.
- Selesai = Verify di CLAUDE.md exit 0 (lint, tsc, test, build) + tester melihat tiap perbaikan yang disetujui di 1280 & 375, tanpa horizontal scroll, tanpa error console, tanpa "TODO" terlihat di halaman.
- Git: commit per langkah di main lokal; JANGAN push (push ke main memicu deploy Vercel) — boss minta izin user dulu.

## Keputusan gerbang (plan + design), 2026-09-28

- Disetujui: plan docs/plans/2026-09-28-poles-tampilan.md dan item docs/design.md prioritas **P1 + P2**. Semua **P3 dilewati** (A8, B6, B7, D4, D5, dll.).
- E2: catatan stok foto di Galeri **dihapus** (kunci pesan + pemakaiannya).
- B3: **boleh** menukar kunci foto stok supaya tidak berulang di beranda (hanya foto yang sudah terverifikasi di src/content/images.ts).
- docs/design-audit/ masuk .gitignore (tidak di-commit).
- Branch: master. Jangan push.
