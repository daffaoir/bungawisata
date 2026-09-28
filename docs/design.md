# Design — bungawisata

## Sistem desain yang dipakai
Sumber: `src/app/globals.css`, `src/components/shared/*`, `docs/RENCANA-V2.md`. Tidak ada library UI; Tailwind v4 + lucide-react + motion.

- **Font:** Playfair Display 500/600/700 (`font-display`, semua h1–h4) + Inter (`font-sans`, body). Tidak diganti.
- **Warna (token `@theme`):** `ink #0F0F0F`, `ink-soft #4A4A4A`, `ink-muted #6E6E6E`, `canvas #FBFAF8`, `canvas-alt #F3F1ED`, `line #E4E0D9`, `gold-50…700` (teks emas di terang hanya `gold-600`; di atas ink `gold-400`). Hijau `#25D366` hanya untuk tombol WA mengambang.
- **Bentuk:** sudut persegi (tanpa radius), garis rambut `border-line` pengganti bayangan, tombol persegi uppercase tracking 0.1em (`Button`, `ButtonLink`, `ButtonAnchor`, `WhatsAppCta`).
- **Komponen dasar:** `Section` (tone canvas/white/alt/ink), `SectionHeading` (eyebrow + `rule-gold`), `PageHeader` (foto + gradien ink), `Badge`, `Select` (listbox kustom), `EmptyState`, `FaqAccordion` (`<details>`), `TestimonialCard`, `PackageCard`, `Reveal`/`StaggerGroup` (motion).
- **Container:** `max-w-6xl px-5 sm:px-8` (konten 1088px di 1280).

## Gaya yang dihindari
Berlaku untuk semua item di bawah:
- Tanpa `rounded-*` di foto, kartu, tombol, atau ikon sosial. Satu-satunya lingkaran yang dipertahankan: tombol WA mengambang.
- Tanpa bayangan lembut di bawah kartu (`shadow-[0_24px_60px…]` di `TestimonialCard` dihapus); pemisah pakai `border-line`.
- Tanpa gradien warna dekoratif, tanpa latar ungu/biru, tanpa glassmorphism selain header sticky yang sudah ada.
- Tanpa ikon hiasan "AI": `Sparkles` di judul sorotan dihapus; tanpa emoji di UI mana pun.
- Tanpa angka urut `01/02/03` untuk daftar yang bukan urutan (hanya itinerary "Hari 1, 2, 3" yang boleh bernomor).
- Tanpa eyebrow uppercase baru. Eyebrow yang sudah ada boleh tetap, tetapi jangan ditambah di section yang dibuat ulang.
- Tanpa animasi fade-up per kartu/per section yang baru; tanpa efek hover berlapis (kartu terangkat + border emas + kutip raksasa + bintang menyala).
- Tanpa teks di bawah 12px (0.75rem) untuk informasi (harga, "/orang", label durasi).
- Tanpa kartu seragam berulang sebagai pengisi; kalau isinya pendek (kutipan, nilai), pakai tipografi + garis rambut, bukan kotak.

## Poles tampilan sebelum domain bungawisata.co.id (2026-09-28)

### Cara audit
- Diaudit di `https://bungawisata.vercel.app` (kode sama dengan `master` lokal; lokal hanya lebih maju 1 commit docs). Tidak ada `node_modules` lokal, jadi dev server tidak dijalankan.
- Playwright Chromium, 1280×800 dan 375×812, ID + EN: `/`, `/paket`, `/paket/bali-4d3n`, `/en/packages/turki-9d8n`, `/galeri`, `/testimoni`, `/tentang-kami`, `/kontak`, `/halaman-tidak-ada`.
- Semua halaman: `scrollWidth <= innerWidth` (tanpa scroll horizontal), tanpa error console kecuali 404 dokumen di halaman 404 (wajar). Tidak ada "TODO" terlihat saat FAQ tertutup (FAQ diurus plan langkah 1).
- Screenshot "sebelum": `docs/design-audit/*-fold.png` (tiap halaman, kedua viewport) + potongan bukti bernama sesuai item. Metrik mentah: `docs/design-audit/_metrics.json`.

