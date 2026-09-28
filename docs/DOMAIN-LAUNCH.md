# Runbook — memasang bungawisata.co.id

Dikerjakan **setelah PANDI selesai memverifikasi e-KTP + NIB** (±3 hari kerja
sejak checkout di Niagahoster/Hostinger). Kodenya sudah siap: canonical,
sitemap, dan data bisnis otomatis memakai domain dari env
`NEXT_PUBLIC_SITE_URL`.

Istilah yang dipakai:

- **Nameserver (NS)** — "buku alamat" domain. Kita pindahkan ke Cloudflare
  supaya record DNS dan email forwarding diatur di satu tempat. Domain tetap
  terdaftar (dan diperpanjang) di Niagahoster.
- **Record A / CNAME** — baris DNS yang mengarahkan domain ke server Vercel.
- **DNS only (awan abu-abu)** — Cloudflare hanya menjawab alamat, tidak
  mem-proxy lalu lintas. Wajib untuk Vercel supaya SSL-nya tidak bentrok.
- **Env var** — pengaturan build di Vercel; perubahan baru berlaku setelah
  redeploy.

Total waktu kerja ±45 menit, ditambah menunggu propagasi DNS (biasanya < 1 jam,
paling lama 24 jam).

---

## 1. Pastikan domain sudah aktif

- **Di mana:** email dari Niagahoster/PANDI, atau panel Niagahoster → Domain.
- **Cek:** di terminal, jalankan `nslookup bungawisata.co.id 8.8.8.8`.
- **Berhasil kalau:** hasilnya **bukan** `Non-existent domain`. Boleh masih
  menunjuk ke parkir Niagahoster.

## 2. Tambahkan domain di Cloudflare

1. Buka https://dash.cloudflare.com (akun yang sama dengan `daffario.dev`) →
   **Add a domain** → ketik `bungawisata.co.id` → pilih paket **Free**.
2. Cloudflare memindai record lama. Hapus record parkir Niagahoster (A ke IP
   parkir) kalau ada.
3. Catat **2 nameserver** yang diberikan, misalnya `xxx.ns.cloudflare.com`.

- **Berhasil kalau:** halaman "Overview" menampilkan status *Pending* dan dua
  nameserver.

## 3. Ganti nameserver di Niagahoster

1. Panel Niagahoster/Hostinger → **Domain** → `bungawisata.co.id` →
   **Nameserver / DNS** → pilih nameserver kustom.
2. Isi dua nameserver Cloudflare dari langkah 2, lalu simpan.

- **Berhasil kalau:** dalam beberapa jam Cloudflare mengirim email "domain is
  active", dan status Overview berubah jadi **Active**.

## 4. Sambungkan ke Vercel

1. https://vercel.com → project **bungawisata** → **Settings → Domains**.
2. **Add** `bungawisata.co.id` → environment **Production**.
3. **Add** `www.bungawisata.co.id` → pilih **Redirect to** `bungawisata.co.id`
   (308).
4. Vercel menampilkan record yang dibutuhkan (biasanya **A** untuk apex dan
   **CNAME** untuk `www`). Salin nilainya **persis seperti yang tampil**.
5. Cloudflare → `bungawisata.co.id` → **DNS → Records → Add record**: buat
   record yang sama, dan pastikan ikon awan **abu-abu (DNS only)**.

- **Berhasil kalau:** di Vercel kedua domain berstatus **Valid Configuration**,
  dan `https://bungawisata.co.id` terbuka dengan gembok (SSL).

## 5. Arahkan situs ke domain baru

1. Vercel → project **bungawisata** → **Settings → Environment Variables** →
   **Production**:
   - `NEXT_PUBLIC_SITE_URL` = `https://bungawisata.co.id` (ganti nilai lama
     `https://bungawisata.vercel.app`).
2. **Deployments** → deployment terbaru → **⋯ → Redeploy**.

- **Berhasil kalau:**
  - `view-source:https://bungawisata.co.id` memuat
    `<link rel="canonical" href="https://bungawisata.co.id"`.
  - https://bungawisata.co.id/sitemap.xml berisi URL `https://bungawisata.co.id/...`.
  - https://bungawisata.co.id/robots.txt menunjuk ke sitemap tersebut.

