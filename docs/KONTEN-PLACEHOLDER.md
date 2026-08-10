# Daftar Konten Karangan

Berkas ini mencatat **setiap hal di situs yang saya karang**, bukan yang Anda
berikan. Tujuannya satu: supaya Anda tidak perlu menebak mana yang aman
dibiarkan dan mana yang wajib diganti sebelum situs ini dipublikasikan.

Kolom **Status** memakai tiga nilai:

| Status | Artinya |
|---|---|
| 🔴 **Wajib ganti** | Salah atau berpotensi menyesatkan calon pelanggan kalau dibiarkan |
| 🟡 **Sebaiknya dikoreksi** | Masuk akal secara industri, tapi belum tentu sesuai kondisi Anda |
| 🟢 **Boleh dibiarkan** | Fakta yang bisa saya verifikasi, atau teks netral yang tidak mengklaim apa pun |

---

## Yang berasal dari Anda (bukan karangan)

Supaya jelas batasnya, ini yang saya pakai apa adanya dari materi Anda:

- Logo (`assets/logo-master.png` → `public/logo-mark.png`, `public/logo-full.png`, `src/app/icon.png`)
- Nomor WhatsApp `+62 812-3390-9129`
- Alamat kantor di Karangploso, Kabupaten Malang
- Nama dan tagline "Bunga Wisata — Ur Friendly Partner for Travelling"
- Struktur PDF itinerary Bangkok–Pattaya, termasuk rute, pola hotel, dan harga Rp 7.000.000

---

## `src/content/site.ts`

| Hal | Nilai sekarang | Status | Catatan |
|---|---|---|---|
| `email` | `halo@bungawisata.com` | 🔴 Wajib ganti | Alamat ini saya karang. Muncul di halaman Kontak, footer, JSON-LD, dan **footer setiap PDF**. |
| `hours` | Sen–Jum 09.00–17.00, Sabtu 09.00–14.00, Minggu tutup | 🟡 Sebaiknya dikoreksi | Jam kerja umum, bukan jam Anda. |
| `social.instagram/facebook/tiktok` | `…/bungawisata` | 🔴 Wajib ganti | Akun-akun ini belum tentu milik Anda. Kalau belum punya, hapus saja kuncinya — footer dan JSON-LD akan menyesuaikan. |
| `stats.travelers` | 2.500 | 🔴 Wajib ganti | Angka karangan yang tampil besar di beranda. |
| `stats.destinations` | 40 | 🔴 Wajib ganti | Sama. |
| `stats.years` | 10 | 🔴 Wajib ganti | Sama. Perhatikan juga eyebrow hero "Tour & Travel sejak 2015" di `src/messages/*.json`. |
| `SITE_URL` | `https://bungawisata.com` | 🟡 Sebaiknya dikoreksi | Menentukan URL absolut di sitemap, hreflang, dan tag OG. Timpa lewat `NEXT_PUBLIC_SITE_URL`. |

---

## `src/content/testimonials.ts`

| Hal | Status | Catatan |
|---|---|---|
| Enam testimoni beserta nama, kota, dan rating | 🔴 **Wajib ganti atau hapus** | Semuanya fiktif. Menampilkan ulasan palsu berisiko secara hukum maupun reputasi. Kalau belum ada testimoni asli, kosongkan array-nya — halaman Testimoni dan bagian testimoni di beranda akan menyesuaikan. |

Kalau nanti memakai testimoni asli: minta izin tertulis sebelum menampilkan
nama lengkap pelanggan.

---

## `src/content/images.ts` dan `src/content/gallery.ts`

| Hal | Status | Catatan |
|---|---|---|
| 64 foto Unsplash | 🟡 Sebaiknya dikoreksi | Semuanya foto stok, bukan dokumentasi perjalanan Anda. Tiap URL sudah saya uji membalas HTTP 200 (`node scripts/check-images.mjs`) dan dipilih lewat pencarian per destinasi, jadi subjeknya nyambung — tapi tetap bukan foto rombongan Anda. |
| Keterangan galeri | 🟢 Boleh dibiarkan | Sengaja hanya menyebut nama tempat ("Balon udara di atas Cappadocia"), tidak mengklaim "rombongan kami di …". Begitu foto asli masuk, keterangannya boleh diubah jadi cerita perjalanan sungguhan. |

Mengganti dengan foto asli: taruh berkas di `public/images/`, lalu ubah nilai
kunci yang bersangkutan di `src/content/images.ts` menjadi
`"/images/nama-berkas.jpg"`. Setelah tidak ada lagi URL Unsplash, hapus blok
`images.remotePatterns` di `next.config.ts`.

---

## `src/content/packages/*.ts` — 14 paket

### Yang akurat dan bisa diverifikasi 🟢

- Nama objek wisata dan urutan rute yang masuk akal secara geografis
- Maskapai yang benar-benar melayani rute tersebut
- Nama hotel yang benar-benar ada di kota bersangkutan
- Ketentuan visa untuk paspor Indonesia (bebas visa Vietnam & Türkiye, visa on
  arrival UEA, visa diperlukan untuk Jepang & Korea Selatan)

