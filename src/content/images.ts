/**
 * Katalog foto terpusat.
 *
 * Semua foto sementara diambil dari Unsplash. Setiap ID di bawah dipilih lewat
 * pencarian Unsplash per destinasi (bukan tebakan) dan diuji mengembalikan
 * HTTP 200 — skripnya ada di riwayat sesi, hasilnya dicek ulang dengan
 * `node scripts/check-images.mjs`.
 *
 * MENGGANTI DENGAN FOTO ASLI:
 *   1. Taruh file di `public/images/` (mis. `public/images/bali-pura.jpg`).
 *   2. Ubah nilai kunci yang bersangkutan menjadi "/images/bali-pura.jpg".
 *   3. Setelah tidak ada lagi URL unsplash, hapus `images.remotePatterns`
 *      di `next.config.ts`.
 *
 * Karena paket dan galeri hanya menyebut kunci, tidak ada URL yang perlu
 * dikejar ke file lain.
 */

/**
 * `auto=format` menyerahkan pilihan AVIF/WebP ke Unsplash, `fit=crop`
 * menjaga rasio saat next/image meminta ukuran lain.
 */
function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}

export const images = {
  // ── Bali ──────────────────────────────────────────────────────────────
  "bali-sawah": unsplash("photo-1513415756790-2ac1db1297d0"),
  "bali-terasering": unsplash("photo-1555400038-a088c772c8cd"),
  "bali-pura-laut": unsplash("photo-1698799619978-872b701b44a8"),
  "bali-tebing-uluwatu": unsplash("photo-1576019206484-54273acdfa89"),
  "bali-pantai-senja": unsplash("photo-1567520595708-2fb411a6ce88"),

  // ── Labuan Bajo & Komodo ──────────────────────────────────────────────
  "komodo-padar": unsplash("photo-1604560929658-bbc3c2ba6a36"),
  "komodo-kapal": unsplash("photo-1624104416015-f0ef71c7800a"),
  "komodo-satwa": unsplash("photo-1562578057-3ca1f7815237"),
  "komodo-pink-beach": unsplash("photo-1747806735725-ad02ac970269"),

  // ── Raja Ampat ────────────────────────────────────────────────────────
  "raja-ampat-piaynemo": unsplash("photo-1675377668920-86545643d25c"),
  "raja-ampat-gugusan": unsplash("photo-1724258426133-ade44aa271b8"),
  "raja-ampat-laguna": unsplash("photo-1637060544104-ce8f8b6b4d81"),

  // ── Yogyakarta ────────────────────────────────────────────────────────
  "yogya-borobudur": unsplash("photo-1566559532224-6d65e9fc0f37"),
  "yogya-borobudur-stupa": unsplash("photo-1689904575573-ac10f7edc6f9"),
  "yogya-prambanan": unsplash("photo-1628488321763-eb2f79b7f3b5"),

  // ── Bromo & Ijen ──────────────────────────────────────────────────────
  "bromo-lanskap": unsplash("photo-1662114480912-05a338d79da3"),
  "bromo-kaldera": unsplash("photo-1555503581-3229026fee68"),
  "bromo-udara": unsplash("photo-1518043610038-064362b44076"),
  "ijen-kawah": unsplash("photo-1776875339246-ba5d0e9dce43"),

  // ── Lombok & Gili ─────────────────────────────────────────────────────
  "gili-udara": unsplash("photo-1583022846753-83a4eba54ac1"),
  "gili-pulau": unsplash("photo-1619681216575-d6b3964fc278"),
  "gili-penyu": unsplash("photo-1709166796897-d5da6e01ca4f"),
  "lombok-rinjani": unsplash("photo-1654046920188-6e7ee051d7a4"),

  // ── Danau Toba ────────────────────────────────────────────────────────
  "toba-perahu": unsplash("photo-1592639298199-7b9d01c1cf29"),
  "toba-danau": unsplash("photo-1737549110662-5f03adff46e0"),
  "toba-samosir": unsplash("photo-1674648749681-288624ea37ff"),

  // ── Bangkok & Pattaya ─────────────────────────────────────────────────
  "bangkok-grand-palace": unsplash("photo-1586098311577-520120ba3df3"),
  "bangkok-wat-phra-kaew": unsplash("photo-1678915554115-a5e2de853191"),
  "bangkok-wat-arun": unsplash("photo-1563492065599-3520f775eeed"),
  "bangkok-kota": unsplash("photo-1531169628939-e84f860fa5d6"),
  "bangkok-pasar-terapung": unsplash("photo-1546945344-e830559a0601"),
  "pattaya-teluk": unsplash("photo-1625492206717-61c584a8b11e"),
  "pattaya-pantai": unsplash("photo-1562908234-59564a6baaa3"),

  // ── Singapura & Malaysia ──────────────────────────────────────────────
  "singapura-marina-bay": unsplash("photo-1525625293386-3f8f99389edd"),
  "singapura-merlion": unsplash("photo-1707412948209-e5143b6e2b49"),
  "singapura-sentosa": unsplash("photo-1707412924066-13d9e3e58257"),
  "malaysia-kuala-lumpur": unsplash("photo-1469130388952-72c427e96bb9"),
  "malaysia-malaka": unsplash("photo-1654428168579-a8c200df6848"),

  // ── Vietnam ───────────────────────────────────────────────────────────
  "vietnam-ha-long": unsplash("photo-1668000018482-a02acf02b22a"),
  "vietnam-ha-long-kapal": unsplash("photo-1528127269322-539801943592"),
  "vietnam-hanoi-kota-tua": unsplash("photo-1758104372690-0e14bc4dec5c"),
  "vietnam-hanoi-jalan": unsplash("photo-1613131145282-9476375618e1"),

  // ── Jepang ────────────────────────────────────────────────────────────
  "jepang-fuji": unsplash("photo-1526481280693-3bfa7568e0f3"),
  "jepang-chureito": unsplash("photo-1579525108311-0c5730b5799d"),
  "jepang-fushimi-inari": unsplash("photo-1613487691352-7d9b4ee5045b"),
  "jepang-gion": unsplash("photo-1693378173709-2197ce8c5af3"),
  "jepang-osaka-castle": unsplash("photo-1596240748549-6ec0f32d4c95"),
  "jepang-shibuya": unsplash("photo-1564608909988-b678124c55d6"),
  "jepang-tokyo": unsplash("photo-1547448526-5e9d57fa28f7"),

  // ── Korea Selatan ─────────────────────────────────────────────────────
  "korea-gyeongbokgung": unsplash("photo-1448523183439-d2ac62aca997"),
  "korea-istana": unsplash("photo-1556966346-0215efedf4d3"),
  "korea-seoul-malam": unsplash("photo-1532649097480-b67d52743b69"),
  "korea-nami": unsplash("photo-1558920560-8baa9b43dcc4"),

  // ── Turki ─────────────────────────────────────────────────────────────
  "turki-cappadocia": unsplash("photo-1559925906-3da1c5807d61"),
  "turki-balon": unsplash("photo-1609932937042-56e6bdd7a41b"),
  "turki-istanbul": unsplash("photo-1633773246110-442d2a731938"),
  "turki-masjid": unsplash("photo-1623621534850-d325a1980c7e"),

  // ── Dubai & Abu Dhabi ─────────────────────────────────────────────────
  "dubai-burj-khalifa": unsplash("photo-1544092683-c0c9ebb368e5"),
  "dubai-kota": unsplash("photo-1512453979798-5ea266f8880c"),
  "dubai-gurun": unsplash("photo-1624062999726-083e5268525d"),
  "dubai-unta": unsplash("photo-1549944850-84e00be4203b"),
  "abu-dhabi-masjid": unsplash("photo-1512632578888-169bbbc64f33"),

  // ── Umum ──────────────────────────────────────────────────────────────
  "umum-rombongan": unsplash("photo-1506869640319-fe1a24fd76dc"),
  "umum-pesawat": unsplash("photo-1530469641172-8ac15d0a7d6a"),
} as const;

export type ImageKey = keyof typeof images;

/** Dipakai `scripts/check-images.mjs` untuk menguji seluruh URL sekaligus. */
export const imageKeys = Object.keys(images) as ImageKey[];
