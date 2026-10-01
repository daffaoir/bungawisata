# Pesan WA paket, form penawaran paket, kebijakan privasi, rapikan

Tanggal: 2026-10-01. Asal: riset best practice landing page tour (sesi yang sama
dengan migrasi Cloudflare), "Paket A". Tracking klik WA **tidak** dikerjakan
(keputusan user: belum dibutuhkan; bisa ditambah nanti, mis. Umami Cloud).

## Keputusan wawancara

- Pesan WA paket: tambah URL halaman paket + baris isian "Rencana tanggal" dan
  "Jumlah peserta" yang tinggal dilengkapi pelanggan.
- Form minta penawaran ringkas di halaman detail paket, di bawah itinerary
  (akhir kolom konten), nama paket + URL terisi otomatis, hasilnya pesan WA.
- Kebijakan Privasi langsung tayang, ditautkan di footer; papa review menyusul.
- Tambahan user: ganti foto yang burik, dan galeri bisa diklik untuk melihat
  foto lebih besar.

## Langkah

1. **Pesan WA paket** (`src/messages/{id,en}.json` `WhatsApp.package`,
   `WhatsAppCta`): prop baru `packageUrl`; pesan menjadi
   `Halo …, saya tertarik dengan paket "{packageTitle}".\n{packageUrl}\n\nRencana tanggal:\nJumlah peserta:`.
   `PriceBox` dan `StickyPriceBar` mengirim URL absolut (`absoluteUrl`, locale aktif).
2. **Form penawaran paket**: `QuoteRequestForm` dapat mode paket (prop
   `packageInfo: { title, url }`): tanpa pilihan layanan, tujuan, dan budget;
   wajib nama + jumlah peserta; pesan diawali sapaan yang menyebut paket + URL.
   Dipasang di `paket/[slug]/page.tsx` dengan `id="penawaran"` setelah galeri.
   Tombol "Tanya paket ini" tetap ke WA langsung.
3. **Kebijakan Privasi**: route `/kebijakan-privasi` (EN `/privacy-policy`),
   konten dua bahasa di `src/content/privacy.ts` (format sections seperti
   panduan). Isi faktual: pengendali data (CV. Bunga Wisata Malang + alamat),
   situs tidak punya form yang menyimpan data/akun/pembayaran online, form hanya
   menyusun pesan WA, data yang diterima lewat WA/telepon/email dan tujuannya,
   cookie `NEXT_LOCALE` (bahasa), Cloudflare Web Analytics tanpa cookie,
   Cloudflare sebagai hosting (log keamanan), peta Google di /kontak, pihak
   ketiga (WhatsApp/Meta, maskapai/hotel saat pemesanan), retensi, hak subjek
   data per UU 27/2022 (akses, koreksi, hapus, tarik persetujuan), kontak,
   tanggal berlaku. Metadata + hreflang + breadcrumb JSON-LD, masuk sitemap,
   tautan di baris bawah footer.
4. **Rapikan**:
   - `priority` → `preload` (perilaku sama di Next 16) di hero paket, panduan,
     `PageHeader`, `HeroSlideshow`.
   - `LogoMark`: hapus `priority` (logo bukan LCP; preload-nya bersaing dengan
     hero) dan `width/height` 512 → 40 (ukuran tampil `size-10`), supaya srcset
     48/96w, bukan 640/1080w.
   - Link "Lewati ke konten" (skip link) di layout, target `<main id="konten">`.
   - `docs/KONTEN-PLACEHOLDER.md`: hapus baris `Home.whyUs` yang sudah tidak ada,
     tambah baris Kebijakan Privasi (perlu review papa).