## 6. Domain lama `bungawisata.vercel.app`

Biarkan tetap hidup. Canonical semua halaman sudah menunjuk ke domain baru,
jadi Google akan memindahkan indeksnya. Opsional: Vercel → Domains →
`bungawisata.vercel.app` → **Redirect to** `bungawisata.co.id`.

## 7. Email `info@bungawisata.co.id` → Gmail papa

1. Cloudflare → `bungawisata.co.id` → **Email → Email Routing** →
   **Get started / Enable**. Cloudflare menambahkan record MX & TXT sendiri;
   setujui.
2. **Destination addresses** → tambah alamat Gmail papa. Papa menerima email
   verifikasi dari Cloudflare dan harus mengeklik tautannya.
3. **Routing rules → Create address**: `info` → kirim ke Gmail papa.
4. Uji: kirim email dari akun lain ke `info@bungawisata.co.id`.
5. Setelah email uji masuk: Vercel → Environment Variables (Production) →
   tambah `NEXT_PUBLIC_CONTACT_EMAIL` = `info@bungawisata.co.id` → Redeploy.

- **Berhasil kalau:** email uji masuk ke Gmail papa, dan setelah redeploy
  alamat `info@bungawisata.co.id` tampil di halaman Kontak dan footer.
- **Catatan:** balasan dari Gmail akan terkirim dari alamat Gmail. Kalau ingin
  membalas *sebagai* `info@`, perlu layanan SMTP terpisah (bisa dibahas nanti).

## 8. Google Search Console

1. https://search.google.com/search-console → **Add property** → pilih tipe
   **Domain** → isi `bungawisata.co.id`.
2. Google memberi record **TXT** (`google-site-verification=…`). Tambahkan di
   Cloudflare → DNS → **Add record → TXT**, name `@`, content = nilai itu.
3. Kembali ke Search Console → **Verify**.
4. Menu **Sitemaps** → kirim `https://bungawisata.co.id/sitemap.xml`.
5. Menu **URL Inspection** → masukkan `https://bungawisata.co.id` →
   **Request indexing**. Ulangi untuk `/layanan` dan `/paket`.

- **Berhasil kalau:** status sitemap **Success** dengan jumlah URL yang
  ditemukan > 0. Data pencarian mulai muncul setelah beberapa hari.

## 9. Google Business Profile (Google Maps)

Butuh akses **Manager** dari papa/staf pemilik profil
(https://business.google.com → profil → **Pengguna/Users → Tambah**).

1. **Edit profil → Kontak → Situs web** → `https://bungawisata.co.id`.
2. Pastikan jam buka sama dengan situs (Senin–Sabtu 08.00–17.00, Minggu
   tutup) dan kategori utama "Biro Perjalanan dan Wisata".
3. Opsional: tambah kategori sekunder yang benar-benar dilayani, misalnya
   "Agen Tiket Pesawat" atau "Operator Tur".

- **Berhasil kalau:** di Google Maps profil "Bunga Wisata Tour and Travel"
  menampilkan tombol **Situs web** ke domain baru (perubahan bisa ditinjau
  Google 1–3 hari).

## 10. Link di media sosial

- **Instagram @bungawisata**: link bio masih `www.bungawisatamalang.com`
  (domain itu sudah mati) → ganti ke `https://bungawisata.co.id`.
- **Facebook bungawisata.malang**: About → Website.
- **TikTok @ownerbungawisata**: Edit profile → Website (kalau fitur tersedia).

## 11. Vercel Web Analytics

1. Vercel → project **bungawisata** → tab **Analytics** → **Enable**.
2. Redeploy kalau diminta. Kode `<Analytics />` sudah terpasang.

- **Berhasil kalau:** setelah membuka situs beberapa kali, grafik kunjungan
  muncul di tab Analytics (bisa tertunda beberapa menit).

---

## Setelah semuanya jalan

- Cek ulang https://pagespeed.web.dev untuk `https://bungawisata.co.id`
  (mobile).
- Pantau Search Console tiap minggu: **Performance** (kata kunci & klik) dan
  **Pages** (halaman yang belum terindeks).
- Minta pelanggan yang puas memberi ulasan di Google Maps. Jumlah dan
  kebaruan ulasan adalah salah satu faktor terbesar untuk peringkat lokal.
