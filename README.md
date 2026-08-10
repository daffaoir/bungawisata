# Bunga Wisata

Website company profile dan katalog itinerary untuk Bunga Wisata (tour & travel).
Semua halaman digenerate statis saat build, dua bahasa (Indonesia & Inggris),
dan seluruh CTA mengarah ke WhatsApp.

## Menjalankan

```bash
npm install
```

```bash
npm run dev
```

Buka http://localhost:3000. Halaman berbahasa Indonesia ada di `/`, versi
Inggris di `/en`.

Perintah lain:

| Perintah | Kegunaan |
|---|---|
| `npm run build` | Build produksi; gagal kalau ada data paket yang tidak valid |
| `npm start` | Menjalankan hasil build |
| `npm test` | Menjalankan test Vitest |
| `npm run test:watch` | Test dalam mode watch |
| `npm run lint` | ESLint |
| `node scripts/check-images.mjs` | Menguji seluruh URL foto di `src/content/images.ts` masih membalas 200 |
| `node scripts/prepare-logo.mjs` | Membuat ulang turunan logo dari `assets/logo-master.png` |

## Konfigurasi

Buat file `.env.local` (tidak masuk git):

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_SITE_URL=https://bungawisata.com
```

Nomor WhatsApp ditulis format internasional **tanpa tanda `+` dan tanpa spasi**
(`0812-3456-7890` → `6281234567890`). Kalau variabel ini tidak diisi, nilai
cadangan di [`src/content/site.ts`](src/content/site.ts) yang dipakai.

## Menambah paket wisata

1. Salin salah satu file di `src/content/packages/` sebagai titik awal, misalnya
   [`bali-4d3n.ts`](src/content/packages/bali-4d3n.ts).
2. Ganti nama file dan nama variabelnya, lalu isi datanya.
3. **Isi kedua bahasa** — `content.id` dan `content.en`.
4. Daftarkan di array `packageList` pada
   [`src/content/packages/index.ts`](src/content/packages/index.ts).
5. Jalankan `npm run build` untuk memastikan datanya valid.

Aturan yang dipaksakan saat build (lihat [`src/lib/schema.ts`](src/lib/schema.ts)):

- `content.id` dan `content.en` wajib ada dan jumlah harinya harus sama
- Jumlah hari di `itinerary` harus sama dengan `durationDays`
- Nomor `day` harus urut mulai dari 1
- Daftar `meals` tiap hari harus **sama persis** antara versi ID dan EN
- Jumlah item `includes`, `excludes`, dan `highlights` harus sama antarbahasa
- `durationNights` harus `durationDays - 1`
- Total `nights` di `hotels` harus sama dengan `durationNights`
- `minPax` bilangan bulat positif
- `slug` hanya huruf kecil, angka, dan tanda hubung; tidak boleh kembar

Kalau ada yang tidak sesuai, build berhenti dengan pesan yang menyebut slug dan
field-nya — jadi versi Inggris tidak akan pernah diam-diam tertinggal.

## Unduh PDF itinerary

Setiap paket punya PDF yang bisa diunduh dari halaman detailnya. Berkasnya
dirender saat `next build` oleh route handler di
[`src/app/api/itinerary/[locale]/[slug]/route.ts`](src/app/api/itinerary/[locale]/[slug]/route.ts),
jadi tidak ada biaya rendering saat pengguna mengklik. Tata letaknya ada di
[`src/lib/pdf/ItineraryDocument.tsx`](src/lib/pdf/ItineraryDocument.tsx).

Dua hal yang perlu diingat saat menyuntingnya:

- Fontnya **Helvetica bawaan PDF** (encoding WinAnsi). Karakter di luar WinAnsi
  — bintang `★`, emoji, aksara non-Latin — akan **hilang tanpa peringatan**.
  Karena itu peringkat hotel ditulis `3*`, bukan `★★★`.
- Label PDF sengaja tidak diambil dari `src/messages/*.json`, melainkan dari
  konstanta `LABELS` di berkas yang sama, supaya modulnya bisa dirender tanpa
  konteks permintaan next-intl.

## Mengganti konten placeholder

Daftar lengkap setiap hal yang masih karangan — beserta penanda mana yang wajib
diganti sebelum publikasi — ada di
[`docs/KONTEN-PLACEHOLDER.md`](docs/KONTEN-PLACEHOLDER.md). Selain itu, cari
`TODO:` di seluruh proyek.

| Yang diganti | Lokasi |
|---|---|
| Nomor WA, email, alamat, jam buka, sosmed, statistik | `src/content/site.ts` |
| Logo | `assets/logo-master.png`, lalu jalankan `node scripts/prepare-logo.mjs` |
| Semua foto | `src/content/images.ts` (paket dan galeri hanya menyebut kuncinya) |
| Keterangan galeri | `src/content/gallery.ts` |
| Profil perusahaan | kunci `About` di `src/messages/{id,en}.json` |
| Testimoni | `src/content/testimonials.ts` |
| FAQ | `src/content/faq.ts` |
| Harga & hotel paket | `priceFrom`, `minPax`, `hotels` di tiap file paket |

Semua foto saat ini memakai stok Unsplash. Setelah diganti dengan foto asli di
`public/images/`, hapus blok `images.remotePatterns` di
[`next.config.ts`](next.config.ts).

## Menambah atau mengubah teks antarmuka

Teks antarmuka (menu, tombol, judul section) ada di `src/messages/id.json` dan
`src/messages/en.json`. Struktur kedua file harus sama persis.

## Menambah halaman baru

1. Daftarkan path-nya di `pathnames` pada
   [`src/i18n/routing.ts`](src/i18n/routing.ts), dengan versi ID dan EN.
2. Buat foldernya di `src/app/[locale]/` mengikuti path **versi Indonesia**
   (path internal), misalnya `src/app/[locale]/promo/page.tsx`.
3. Di halaman itu, panggil `setRequestLocale(locale)` dan export
   `generateStaticParams()` agar tetap dirender statis.
4. Tambahkan `alternates: buildAlternates("/promo", locale)` di
   `generateMetadata` untuk hreflang.
5. Kalau perlu muncul di menu, tambahkan ke
   [`src/components/layout/nav-items.ts`](src/components/layout/nav-items.ts).
6. Tambahkan juga ke [`src/app/sitemap.ts`](src/app/sitemap.ts).

## Struktur

```
src/
├── app/[locale]/        Halaman (path folder = versi Indonesia)
├── components/
│   ├── layout/          Header, Footer, navigasi, tombol WA mengambang
│   ├── home/            Section-section beranda
│   ├── package/         Kartu, filter, timeline, kotak harga
│   ├── shared/          Button, Section, Badge, FAQ, dll.
│   └── motion/          Pembungkus animasi (Reveal, Stagger, Counter)
├── app/api/itinerary/   Route handler PDF (dirender saat build)
├── content/             Semua data yang perlu diedit pemilik situs
├── i18n/                Konfigurasi routing & terjemahan
├── lib/                 Skema, filter, format, util WhatsApp
│   └── pdf/             Dokumen @react-pdf untuk unduhan itinerary
├── messages/            Teks antarmuka per bahasa
└── proxy.ts             Middleware next-intl
```

## Deploy

Situs ini butuh runtime Node.js karena memakai middleware next-intl.

**Vercel** — hubungkan repo, isi `NEXT_PUBLIC_WHATSAPP_NUMBER` dan
`NEXT_PUBLIC_SITE_URL` di Environment Variables, selesai.

**Hosting statis tanpa Node** — kalau nanti ternyata hanya tersedia shared
hosting biasa, ubah `localePrefix` di `src/i18n/routing.ts` menjadi `"always"`,
hapus `src/proxy.ts`, lalu tambahkan `output: "export"` di `next.config.ts`.
Konsekuensinya URL berubah menjadi `/id/paket` dan `/en/packages`.

## Aksesibilitas & animasi

- Semua animasi berhenti ketika sistem pengguna menyalakan *reduce motion*.
- Paletnya monokrom (`ink` / `canvas` / `line`) dengan satu aksen emas.
  `gold-600` adalah nuansa emas paling terang yang masih aman untuk teks di atas
  putih (kontras 4,9:1); `gold-500` ke bawah hanya untuk latar, garis, dan teks
  berukuran besar. Di atas latar `ink`, pakai `gold-400`.
- Kartu dan panel dipisahkan garis rambut `border-line`, bukan bayangan tebal —
  jangan menambahkan `shadow-*` yang berat tanpa alasan.
- Dropdown filter memakai listbox kustom di
  [`src/components/shared/Select.tsx`](src/components/shared/Select.tsx), bukan
  `<select>` bawaan, karena panel `<select>` tidak bisa ditata lintas peramban.