### Yang indikatif 🔴 / 🟡

| Field | Status | Catatan |
|---|---|---|
| `priceFrom` | 🔴 Wajib ganti | Seluruh harga saya isi dengan kisaran pasar yang wajar, **bukan tarif Anda**. Satu-satunya pengecualian: Bangkok–Pattaya Rp 7.000.000, yang saya ambil dari PDF Anda. |
| `minPax` | 🟡 Sebaiknya dikoreksi | 12–20 untuk dalam negeri, 25–40 untuk luar negeri. Bangkok–Pattaya memakai 40 sesuai PDF Anda. |
| `hotels[].name` | 🟡 Sebaiknya dikoreksi | Hotelnya nyata dan ada di kota tersebut, tapi Anda belum tentu bekerja sama dengan mereka. Catatan tiap paket sudah menyebut "atau setaraf". |
| `hotels[].stars` | 🟡 Sebaiknya dikoreksi | Mengikuti klasifikasi umum hotel bersangkutan. |
| `airline` | 🟡 Sebaiknya dikoreksi | Maskapainya memang melayani rute itu, tapi belum tentu yang Anda pakai. |
| `departureFrom` | 🟡 Sebaiknya dikoreksi | Surabaya/Jakarta untuk luar negeri, kota gerbang untuk dalam negeri. |
| `includes` / `excludes` | 🟡 Sebaiknya dikoreksi | Termasuk nominal tipping (THB 400, SGD 30, USD 25/60, JPY 5.000, KRW 50.000, AED 120) dan jatah bagasi — angka lazim di industri, bukan ketentuan Anda. |
| Rundown harian | 🟢 Boleh dibiarkan | Destinasi dan urutannya nyata; silakan sesuaikan kalau operasional Anda berbeda. |

---

## `src/content/faq.ts`

Tiga jawaban masih diawali kata "TODO:" dan **teks itu tampil apa adanya di
halaman Kontak** — ini yang paling kentara kalau situs telanjur dipublikasikan.

| Kunci | Status | Catatan |
|---|---|---|
| `payment` — uang muka | 🔴 Wajib ganti | Menyebut DP 30% dan pelunasan H-14 sebagai "umumnya". |
| `group-size` — minimum peserta | 🔴 Wajib ganti | Menyebut 15 peserta; harus cocok dengan `minPax` tiap paket, yang sekarang berkisar 10–40. |
| `cancellation` — pembatalan | 🔴 Wajib ganti | Belum ada isinya sama sekali, hanya penanda TODO. Ini menyangkut uang pelanggan. |
| `booking`, `custom`, `visa` | 🟢 Boleh dibiarkan | Jawaban netral yang tidak menjanjikan angka apa pun. |

---

## `src/messages/{id,en}.json`

| Kunci | Status | Catatan |
|---|---|---|
| `Home.hero.eyebrow` — "Tour & Travel sejak 2015" | 🔴 Wajib ganti | Tahun berdirinya saya karang. |
| `About.intro`, `About.story` | 🔴 Wajib ganti | Sebelumnya berupa teks "TODO:", sekarang sudah saya isi dengan narasi karangan (trip pertama ke Bromo lewat WhatsApp, kantor di Karangploso, dst.) supaya halaman tidak lagi menampilkan penanda TODO mentah. Ceritanya masuk akal tapi sepenuhnya fiktif — ganti dengan sejarah asli Anda. |
| `About.values.*.description` | 🟡 Sebaiknya dikoreksi | Sama — sebelumnya "TODO:", sekarang sudah ditulis penuh. Isinya masuk akal untuk biro perjalanan pada umumnya, tapi bukan rumusan Anda; sesuaikan kalau ada penekanan berbeda. |
| `Home.whyUs.items.*` | 🟡 Sebaiknya dikoreksi | Empat janji layanan — pastikan Anda memang bisa memenuhinya. |
| `Gallery.placeholderNote` | 🟢 Boleh dibiarkan | Justru berisi pengakuan bahwa fotonya masih stok. Hapus kunci ini dan pemakaiannya di `src/app/[locale]/galeri/page.tsx` setelah foto asli masuk. |
| `PackageDetail.priceNote` | 🟢 Boleh dibiarkan | Menyatakan harga dapat berubah — aman apa adanya. |

---

## Blok yang sudah dihapus

- **Legalitas** (`About.legalTitle` / `About.legalNote`) — dihapus dari halaman
  Tentang Kami sesuai permintaan. Kalau nanti punya NIB atau keanggotaan ASITA
  yang ingin ditampilkan, blok itu perlu dibuat ulang.

---

## Urutan yang saya sarankan sebelum publikasi

1. Ganti seluruh baris 🔴 — testimoni, harga, statistik, email, media sosial,
   FAQ soal uang.
2. Koreksi baris 🟡 sesuai operasional Anda.
3. Unduh PDF salah satu paket dan bandingkan dengan lembar itinerary Anda
   sendiri.
4. Ganti foto stok dengan dokumentasi perjalanan asli.