### Alur (tidak berubah)
1. Pengunjung (kebanyakan HP) masuk dari beranda atau langsung ke detail paket.
2. Menyaring di `/paket` → membuka detail → membaca rundown, harga, hotel.
3. Menekan WhatsApp (kartu harga, bilah sticky, tombol mengambang, Kontak) atau mengunduh PDF.
Tujuan poles: setiap langkah di atas bisa dilakukan di 375px tanpa informasi hilang, dan CTA WhatsApp selalu jelas.

### Daftar item
Kolom **Status** diisi user di gerbang: `disetujui` / `ditolak` / `ubah: …`. Builder hanya mengerjakan yang `disetujui`.
Prioritas: **P1** wajib, **P2** sebaiknya, **P3** bagus kalau sempat.

#### A. Global / shared

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| A1 | P1 | **Daftar paket kosong di HP.** `StaggerGroup` memakai `viewport.amount: 0.1`: grid 14 kartu satu kolom tingginya ±8.000px, jadi 10%-nya (±800px) tidak pernah muat di layar 812px (dikurangi margin 60px). Terverifikasi: di 375×812 dan 375×667 keenam kartu pertama `/paket` tetap `opacity: 0` setelah di-scroll (desktop aman). Semua grid panjang berisiko sama. Bukti: `paket-m-filters.png`. | Di `StaggerGroup` dan `Reveal`, ganti `amount` pecahan menjadi `amount: "some"` (atau `0`) dengan margin bawah tetap, sehingga pemicunya "ujung atas grup terlihat", bukan persentase tinggi. Cek ulang `/paket`, `/paket?region=luar-negeri`, `/testimoni`, detail "Paket Serupa" di 375 dan 1280. (Lihat juga A8.) | |
| A2 | P1 | Target sentuh di bawah 44px: tombol ID/EN 14×17px (header ≥sm dan di menu mobile), tautan menu mobile tinggi 16px, tautan teks "Lihat galeri lengkap"/"Baca semua testimoni" 17px, tautan footer 17px, chip region 38px, `Button size="sm"` 38px (bilah sticky), "Kembali ke daftar paket" 20px. Bukti: `_metrics.json` (`small`). | `LocaleSwitcher`: setiap tombol `min-h-11 min-w-11 inline-flex items-center justify-center` (tampilan huruf tetap). `MobileNav`: tiap `NavLink` jadi blok `py-3`, ukuran huruf 0.95rem. `Button`: `sm` → `min-h-11`, `md` → `min-h-11`. Tautan teks dengan panah dan footer: `py-3 -my-3` (area sentuh membesar tanpa menggeser layout) atau `min-h-11 inline-flex items-center`. | |
| A3 | P1 | Akhir halaman menumpuk blok hitam: Tentang dan Testimoni berakhir dengan `Section tone="ink"` yang langsung menyatu dengan footer ink, tanpa batas; di beranda urutannya testimoni ink → celah → kotak CTA ink → footer ink. Terbaca sebagai satu massa gelap, dan CTA tenggelam. Bukti: `testimoni-d-cta-footer.png`, `home-d-testimonials.png`. | Komponen baru `ClosingCta` (shared) dipakai di Beranda (mengganti `CtaBanner`), Tentang, Testimoni. Latar `gold-50` dengan garis atas `border-gold-200`, teks ink. **1280:** grid 2 kolom `[1.2fr_1fr]`, kiri judul (Playfair 2.4rem) + subjudul, kanan `WhatsAppCta` primary lg + baris kecil nomor `site.phoneDisplay` dan jam kerja; rata kiri. **375:** satu kolom, tombol `w-full`. Judul/teks tetap dari messages yang ada. Footer tetap ink. | |
| A4 | P2 | Tombol WA mengambang (56px, right/bottom 24px) menutupi konten di 375: angka statistik ketiga di hero, dropdown filter `/paket`, alamat di Kontak. | Di `<sm`: `size-12`, `right-4 bottom-4`. Sembunyikan saat menu mobile terbuka (`body:has([data-mobile-nav-open])`). Tambah `pb-20 sm:pb-0` pada blok hak cipta footer agar baris terakhir tidak tertutup. | |
| A5 | P2 | Di halaman detail pada HP, bilah harga sticky menutupi baris hak cipta footer. | Aturan `body:has([data-sticky-cta]) footer { padding-bottom: <tinggi bilah> }` di `globals.css` untuk `width < 64rem`. | |
| A6 | P2 | `SectionHeading` dengan `action`: di HP tombol aksi jatuh di antara judul dan subjudul ("Lihat semua paket" di beranda, panah carousel). Urutan baca jadi judul → tombol → penjelas. Bukti: `home-m-carousel.png`. | Di `<sm`, aksi dirender setelah subjudul (`order` atau render kedua kali dengan `sm:hidden`/`hidden sm:block`). Untuk "Lihat semua paket" di HP, taruh setelah grid kartu sebagai tombol `w-full`. | |
| A7 | P2 | `PageHeader` menutup foto dengan `from-ink via-ink/85 to-ink/40`: di Paket dan Testimoni foto hampir tak terlihat (hitam 60% kiri). Tinggi 380px di 1280 mendorong konten utama ke bawah fold. | Gradien `from-ink/90 via-ink/60 to-ink/10`; padding `pt-16 pb-16 sm:pt-20 sm:pb-20` (dari 20/24 → 28/32). Judul tetap `text-[2.5rem] sm:text-6xl`. Cek kontras subjudul putih/70 tetap ≥4.5:1 di area teks. | |
| A8 | P3 | Hampir setiap section memakai fade-up (`Reveal`/`Stagger`) plus zoom foto saat hover di semua kartu; efeknya generik dan jadi sumber bug A1. | Pertahankan hanya: `animate-drift` di foto hero dan garis itinerary yang tergambar. Hapus `StaggerGroup` dari grid kartu (paket, testimoni, nilai) — render langsung. Zoom hover foto dikecilkan ke `scale-[1.03]` di `PackageCard` saja. | |

