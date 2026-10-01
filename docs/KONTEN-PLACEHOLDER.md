# Daftar Konten yang Belum dari Pemilik

Berkas ini mencatat apa saja di situs yang **belum berasal dari Bunga Wisata
sendiri**, supaya jelas mana yang aman dibiarkan dan mana yang sebaiknya
diganti. Diperbarui 2026-09-29 setelah plan `docs/plans/2026-09-28-seo-domain.md`.

| Status | Artinya |
|---|---|
| 🔴 **Wajib ganti** | Bisa menyesatkan calon pelanggan kalau dibiarkan |
| 🟡 **Sebaiknya dikoreksi** | Wajar untuk biro tour, tapi belum tentu sesuai operasional Anda |
| 🟢 **Aman** | Fakta yang bisa dicek, atau teks netral tanpa klaim |

Aturan yang dipegang sejak 2026-09-28: **tidak ada testimoni, statistik, tahun
berdiri, sertifikasi, atau kebijakan karangan** di situs. Foto stok boleh,
asal tidak diklaim sebagai dokumentasi perjalanan Bunga Wisata.

---

## Sudah diganti dengan data asli 🟢

Sumbernya dicatat di `docs/interviews/2026-09-28-seo-domain.md`.

| Hal | Sumber |
|---|---|
| Nama bisnis "Bunga Wisata Tour and Travel", nama badan usaha "CV. Bunga Wisata Malang" | Google Business Profile, Facebook |
| Alamat, koordinat, telepon/WhatsApp | Google Business Profile |
| Jam buka Senin–Sabtu 08.00–17.00, Minggu tutup | Google Business Profile |
| Instagram `@bungawisata`, Facebook `bungawisata.malang`, TikTok `@ownerbungawisata` | Dicek 2026-09-28, nama & nomor cocok |
| Statistik beranda: rating 4,7 (30 ulasan Google), 6,7 rb pengikut Facebook, jumlah paket | Publik, bisa dicek |
| Empat testimoni | Kutipan ulasan publik di Google Maps |

Perbarui angka rating/pengikut di `site.proof` (`src/content/site.ts`) sesekali.

---

## Masih perlu dari pemilik

| Hal | Status | Di mana | Catatan |
|---|---|---|---|
| Email kontak | 🟡 | env `NEXT_PUBLIC_CONTACT_EMAIL` | Kosong = email disembunyikan di seluruh situs dan PDF. Isi setelah `info@bungawisata.co.id` aktif (lihat `docs/DOMAIN-LAUNCH.md` langkah 7). |
| Harga 13 paket | 🔴 | `priceFrom` di `src/content/packages/*.ts` | Masih kisaran pasar dan **ditandai "estimasi"** di kartu, detail, dan PDF (`priceIsEstimate`). Setelah harga asli ada, isi `priceFrom` dan set `priceIsEstimate: false`. Bangkok–Pattaya sudah asli. |
| `minPax`, hotel, maskapai, tipping, bagasi | 🟡 | `src/content/packages/*.ts` | Wajar untuk industri, tapi bukan ketentuan Anda. Hotel sudah bertanda "atau setaraf". |
| Titik kumpul paket | 🟡 | `departureFrom` + hari 1 itinerary | Bromo–Ijen & Yogyakarta berkumpul di Malang, Bali lewat bus dari Malang atau pesawat dari Juanda. Sesuaikan dengan operasional. |
| Kebijakan DP, minimal peserta, pembatalan | 🟡 | `src/content/faq.ts` | Sekarang netral ("dijelaskan saat pemesanan"). Tambahkan angka hanya kalau sudah pasti. |
| Teks halaman layanan | 🟡 | `src/content/services/*.ts` | Menggambarkan layanan umum biro tour. Cek kalimat ini: rencana cadangan saat cuaca buruk (gathering), pemandu lokal & kontak WA selama perjalanan (private tour), e-tiket dikirim lewat WA (tiket), bantuan mencari fasilitas kesehatan (study tour). |
| Artikel panduan | 🟢 | `src/content/guides/*.ts` | Informasi umum tanpa harga/aturan visa spesifik. Perbarui `updatedAt` kalau isinya diubah. |
| Kebijakan Privasi | 🟡 | `src/content/privacy.ts` | Draf 2026-10-01, sudah tayang di `/kebijakan-privasi`. Minta papa cek bagian retensi, pihak penerima data, dan keamanan; perbarui `PRIVACY_UPDATED_AT` kalau isinya diubah. |

---

## Foto 🟡

64 foto di `public/images/stock/` adalah foto stok Unsplash (lisensi boleh
komersial; sumber di `docs/CREDITS-FOTO.md`). Galeri sudah diberi judul
"Galeri Destinasi" dan caption hanya menyebut nama tempat; dokumentasi asli
diarahkan ke Instagram.

Mengganti dengan foto asli: taruh berkas di `public/images/`, lalu ubah kunci
yang bersangkutan di `src/content/images.ts` menjadi `"/images/nama-berkas.jpg"`.
Profil Google Maps punya 158+ foto — minta file aslinya ke papa.

---

## Blok yang sengaja tidak ada

- **Legalitas** (NIB, ASITA, dll.) — belum ditampilkan. Setelah NIB terbit
  (sedang diurus untuk domain `.co.id`), bisa ditambahkan di Tentang Kami.
- **Schema `AggregateRating`/`Review`** — sengaja tidak dipasang; Google tidak
  memberi bintang untuk ulasan bisnis tentang dirinya sendiri.
