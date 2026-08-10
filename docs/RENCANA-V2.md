# Bunga Wisata v2 — Rebrand Elegan, PDF Itinerary, & Konten Nyata

## Context

Versi pertama situs sudah jalan: Next.js 16 + next-intl bilingual, 6 paket contoh,
31 halaman statis, 39 test lolos. Yang dibangun kemarin memakai tema "berani &
colorful" dengan logo bunga sementara dan seluruh konten placeholder.

Sekarang tersedia materi asli dan arah baru:

| Masukan | Konsekuensi |
|---|---|
| Logo asli (PNG 11080×11080, monokrom) | Ganti `LogoMark` buatan, turunkan resolusi |
| Template PDF `Bangkok – Pattaya Tour 4h3m.pdf` | Fitur unduh PDF per paket + field data baru |
| Nomor WA `+62 812-3390-9129` | Ganti nomor dummy |
| Ganti ke tema modern & elegan | Perombakan token warna dan tipografi |
| Alamat kantor asli di Karangploso, Malang | Halaman Kontak + peta |
| Itinerary harus nyata & akurat | Tulis ulang 14 paket dengan data riil |
| Foto tidak nyambung | Ganti dengan foto Unsplash terverifikasi |

Plus 5 perbaikan UI spesifik: galeri carousel di beranda, jarak kartu CTA,
dropdown kustom, hapus tombol WA di navbar.

**Catatan kejujuran di muka.** Nama atraksi, rute, maskapai, dan nama hotel akan
akurat — itu bisa saya verifikasi. Yang **tidak** bisa saya ketahui: tarif riil
Anda, jadwal penerbangan yang berlaku saat ini, dan ketersediaan kamar. Harga
saya isi dengan kisaran pasar yang wajar dan setiap paket diberi keterangan
"harga indikatif". Semua yang saya karang akan didaftar di satu file terpisah.

---

## Bagian 1 — Identitas Visual Baru

### Logo

Sumber: `C:\Users\daffa\Downloads\logo bunga wisata.png` (11080×11080, RGBA).
Terlalu besar untuk dipakai langsung. Pakai `sharp` (sudah ada di `node_modules`
sebagai dependensi Next) lewat skrip sekali jalan untuk menghasilkan:

- `public/logo-mark.png` — 512×512, hanya bagian belah ketupat
- `public/logo-full.png` — 1200px, logo + wordmark, untuk PDF dan OG image
- `src/app/icon.png` — 512×512 favicon

`src/components/layout/Logo.tsx` diubah dari SVG buatan menjadi `next/image`
yang menunjuk file di atas. Semua pemanggil sudah lewat komponen ini, jadi tidak
ada tempat lain yang perlu disentuh.

### Palet & tipografi

Ganti isi `@theme` di `src/app/globals.css`. Logo monokrom, jadi warnanya:

| Token | Nilai | Peran |
|---|---|---|
| `--color-ink` | `#0F0F0F` | Teks utama, latar section gelap |
| `--color-ink-soft` | `#4A4A4A` | Teks sekunder |
| `--color-ink-muted` | `#6E6E6E` | Keterangan kecil |
| `--color-canvas` | `#FBFAF8` | Latar dasar (putih gading) |
| `--color-canvas-alt` | `#F3F1ED` | Latar section bergantian |
| `--color-line` | `#E4E0D9` | Garis pemisah tipis |
| `--color-gold-400` | `#C9A227` | Aksen terang, garis, ikon |
| `--color-gold-500` | `#B08D57` | Aksen utama |
| `--color-gold-600` | `#8A6D3B` | Tombol emas + teks putih (kontras 4,6:1) |
| `--color-gold-50` | `#FAF6EE` | Latar sorotan lembut |

Tipografi: **Playfair Display** (600/700) untuk heading, **Inter** untuk body —
serif tinggi kontras di atas sans netral adalah bahasa visual editorial yang
membaca sebagai elegan, dan tidak bertabrakan dengan wordmark logo yang berupa
sans geometris tebal.

Perubahan gaya lain yang membentuk kesan "modern & elegan":

- Sudut membulat dikurangi drastis: `rounded-4xl/5xl` → `rounded-none` sampai `rounded-lg`
- Bayangan tebal diganti garis rambut `border-line`
- Tombol berbentuk persegi, bukan pil
- Skala tipografi dinaikkan, jarak antarhuruf heading dirapatkan
- Animasi diperhalus: durasi naik ke ~0.7s, pergeseran diperkecil ke 16px
- Blob gradien warna-warni dihapus; diganti gerakan halus pada foto

