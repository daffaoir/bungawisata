# Wawancara — SEO, standar, & persiapan domain (2026-09-28)

## Konteks
- `bungawisata.co.id` sudah di-checkout di **Niagahoster/Hostinger ID**, tapi masih menunggu verifikasi PANDI (e-KTP + NIB, ±3 hari). Per 2026-09-28 DNS publik masih NXDOMAIN, jadi belum bisa diarahkan.
- Situs live di `bungawisata.vercel.app` (Vercel Hobby, auto-deploy dari `master`).

## Keputusan user
| Topik | Keputusan |
|---|---|
| Target pencarian | Tour travel kecil maupun rombongan besar, tour luar negeri dari Malang, domestik (Bromo dll), rombongan/study tour |
| Konten dari papa | Anggap tidak ada. Foto dari sumber luar (stok berlisensi bebas) |
| Testimoni & statistik | **Pakai ulasan Google asli** + angka nyata (rating Google, pengikut FB). Hapus testimoni & angka karangan |
| Harga paket | Tampilkan "Mulai dari" + label **estimasi, konfirmasi via WhatsApp** |
| Email | `info@bungawisata.co.id` via **Cloudflare Email Routing** → Gmail papa. Sebelum domain aktif email disembunyikan |
| DNS | **Cloudflare** (nameserver diganti di panel Niagahoster; registrar tetap Niagahoster) |
| Data bisnis | Ikuti Google Business Profile: nama "Bunga Wisata Tour and Travel", jam Senin–Sabtu 08.00–17.00, Minggu tutup |
| Sosmed | Diperiksa asisten — ketiganya milik Bunga Wisata, dipertahankan |
| Hosting | Tetap Vercel Hobby |
| Pengukuran | Google Search Console + Vercel Web Analytics |
| Halaman baru | Ya: halaman layanan (rombongan, study tour, gathering/event, private tour) + **tiket pesawat**. Catering tidak |
| Cakupan | Sekalian semua (teknis, halaman layanan, konten, panduan/blog) |

## Data asli yang ditemukan (dicek 2026-09-28)
- **Google Business Profile** "Bunga Wisata Tour and Travel": rating 4,7 dari 30 ulasan (25×5★, 3×4★, 0×3★, 1×2★, 1×1★), 158+ foto, kategori "Biro Perjalanan dan Wisata", koordinat -7.8897902, 112.591502, Plus Code 4H6R+3J, jam Sen–Sab 08.00–17.00, Minggu tutup, telepon 0812-3390-9129, **belum ada link website**. Pemilik aktif membalas ulasan.
- **Facebook** `facebook.com/bungawisata.malang`: "Bunga Wisata Malang", 6,7 rb pengikut, nama badan usaha **CV. Bunga Wisata Malang**, "Tour Operator".
- **Instagram** `@bungawisata`: 916 pengikut; bio "tiket pesawat online / tour dalam dan luar negeri / event / catering wilayah malang"; link bio `www.bungawisatamalang.com` (domain mati, NXDOMAIN).
- **TikTok** `@ownerbungawisata`: "Owner Travel Bunga Wisata", 2.968 suka, nomor sama.
- Ulasan Google positif yang terlihat publik (kutip singkat, nama depan + inisial):
  1. Aristi V. F. — "Pelayanannya bagus banget, makanan enak, crew-nya on time, harga terjangkau … bisnya bagus-bagus." (setahun lalu)
  2. Intan N. A. — "Seneng banget sama TL-nya … pelayanannya juga bagus banget, harganya terjangkau." (setahun lalu)
  3. N — "Mantep banget pelayanannya, crew ramah-ramah, sangat dijamu saat tour. Obyek wisata juga bagus dan terupdate. Harga tour juga terjangkau … Rekomend buat yang mau tour atau event." (setahun lalu)
  4. Muhammad Ilham M. (Local Guide) — "Recommended, harganya terjangkau dan pelayanannya memuaskan." (5 tahun lalu)
