/**
 * Satu-satunya sumber data identitas & kontak Bunga Wisata.
 * Ganti nilai di sini — jangan sebar nomor/alamat ke dalam komponen.
 */

/**
 * Nomor WhatsApp format internasional TANPA tanda `+` dan tanpa spasi.
 * Bisa ditimpa lewat NEXT_PUBLIC_WHATSAPP_NUMBER di `.env.local`.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281233909129";

/** Dipakai untuk metadata absolut, sitemap, dan hreflang. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bungawisata.com"
).replace(/\/$/, "");

const ADDRESS = {
  street: "Rest Area Jl. Raya Karangjuwet No. 6 (Kav. 5)",
  area: "Karang Juwet, Donowarih, Kec. Karangploso",
  city: "Kabupaten Malang",
  province: "Jawa Timur",
  postalCode: "65152",
  country: "Indonesia",
} as const;

/** Satu baris penuh — untuk JSON-LD dan kueri peta. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city}, ${ADDRESS.province} ${ADDRESS.postalCode}`;

/**
 * Google Maps mode embed tidak butuh API key selama kuerinya dienkode.
 * Dipakai untuk `<iframe>` di halaman Kontak.
 *
 * Kuerinya nama bisnis, BUKAN `ADDRESS_LINE` — alamat lengkapnya mengandung
 * tanda kurung "(Kav. 5)" yang membuat geocoder Google salah menafsirkan
 * hasilnya (peta yang tampil jadi tidak jelas menunjuk ke mana). Nama
 * "Bunga Wisata Tour and Travel" sudah terverifikasi sebagai Profil Bisnis
 * Google — dikonfirmasi lewat redirect `MAPS_LINK` di bawah — sehingga
 * pencarian by name jauh lebih akurat.
 */
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent("Bunga Wisata Tour and Travel, Karangploso, Malang")}&output=embed`;

/**
 * Tautan profil bisnis Google resmi Bunga Wisata — lebih akurat daripada
 * kueri alamat teks biasa, karena menunjuk entitas yang sudah diverifikasi.
 * Dipakai tombol "Buka di Google Maps"; TIDAK bisa dipakai untuk `<iframe>`
 * karena halaman yang dirujuknya mengirim `X-Frame-Options: SAMEORIGIN`.
 */
export const MAPS_LINK = "https://share.google/y3r2SFUjgEZDZzcdC";

export const site = {
  name: "Bunga Wisata",
  tagline: "Ur Friendly Partner for Travelling",
  // TODO(placeholder): email belum dikonfirmasi pemilik.
  email: "halo@bungawisata.com",
  phoneDisplay: "+62 812-3390-9129",
  address: ADDRESS,
  // TODO(placeholder): jam operasional masih perkiraan.
  hours: [
    {
      days: { id: "Senin – Jumat", en: "Monday – Friday" },
      time: "09.00 – 17.00 WIB",
    },
    {
      days: { id: "Sabtu", en: "Saturday" },
      time: "09.00 – 14.00 WIB",
    },
    {
      days: { id: "Minggu & hari libur", en: "Sunday & public holidays" },
      time: { id: "Tutup", en: "Closed" },
    },
  ],
  // TODO(placeholder): akun media sosial belum dikonfirmasi.
  social: {
    instagram: "https://instagram.com/bungawisata",
    facebook: "https://www.facebook.com/bungawisata.malang",
    tiktok: "https://tiktok.com/@ownerbungawisata",
  },
  // TODO(placeholder): angka statistik masih karangan.
  stats: {
    travelers: 2500,
    destinations: 40,
    years: 10,
  },
} as const;