Palet lama tetap bisa dipulihkan dari riwayat git kalau ternyata kurang cocok.

---

## Bagian 2 — Model Data Paket Diperluas

`src/lib/schema.ts` bertambah field, mengikuti struktur template PDF Anda:

```ts
{
  // ... field lama tetap
  departureFrom: "Surabaya (SUB)",   // kota keberangkatan utama
  airline: "Royal Brunei Airlines",  // opsional, kosongkan untuk paket domestik
  minPax: 40,                        // minimum peserta agar harga berlaku
  hotels: [
    { city: "Bangkok", name: "Prince Town Bangkok", nights: 2, stars: 3 },
    { city: "Pattaya", name: "Boutique Pattaya", nights: 1, stars: 3 },
  ],
  content: {
    id: {
      itinerary: [
        {
          day: 1,
          title: "Surabaya – Bangkok",
          meals: ["dinner"],           // BARU — jadi kode Mp/Ms/Mm di PDF
          activities: [...],
        },
      ],
      // ... sisanya tetap
    },
  },
}
```

Aturan validasi Zod baru, satu napas dengan pengecekan paritas yang sudah ada:

- `meals` wajib sama persis antara versi ID dan EN pada hari yang sama
- Total `nights` di `hotels` harus sama dengan `durationNights`
- `minPax` bilangan bulat positif

Setiap paket luar negeri diberi catatan tetap di `notes`: keberangkatan dapat
diatur dari kota asal lain — sesuai kenyataan bahwa tamu Anda datang dari
berbagai kota.

---

## Bagian 3 — Unduh PDF Itinerary

### Cara kerja

Route handler di `src/app/api/itinerary/[locale]/[slug]/route.ts`, memakai
`@react-pdf/renderer`. Ditaruh di bawah `/api` supaya dilewati oleh matcher
middleware next-intl di `src/proxy.ts` — jadi tidak bentrok dengan penerjemahan
path. Dengan `generateStaticParams` untuk seluruh kombinasi bahasa × paket,
Next merender semua PDF saat build sehingga tidak ada biaya runtime.

Tombol "Unduh Itinerary (PDF)" ditaruh di `PriceBox` (halaman detail, di bawah
tombol WhatsApp) dan di `StickyPriceBar` versi mobile. Nama filenya:
`Bunga Wisata - Bangkok Pattaya 4H3M.pdf`.

### Tata letak PDF

Mengikuti template Anda:

```
┌─────────────────────────────────────────┐
│  [logo]              Bangkok – Pattaya  │   header, garis emas di bawah
│                      4 Hari 3 Malam     │
│                      by Royal Brunei    │
├─────────────────────────────────────────┤
│  HARI 1   SURABAYA – BANGKOK      (Mm)  │   heading + kode makan
│  • kegiatan …                           │
│                                          │
│  HARI 2   BANGKOK – PATTAYA    (Mp-Ms)  │
│  • kegiatan …                           │
├─────────────────────────────────────────┤
│  HOTEL                 HARGA MIN 40 Org │   tabel
│  Prince Town Bangkok   Rp 7.000.000/org │
├─────────────────────────────────────────┤
│  Harga termasuk:      Harga tidak       │   dua kolom
│  1. …                 termasuk: 1. …    │
└─────────────────────────────────────────┘
    footer: WhatsApp, alamat, "harga indikatif"
```

Dua penyimpangan dari template asli, keduanya disengaja:

1. **Kegiatan ditulis sebagai butir, bukan paragraf.** Template Anda memakai
   paragraf mengalir; butir lebih mudah dipindai dan sudah jadi bentuk datanya
   di web. Kalau Anda lebih suka paragraf, itu perubahan satu fungsi saja.
2. **Font Helvetica bawaan**, bukan Playfair/Inter. Menyematkan font kustom
   butuh file TTF di repo; Helvetica sudah rapi dan membuat PDF jauh lebih kecil.

---

## Bagian 4 — Konten Nyata: 14 Paket

**Dalam negeri (7):** Bali 4H3M · Labuan Bajo & Komodo 4H3M · Raja Ampat 6H5M ·
Yogyakarta & Borobudur 3H2M · Bromo–Ijen 4H3M · Lombok & Gili 4H3M ·
Danau Toba & Samosir 4H3M