5. **Foto burik**: semua 75 foto stok berukuran 2560px, jadi buriknya dari foto
   aslinya (lembut/berbintik/kompresi), bukan setelan `next/image`. Saring
   dengan metrik ketajaman + cek visual potongan pada ukuran tampil, lalu ganti
   yang buruk dengan foto Unsplash lain (destinasi sama) lewat
   `scripts/download-stock-images.mjs` (ID baru + `--force` untuk kunci itu).
   Lembar perbandingan lama vs baru ditunjukkan ke user sebelum commit.
   `docs/CREDITS-FOTO.md` ikut diperbarui.
6. **Lightbox galeri**: klik foto di `/galeri`, galeri halaman detail paket,
   dan mosaic beranda membuka foto besar. Komponen client tanpa dependensi
   (`<dialog>` native): tombol tutup, sebelumnya/berikutnya, keterangan,
   keyboard (Esc, ←/→), geser di HP, fokus kembali ke foto asal, scroll
   halaman terkunci. Foto besar `sizes="100vw"`, `quality={85}`.
7. Test unit untuk pesan WA paket (`buildQuoteMessage`/pesan paket) dan konten
   privasi (dua bahasa punya jumlah section yang sama, tanpa TODO).

## Acceptance checklist

- [x] Klik "Tanya paket ini" di `/paket/bromo-ijen-4d3n` membuka wa.me dengan
      teks berisi nama paket, URL `https://bungawisata.co.id/paket/bromo-ijen-4d3n`,
      dan baris "Rencana tanggal:" + "Jumlah peserta:"; versi `/en/packages/…`
      berbahasa Inggris dengan URL `/en/packages/…`. Sama untuk sticky bar mobile.
- [x] Halaman detail paket punya form penawaran (nama, tanggal, jumlah peserta,
      kota jemput); kirim tanpa nama/peserta → pesan error; isi lengkap → membuka
      wa.me berisi nama paket + URL + isian.
- [x] Form di `/kontak` dan `/layanan/[slug]` tetap seperti sebelumnya.
- [x] `/kebijakan-privasi` dan `/en/privacy-policy` 200, punya canonical +
      hreflang, ada di sitemap, ditautkan dari footer di semua halaman.
- [x] Tidak ada lagi `priority` pada `next/image` di `src/`; logo header memuat
      varian ≤ 96w.
- [x] Tab pertama di halaman memunculkan "Lewati ke konten", Enter memindah fokus
      ke konten utama.
- [x] Foto yang tersaring buruk sudah diganti; lembar lama vs baru disetujui user;
      kredit foto diperbarui.
- [x] Klik foto di `/galeri`, galeri detail paket, dan mosaic beranda membuka
      lightbox; Esc/tombol tutup menutup, ←/→ dan tombol pindah foto, geser di
      HP pindah foto, fokus kembali ke foto asal.
- [x] Tampilan desktop 1280px dan mobile 375px rapi (detail paket + privasi).
- [x] Verify: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`
      exit 0; `npx opennextjs-cloudflare build` + `npm run cf:size` di bawah batas.

## Verifikasi (2026-10-01)

- `npm run lint` 0, `npx tsc --noEmit` 0, `npm test` 0 (143 test),
  `npx opennextjs-cloudflare build` 0 (termasuk `npm run build`),
  `npm run cf:size` OK 2908 KiB / 3072 KiB.
- Dev server + Playwright (1280px & 375px): pesan WA paket berisi nama, URL
  `https://bungawisata.co.id/paket/bromo-ijen-4d3n`, dan baris isian; form paket
  menolak isian kosong dan menyusun pesan lengkap; lightbox buka/←/→/Esc, scroll
  halaman kembali normal, fokus kembali ke foto asal; `/en/privacy-policy`
  tampil; Tab pertama memunculkan "Skip to content"; logo srcset 48/96w.
- Bug ditemukan & diperbaiki saat cek: event `close` dialog tidak selalu sampai
  sehingga scroll halaman tetap terkunci; `close()` kini me-reset state sendiri.
- 9 foto diganti setelah user menyetujui lembar perbandingan.
- Tester subagent dan `/code-review` dilewati atas permintaan user.
