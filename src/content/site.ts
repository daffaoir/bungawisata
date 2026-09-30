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

/**
 * Dipakai untuk metadata absolut, sitemap, dan hreflang.
 * `||` (bukan `??`) supaya env berisi string kosong juga jatuh ke fallback.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bungawisata.co.id"
).replace(/\/$/, "");

/**
 * Token Cloudflare Web Analytics (bukan rahasia; ikut tampil di HTML).
 * Kosong = skrip analytics tidak dipasang.
 */
export const CF_BEACON_TOKEN =
  process.env.NEXT_PUBLIC_CF_BEACON_TOKEN?.trim() || undefined;

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
 * Tautan profil bisnis Google resmi Bunga Wisata ("Bunga Wisata Tour and
 * Travel"). Format `?cid=` stabil — ID-nya diambil dari profil pada
 * 2026-09-28 dan sudah dicek membuka profil yang benar. Dipakai tombol
 * "Buka di Google Maps", tautan ulasan, dan `hasMap` di JSON-LD. TIDAK bisa
 * dipakai untuk `<iframe>` karena Google mengirim `X-Frame-Options`.
 */
export const MAPS_LINK = "https://www.google.com/maps?cid=10290067987447166487";

/** Ulasan pelanggan tampil di profil yang sama. */
export const GOOGLE_REVIEWS_URL = MAPS_LINK;

/**
 * Email kontak dibaca dari env tanpa fallback: sebelum `info@bungawisata.co.id`
 * aktif (Email Routing Cloudflare), email disembunyikan di seluruh situs,
 * JSON-LD, dan PDF. Jangan isi alamat karangan di sini.
 */
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;

/**
 * Jam operasional mengikuti Google Business Profile (dicek 2026-09-28).
 * `days`/`time` untuk tampilan; `schema` untuk `openingHoursSpecification`.
 */
const HOURS = [
  {
    days: { id: "Senin – Sabtu", en: "Monday – Saturday" },
    time: "08.00 – 17.00 WIB",
    schema: {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  },
  {
    days: { id: "Minggu & hari libur", en: "Sunday & public holidays" },
    time: { id: "Tutup", en: "Closed" },
    schema: null,
  },
] as const;

export const site = {
  /** Nama brand di UI. */
  name: "Bunga Wisata",
  /** Nama di Google Business Profile — dipakai di JSON-LD. */
  businessName: "Bunga Wisata Tour and Travel",
  /** Nama badan usaha (profil Facebook resmi). */
  legalName: "CV. Bunga Wisata Malang",
  tagline: "Ur Friendly Partner for Travelling",
  email: CONTACT_EMAIL,
  phoneDisplay: "+62 812-3390-9129",
  phoneE164: "+6281233909129",
  address: ADDRESS,
  geo: { lat: -7.8897902, lng: 112.591502 },
  hours: HOURS,
  // Ketiga akun dicek 2026-09-28: milik Bunga Wisata (nomor & nama cocok).
  social: {
    instagram: "https://www.instagram.com/bungawisata/",
    facebook: "https://www.facebook.com/bungawisata.malang",
    tiktok: "https://www.tiktok.com/@ownerbungawisata",
  },
  /**
   * Bukti yang bisa dicek publik (2026-09-28). Perbarui kalau angkanya
   * berubah — jangan tambahkan angka yang tidak punya sumber.
   */
  proof: {
    googleRating: 4.7,
    googleReviewCount: 30,
    facebookFollowers: 6700,
  },
} as const;