**Luar negeri (7):** Bangkok–Pattaya 4H3M · Singapura–Malaysia 4H3M ·
Vietnam (Hanoi–Ha Long) 5H4M · Jepang (Tokyo–Fuji–Kyoto–Osaka) 7H6M ·
Korea Selatan 6H5M · Turki 9H8M · Dubai–Abu Dhabi 5H4M

Yang **akurat dan bisa diverifikasi**: nama objek wisata, urutan rute yang masuk
akal secara geografis, maskapai yang benar-benar melayani rute tersebut, nama
hotel yang benar-benar ada di kota bersangkutan, serta ketentuan visa yang
berlaku untuk paspor Indonesia.

Yang **indikatif dan harus Anda koreksi**: harga per orang, minimum peserta,
serta pilihan hotel — semua paket memakai frasa standar industri "atau setaraf".

Paket Bangkok–Pattaya disusun mengikuti PDF Anda (rute, hotel, dan struktur
harga yang sama) supaya bisa jadi acuan bentuk yang Anda harapkan.

### Foto

File baru `src/content/images.ts` berisi ±40 URL Unsplash yang **saya uji satu
per satu dengan `curl` sampai mengembalikan 200** sebelum dipakai. Paket dan
galeri merujuk ke kunci di file ini, jadi mengganti seluruh foto dengan
dokumentasi asli nanti cukup menyunting satu file.

`next.config.ts` diubah: `picsum.photos` → `images.unsplash.com`.

---

## Bagian 5 — Perbaikan UI yang Anda Sebutkan

| # | Masalah | Perbaikan |
|---|---|---|
| 8 | Beranda tidak punya galeri | Section galeri baru dengan carousel — tombol panah kiri/kanan, geser sentuh, `scroll-snap`, navigasi keyboard. File baru `src/components/home/GalleryCarousel.tsx` |
| 9 | Kartu "Siap berangkat?" dempet | `CtaBanner.tsx` hanya punya `pb-20` tanpa padding atas. Tambah `pt-20 sm:pt-24` |
| 10 | Dropdown masih bawaan browser | Ganti `FilterSelect` di `PackageBrowser.tsx` dengan listbox kustom (`src/components/shared/Select.tsx`) — panel sendiri, animasi buka, navigasi panah, Escape menutup, `role="listbox"` + `aria-activedescendant` |
| 11 | Tombol WA ganda di navbar | Hapus dari `Header.tsx`. Tetap dipertahankan di panel menu mobile, karena saat panel terbuka tombol mengambang tertutup di belakangnya |
| 12 | Kartu testimoni terasa mati | `TestimonialCard.tsx` diberi interaksi (rincian di bawah) |
| 13 | Blok legalitas tidak diperlukan | Hapus dari halaman Tentang Kami |

### Interaksi kartu testimoni

Saat ini kartunya benar-benar statis. Yang ditambahkan, semuanya lewat CSS
(tanpa JavaScript, jadi tidak menambah bundel) dan tunduk pada `prefers-reduced-motion`:

- Kartu terangkat 4px dengan transisi ~0.4s, garis tepi berubah dari
  `border-line` menjadi `border-gold-500`
- Tanda kutip besar di sudut kartu naik opasitasnya dari 0 ke ~0.12
- Bintang rating "menyala" berurutan — jeda transisi bertingkat per bintang
- Kutipan yang lebih panjang dari empat baris dipangkas dengan `line-clamp`;
  saat kursor di atas kartu, batas pangkasnya dilepas sehingga teks penuh
  terbuka dengan animasi tinggi
- Kartu bisa difokuskan dengan `tabindex="0"` supaya efek yang sama muncul
  lewat keyboard, bukan hanya lewat kursor

Di halaman Testimoni, grid diberi ritme: kartu pertama tiap baris dibuat lebih
lebar sehingga susunannya tidak terasa seperti tabel. Kartu masuk berurutan
memakai `StaggerGroup` yang sudah ada di `src/components/motion/Stagger.tsx`.

### Blok legalitas dihapus

Kunci `About.legalTitle` dan `About.legalNote` dibuang dari
`src/messages/{id,en}.json`, dan bloknya dihapus dari
`src/app/[locale]/tentang-kami/page.tsx`. Halaman Tentang Kami jadi berisi
profil, sejarah, nilai-nilai, lalu CTA.