#### B. Beranda (`/`, `/en`)

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| B1 | P1 | Hero di HP tanpa foto sama sekali (kolom gambar `hidden lg:block`): layar pertama ponsel hanya teks, untuk bisnis wisata yang sebagian besar pengunjungnya dari HP. Bukti: `home-m-fold.png`. | Di `<lg` tampilkan satu foto (`komodo-padar`, lihat B3) **di atas** eyebrow, full-bleed selebar layar (`-mx-5`), `aspect-[4/3]`, tanpa foto kecil yang menimpa dan tanpa garis emas. Hero `pt-0` di HP supaya foto menempel di bawah header. Desktop tidak berubah. | |
| B2 | P2 | Dua tombol hero di HP bertumpuk dengan lebar berbeda (233px vs 238px) — tampak tidak sengaja. | `<sm`: kedua tombol `w-full`; `sm+` tetap berdampingan. | |
| B3 | P2 | Foto berulang di satu halaman: Padar muncul 3× (hero, kartu Labuan Bajo, carousel #2), Raja Ampat 2× (region, kartu), Cappadocia 2× (region, carousel). | Hanya mengganti kunci foto stok yang dipakai (bukan konten): hero `komodo-padar` → `bromo-kaldera`; foto kecil hero tetap `bali-terasering`; RegionSplit dalam negeri → `raja-ampat-gugusan`, luar negeri → `jepang-chureito`. Carousel: urutan galeri tidak diubah, cukup hasilnya tidak lagi bentrok dengan hero/region. Foto kartu paket tidak disentuh (`heroImage` = data paket). | |
| B4 | P2 | Carousel galeri tidak sejajar: di 1280 kartu pertama mulai di x=64 sementara judul di x=96, dan kartu ketiga terpotong di x=1216 (tepi container, bukan tepi layar). Di 375 kartu pertama menempel ke x=0 tanpa margin. Bukti: `home-d-whyus-carousel.png`, `home-m-carousel.png`. | Tambah `scroll-px-5 sm:scroll-px-8` (scroll-padding-inline) pada track agar snap sejajar kolom teks. Di `lg+` track dilebarkan ke tepi kanan viewport (`me-[calc(50%-50vw)]`) sehingga potongan terjadi di tepi layar. Sesuaikan `syncEdges` bila perlu. | |
| B5 | P2 | "Kenapa Bunga Wisata": nomor 01–04 untuk alasan yang bukan urutan, ikon sejajar baseline dengan nomor (tampak meleset), 4 kolom sempit membuat judul "Tour Leader Berpengalaman" patah 2 baris dan teks 5 baris per ±25 karakter. | Hapus nomor. `lg`: grid 2×2 (kolom ±520px), ikon 24px di kiri judul dalam satu baris flex, teks `max-w-[46ch]`. Tetap garis rambut `gap-px bg-line`, tanpa hover `bg-gold-50`. `375`: satu kolom seperti sekarang. | |
| B6 | P3 | Kartu region: judul "Dalam Negeri" dan "Luar Negeri" berada di ketinggian berbeda (y 340 vs 370) karena panjang deskripsi berbeda. | Deskripsi `min-h-[3lh]` (3 baris) di `md+` supaya judul, deskripsi, dan tautan sejajar di kedua kartu. | |
| B7 | P3 | Label statistik hero uppercase kecil ("JAMAAH & WISATAWAN") patah 2 baris sehingga baris angka tidak rata bawah. | Label sentence case 0.8rem tanpa tracking lebar, `dt` terlihat (bukan `sr-only` + duplikat). Angka tidak diubah (konten karangan). | |

Testimoni di beranda ikut perbaikan E1. CTA penutup ikut A3.

#### C. Daftar paket (`/paket`, `/en/packages`)

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| C1 | P1 | Kartu tidak muncul di HP — lihat **A1** (item ini hanya pengingat; kerjakan lewat A1). | — | |
| C2 | P1 | Panel filter di HP memakan seluruh layar pertama: chip region patah 2 baris, lalu 4 field full-width bertumpuk (panel ±380px) sebelum satu paket pun terlihat; tombol WA menutupi dropdown. Bukti: `paket-m-filters.png`. | **375:** baris 1 = kontrol segmen region 3 kolom sama lebar (`grid-cols-3`, tinggi 44px, teks 0.68rem uppercase seperti sekarang; label "Semua / Dalam Negeri / Luar Negeri" muat 1 baris). Baris 2 = kolom cari (flex-1) + tombol `Filter` 44px dengan jumlah filter aktif, mis. "Filter (2)". Tombol membuka/menutup blok inline berisi 3 `Select` (`aria-expanded`, `aria-controls`). Panel tanpa kotak putih/border luar di HP (`border-0 p-0`). **1280:** tetap seperti sekarang (semua terlihat). Butuh 1 key messages baru `Packages.filters.toggle` ID+EN. | |
| C3 | P2 | `PackageCard`: durasi ditulis dua kali (judul "Bali 4 Hari 3 Malam" + baris "4 HARI 3 MALAM"), dan baris durasi bergeser bila judul patah 2 baris sehingga garis harga antar kartu tidak sejajar (lihat kartu Labuan Bajo/Dubai). | Hapus baris durasi terpisah; pindahkan durasi ke baris eyebrow: destinasi kiri, durasi kanan (`flex justify-between`, durasi `text-ink-muted` 0.75rem sentence case). Ringkasan `line-clamp-2` tetap. | |
| C4 | P2 | Teks harga terlalu kecil: "/orang" 0.65rem (±10px) dan "MULAI DARI" 0.65rem, keduanya abu-abu. | "/orang" dan "Mulai dari" → 0.75rem. Berlaku juga di `StickyPriceBar` (D1). | |
| C5 | P2 | Di 1280×800, header halaman + panel filter membuat baris pertama kartu baru mulai di y=780 (fold 800). | Terselesaikan oleh A7 (header lebih pendek); tambahan: container `py-10 sm:py-12` (dari 14/16). | |

State: **kosong** tetap `EmptyState` + CTA WA (sudah baik). **Banyak item:** 14 kartu, 3 kolom desktop, 1 kolom HP (2 kolom mulai `sm`). **Teks panjang:** judul kartu maks 2 baris, ringkasan 2 baris.

#### D. Detail paket (`/paket/[slug]`, `/en/packages/[slug]`)

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| D1 | P1 | **Harga hilang dari bilah sticky di HP.** ID: harga terpotong jadi "Rp 4…."; EN: harga tidak terlihat sama sekali ("STARTING FROM" patah 2 baris, "IDR 24,900,000" lebar 0) karena tombol PDF + "ASK ABOUT THIS PACKAGE" memakan seluruh lebar. Tombol juga 38px. Bukti: `detail-bali-m-stickybar.png`, `detail-turki-en-m-stickybar.png`. | Kiri: "Mulai dari" (0.75rem, `whitespace-nowrap`) di atas harga (`whitespace-nowrap`, Playfair 1.1rem, tanpa `truncate`). Kanan: tombol PDF **ikon saja** 44×44 dengan `aria-label` yang sudah ada, lalu `WhatsAppCta` tinggi 44px berlabel pendek baru `PackageDetail.askShort` ("Tanya" / "Ask"). Harga harus terlihat utuh untuk harga terpanjang (Rp 24.900.000 / IDR 24,900,000) di 375 dan 320. PDF tetap `download`. | |
| D2 | P2 | `PackageGallery` masih memakai `rounded-3xl` dan zoom `scale-110` dari tema lama — satu-satunya foto bersudut bulat di situs; 4 foto di grid 3 kolom menyisakan satu foto yatim; thumbnail 216px kecil. Bukti: `detail-d-gallery.png`. | Sudut persegi. Layout berdasar jumlah: 4 foto → `grid-cols-2` sama besar (aspect 4/3); 3 → foto pertama `col-span-2` lalu dua di bawah; 5–6 → `grid-cols-2 sm:grid-cols-3` dengan foto pertama `sm:col-span-2 sm:row-span-2`. Hover hanya `scale-[1.03]`. Tanpa lightbox (fitur baru, di luar scope). | |
| D3 | P2 | Di HP, fakta kunci (durasi, keberangkatan, maskapai, min. peserta) baru muncul di kotak harga paling bawah, setelah rundown ±5.000px. | Di `<lg`, tambahkan `dl` ringkas tepat di bawah ringkasan: grid 2 kolom, label `text-ink-muted` 0.75rem di atas nilai 0.95rem, garis rambut atas-bawah. Data sama dengan `rows` di `PriceBox` (ekstrak jadi fungsi bersama). Desktop tidak berubah (kotak harga sticky sudah di samping). | |
| D4 | P3 | Judul "Sorotan Perjalanan" diberi ikon `Sparkles` — ikon generik yang tidak dipakai judul lain. | Hapus ikon; judul `h2` sama gaya dengan "Rundown Perjalanan". | |
| D5 | P3 | Data `meals` per hari sudah ada (dipakai di PDF) tapi rundown di web tidak menampilkannya. | Di bawah judul hari: satu baris kecil `text-ink-muted` 0.8rem, mis. "Makan: pagi, siang, malam" (EN "Meals: breakfast, lunch, dinner"). Butuh key messages baru ID+EN. Tampil hanya bila `meals` tidak kosong. | |

#### E. Galeri & Testimoni

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| E1 | P1 | `TestimonialCard`: (a) bintang abu-abu pucat (`ink/20`, di latar gelap `white/35`) sampai di-hover, jadi rating terbaca kosong dan 4 vs 5 bintang tidak terbedakan; (b) kutipan dipotong `max-h` di tengah kalimat tanpa elipsis (kartu pertama beranda berhenti di "…isinya orang"); (c) kartu diberi `tabIndex` padahal tidak interaktif, dan 4 lapis animasi hover. Bukti: `home-d-testimonials.png`. | Bintang terisi selalu `gold-600` (terang) / `gold-400` (gelap), sisa bintang `text-line` / `white/20`. Kutipan ditampilkan utuh (semua kutipan ≤4 baris) — hapus `max-h` dan ekspansi hover; kalau tetap mau batas, pakai `line-clamp-5` yang memberi elipsis. Hapus `tabIndex`, hover lift, bayangan, kutip raksasa, jeda bintang. Isi testimoni tidak diubah. | |
| E2 | P1 | Galeri menampilkan catatan untuk pemilik ke pengunjung: "Foto di atas masih stok Unsplash… Gantilah lewat `src/content/images.ts`." — path file kode terlihat di situs publik. Bukti: `galeri-d-devnote.png`. | **Butuh keputusan user** (lihat Pertanyaan terbuka). Usulan: hapus kotak itu dari halaman; informasi sudah tercatat di `docs/KONTEN-PLACEHOLDER.md`. Alternatif: ganti dengan kalimat untuk pengunjung tanpa path, mis. "Foto ilustrasi destinasi." / "Illustrative destination photos." | |
| E3 | P2 | Keterangan foto galeri hanya muncul saat hover (opacity 0) — pengguna HP dan keyboard tidak pernah tahu itu tempat apa. | Keterangan selalu terlihat di bawah foto (0.85rem `text-ink-soft`, seperti carousel beranda); hapus overlay gradien hover. Grid tetap: 2 kolom HP, 4 kolom desktop, `span 2` tetap. Tinggi baris menyesuaikan (`auto-rows` diganti foto `aspect-[4/3]` + figcaption). | |
| E4 | P2 | `/testimoni`: 6 kutipan pendek (2–3 baris) di kotak lebar 3/2 kolom bergantian, tiap kotak ±280px dengan ruang kosong besar; halaman terasa kosong setelah header foto besar. | Layout kutipan tanpa kotak: `lg` 2 kolom, tiap item dipisah garis rambut atas; kutipan Playfair 1.3rem `leading-[1.6]` ink sebagai elemen utama, bintang di atasnya, nama + asal/trip di bawah (0.85rem). `375`: satu kolom. Komponen `TestimonialCard` dapat varian `variant="quote"`; beranda tetap varian kotak gelap. | |

#### F. Tentang kami & Kontak

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| F1 | P1 | Kontak tidak punya tombol WhatsApp utama padahal subjudul berkata "Cara tercepat: langsung chat WhatsApp". WA hanya satu dari 5 ikon bulat 48px tanpa label; nomor telepon tidak tertulis di badan halaman (hanya di footer). Bukti: `kontak-d-channels.png`. | Blok pertama setelah header: **WhatsApp** — nomor `site.phoneDisplay` besar (Playfair 2rem, tautan wa.me), `WhatsAppCta` primary lg, dan satu baris jam balas dari `site.hours`. **1280:** blok ini kolom kiri (5/12) sejajar dengan kolom kanan (7/12) berisi alamat + jam operasional. **375:** WA dulu, lalu alamat, lalu jam. Kanal lain (email, Instagram, Facebook, TikTok) jadi baris tautan persegi 44px **dengan teks label** di sebelah ikon, bukan lingkaran tanpa label. | |
| F2 | P2 | Alamat dan peta terpisah ±700px (section kanal, lalu section peta berjudul sendiri); tidak ada tautan "Buka di Google Maps" di luar iframe. | Gabungkan: di `lg`, section lokasi 2 kolom — kiri alamat + tombol outline "Buka di Google Maps" (`MAPS_LINK`, key messages baru ID+EN) + catatan "kabari dulu lewat WhatsApp"; kanan iframe `aspect-[4/3]`. `375`: alamat, tombol, lalu peta `aspect-[4/3]`. Section "Cara Menghubungi" + eyebrow dihapus karena digantikan F1. | |
| F3 | P2 | FAQ: subjudul "Belum terjawab? Tanyakan langsung lewat WhatsApp." tanpa tautan/tombol. | Setelah accordion, `WhatsAppCta` outline md. | |
| F4 | P2 | Tentang: cerita satu paragraf 10 baris dengan lebar ±85 karakter, setengah kanan halaman kosong; section "Yang Kami Pegang" memakai kotak berikon yang sama dengan "Kenapa Bunga Wisata" di beranda (ikon dompet/tangan sama). Bukti: `tentang-d-story.png`. | Cerita: `lg` grid `[1fr_1.4fr]` — kiri judul "Perjalanan Kami" (sticky `top-28`) + foto `umum-rombongan` aspect 4/5; kanan teks `max-w-[62ch]` 1.05rem `leading-[1.9]`, huruf pertama paragraf tanpa drop cap. `375`: judul, teks, foto. Nilai: 3 kolom tanpa kotak dan tanpa ikon, garis emas pendek (`rule-gold`) di atas tiap judul, teks tidak diubah. | |

CTA penutup Tentang ikut A3.

#### G. Halaman 404

| ID | Prioritas | Masalah yang terlihat | Perubahan | Status |
|---|---|---|---|---|
| G1 | P1 | URL yang tidak ada (`/halaman-tidak-ada`, `/en/halaman-tidak-ada`) menampilkan halaman 404 bawaan Next — putih polos, bahasa Inggris, tanpa header/footer/logo. `src/app/[locale]/not-found.tsx` yang bermerek tidak pernah terpakai karena tidak ada rute yang memanggil `notFound()` untuk path tak dikenal. Bukti: `404-d.png`. | Tambah catch-all `src/app/[locale]/[...rest]/page.tsx` yang memanggil `notFound()` (pola next-intl), dan bila perlu `src/app/not-found.tsx` root untuk path di luar locale. Builder wajib cek panduan Next 16 di `node_modules/next/dist/docs/` dan next-intl sebelum menulis. Status HTTP harus tetap 404. | |
| G2 | P2 | Halaman 404 bermerek hanya punya satu tombol ke beranda; "404" `gold-500/40` pucat. | Tetap satu kolom tengah, `min-h-[60vh]`. "404" Playfair 6rem `text-gold-600` (dekoratif, `aria-hidden`), judul + deskripsi dari messages yang ada, lalu dua aksi: `ButtonLink` primary "Lihat paket wisata" (`/paket`) dan `WhatsAppCta` outline. `375`: tombol `w-full` bertumpuk. Butuh 1 key messages baru `NotFound.packagesCta` ID+EN. | |

### Layout ringkas per viewport
- **Desktop 1280px:** container 1088px tetap. Perubahan layout besar hanya di: Kontak (2 kolom WA | alamat+jam, lalu 2 kolom alamat | peta), Tentang (2 kolom cerita), Testimoni (2 kolom kutipan), WhyUs (2×2), CTA penutup (2 kolom).
- **Mobile 375px:** hero beranda dapat foto di atas; filter paket jadi segmen + tombol Filter; bilah sticky detail: harga kiri utuh, PDF ikon + "Tanya" kanan; fakta paket naik ke bawah ringkasan; Kontak dimulai dengan WhatsApp.

### State
| State | Tampilan |
|---|---|
| Kosong | `/paket` tanpa hasil: `EmptyState` + CTA WA (tetap). Galeri/testimoni selalu berisi (data statis). |
| Loading | `/paket` fallback Suspense `h-72` (tetap). Peta: iframe `loading="lazy"`; beri latar `bg-canvas-alt` supaya kotak tidak putih kosong sebelum termuat. |
| Error | 404 bermerek (G1/G2). Tidak ada form, jadi tidak ada error input. |
| Sukses | CTA membuka wa.me di tab baru; PDF terunduh (tidak berubah). |
| Teks panjang | Judul paket EN terpanjang ("Dubai – Abu Dhabi 5 Days 4 Nights") maks 2 baris di kartu; harga terpanjang harus utuh di bilah sticky 320–375px; label EN lebih panjang dari ID — uji semua item di `/en`. |
| Banyak item | 14 paket (A1 wajib diuji dengan daftar penuh di 375), 12 foto galeri, 6 testimoni, 6 FAQ. |

### Komponen
- **Pakai ulang:** `Button`/`ButtonLink`/`ButtonAnchor`, `WhatsAppCta`, `Section`, `SectionHeading`, `PageHeader`, `Select`, `EmptyState`, `FaqAccordion`, `PackageCard`, `TestimonialCard`, `Logo`.
- **Baru:** `ClosingCta` (A3), fungsi bersama fakta paket untuk `PriceBox` + blok fakta HP (D3), catch-all route 404 (G1), varian `TestimonialCard variant="quote"` (E4).
- **Messages baru (ID + EN bersamaan):** `Packages.filters.toggle` (C2), `PackageDetail.askShort` (D1), `PackageDetail.meals*` (D5, bila disetujui), `Contact.openMaps` (F2), `NotFound.packagesCta` (G2).

### Aksesibilitas
- Kontras: teks emas di terang hanya `gold-600` (4.9:1); bintang dekoratif boleh `gold-500` karena ada `aria-label` rating. Subjudul di `PageHeader` putih/70 harus ≥4.5:1 setelah gradien diringankan (A7) — cek di area teks kiri.
- Fokus: `:focus-visible` gold-600 global sudah ada; tombol Filter baru dan kontrol segmen region harus kelihatan fokusnya. Kartu testimoni tidak lagi masuk urutan Tab (E1).
- Label: tombol ikon PDF (D1) dan tombol Filter (C2) wajib `aria-label`/teks; tautan sosial punya teks terlihat (F1); `aria-expanded` pada tombol Filter.
- Target sentuh ≥44px: A2 mencakup semua temuan; kontrol baru (C2, D1, F1) dibuat ≥44px sejak awal.
- Gerak: `prefers-reduced-motion` global tetap; A1 tidak boleh membuat konten bergantung pada animasi untuk terlihat.

### Pertanyaan terbuka
- **E2:** catatan "foto masih stok Unsplash" di Galeri — hapus total, atau ganti kalimat netral untuk pengunjung? Ini teks UI (messages), bukan data karangan, tapi menyangkut kejujuran soal foto.
- **B3:** boleh mengganti foto stok mana yang dipakai di hero/region beranda (bukan isi konten, hanya pilihan foto dari `images.ts`)?
- **D5:** menampilkan jadwal makan di rundown web — dianggap poles (data sudah ada) atau fitur baru (di luar scope)?
- **A8:** setuju mengurangi animasi masuk (fade-up) di seluruh situs? Kalau tidak, A1 tetap wajib.
- `docs/design-audit/` berisi ±13 MB PNG di repo publik — commit sebagai bukti "sebelum", atau tambahkan ke `.gitignore`?