---

## Bagian 6 — Kontak & Peta

`src/content/site.ts` diperbarui dengan data asli:

- WhatsApp `6281233909129`
- Alamat: Rest Area Jl. Raya Karangjuwet No. 6 (Kav. 5), Karang Juwet,
  Donowarih, Kec. Karangploso, Kab. Malang, Jawa Timur 65152

Halaman Kontak mendapat peta: `<iframe>` Google Maps (mode embed, tanpa API key)
dengan `loading="lazy"` supaya tidak membebani muat awal, ditambah tautan
"Buka di Google Maps" untuk yang ingin langsung navigasi. Alamat juga masuk ke
JSON-LD `TravelAgency` di beranda.

---

## Bagian 7 — Daftar Konten Karangan

File baru `docs/KONTEN-PLACEHOLDER.md` mencatat setiap hal yang saya karang,
dikelompokkan per file, dengan kolom "perlu diganti / boleh dibiarkan":

- Profil perusahaan, tahun berdiri, sejarah singkat
- 6 testimoni beserta nama pelanggan — **wajib diganti atau dihapus**
- Angka statistik beranda (jumlah wisatawan, destinasi, tahun pengalaman)
- Email, jam operasional, akun media sosial
- Seluruh harga paket dan minimum peserta
- Jawaban FAQ soal uang muka, minimum peserta, dan pembatalan

---

## Urutan Kerja

1. **Aset & konfigurasi** — proses logo dengan `sharp`, update `site.ts`
   (WA + alamat), `next.config.ts`
2. **Tema** — token warna & font di `globals.css`, sesuaikan `Button`, `Badge`,
   `Section`, `PageHeader`, `Logo`, `TestimonialCard`
3. **Perbaikan UI** — `Select.tsx` kustom, `GalleryCarousel.tsx`, jarak
   `CtaBanner`, hapus tombol WA navbar, interaksi kartu testimoni, hapus blok
   legalitas
4. **Skema** — field baru + validasi di `schema.ts`, perbarui test
5. **Foto** — susun & verifikasi `src/content/images.ts`
6. **Konten** — tulis 14 paket bilingual; Bangkok–Pattaya lebih dulu sebagai acuan
7. **PDF** — pasang `@react-pdf/renderer`, route handler, tombol unduh
8. **Kontak** — peta, JSON-LD alamat
9. **Dokumentasi** — `KONTEN-PLACEHOLDER.md`, perbarui `README.md`

Langkah 1–3 mengubah tampilan tanpa menyentuh data, jadi hasilnya bisa Anda
lihat lebih dulu sebelum saya masuk ke penulisan 14 paket yang memakan waktu
paling lama.

---

## Verifikasi

```bash
npm test
```

Test bertambah untuk aturan skema baru (paritas `meals`, total malam hotel) dan
untuk pembuat nama file PDF.

```bash
npm run build
```

Harus lolos tanpa error tipe maupun Zod, dan menghasilkan 14 paket × 2 bahasa
untuk halaman **dan** PDF.

```bash
npm run dev
```

Pemeriksaan manual lewat browser:

- Setiap URL foto membalas HTTP 200 — diuji dengan `curl` saat penyusunan
- Unduh PDF dari halaman Bangkok–Pattaya, bandingkan dengan PDF asli Anda
- Carousel galeri: klik panah, geser sentuh, Tab lalu panah kiri/kanan
- Dropdown filter: buka dengan Enter, pilih dengan panah, tutup dengan Escape
- Kartu testimoni: efek muncul saat kursor di atasnya **dan** saat difokuskan
  dengan Tab; kutipan panjang benar-benar terbuka penuh
- Halaman Tentang Kami tidak lagi memuat blok legalitas
- Kontras teks emas/putih diperiksa ulang setelah token warna berubah
- Peta Kontak memuat dan tautannya membuka lokasi yang benar
- Lebar 375px, 768px, 1440px; dan dengan "Reduce motion" menyala

---

## Perkiraan Beban

Bagian terberat adalah menulis 14 paket dalam dua bahasa dengan rundown harian,
hotel, dan daftar termasuk/tidak termasuk — sekitar 4.000 baris konten. Saya
kerjakan bertahap sesuai urutan di atas, dan Anda bisa menghentikan atau
mengoreksi arah setelah melihat hasil langkah 1–3.
