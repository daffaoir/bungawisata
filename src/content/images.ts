/**
 * Katalog foto terpusat.
 *
 * Semua foto saat ini adalah foto stok Unsplash yang sudah diunduh ke
 * `public/images/stock/` (lihat `docs/CREDITS-FOTO.md` untuk sumber dan
 * lisensinya). Foto ini menggambarkan destinasi, bukan dokumentasi
 * perjalanan Bunga Wisata.
 *
 * MENGGANTI DENGAN FOTO ASLI:
 *   1. Taruh file di `public/images/` (mis. `public/images/bali-pura.jpg`).
 *   2. Ubah nilai kunci yang bersangkutan menjadi "/images/bali-pura.jpg".
 *
 * Karena paket dan galeri hanya menyebut kunci, tidak ada URL yang perlu
 * dikejar ke file lain.
 */

/**
 * Path foto stok lokal. ID Unsplash asal disimpan sebagai argumen kedua
 * supaya sumbernya tetap terlacak (dan `scripts/download-stock-images.mjs`
 * bisa mengunduh ulang).
 */
function stock(key: string, unsplashId: string): string {
  void unsplashId;
  return `/images/stock/${key}.jpg`;
}

export const images = {
  // ── Bali ──────────────────────────────────────────────────────────────
  "bali-sawah": stock("bali-sawah", "photo-1513415756790-2ac1db1297d0"),
  "bali-terasering": stock("bali-terasering", "photo-1555400038-a088c772c8cd"),
  "bali-pura-laut": stock("bali-pura-laut", "photo-1542725231-e6ff634bf0f5"),
  "bali-tebing-uluwatu": stock("bali-tebing-uluwatu", "photo-1576019206484-54273acdfa89"),
  "bali-pantai-senja": stock("bali-pantai-senja", "photo-1655779282295-a573301955cc"),

  // ── Labuan Bajo & Komodo ──────────────────────────────────────────────
  "komodo-padar": stock("komodo-padar", "photo-1660279582815-8d9a2b0d7e27"),
  "komodo-kapal": stock("komodo-kapal", "photo-1624104416015-f0ef71c7800a"),
  "komodo-satwa": stock("komodo-satwa", "photo-1562578057-3ca1f7815237"),
  "komodo-pink-beach": stock("komodo-pink-beach", "photo-1736478771374-434fa25e81ea"),

  // ── Raja Ampat ────────────────────────────────────────────────────────
  "raja-ampat-piaynemo": stock("raja-ampat-piaynemo", "photo-1675377668920-86545643d25c"),
  "raja-ampat-gugusan": stock("raja-ampat-gugusan", "photo-1724258426133-ade44aa271b8"),
  "raja-ampat-laguna": stock("raja-ampat-laguna", "photo-1637060544104-ce8f8b6b4d81"),

  // ── Yogyakarta ────────────────────────────────────────────────────────
  "yogya-borobudur": stock("yogya-borobudur", "photo-1566559532224-6d65e9fc0f37"),
  "yogya-borobudur-stupa": stock("yogya-borobudur-stupa", "photo-1689904575573-ac10f7edc6f9"),
  "yogya-prambanan": stock("yogya-prambanan", "photo-1578469550956-0e16b69c6a3d"),

  // ── Bromo & Ijen ──────────────────────────────────────────────────────
  "bromo-lanskap": stock("bromo-lanskap", "photo-1662114480912-05a338d79da3"),
  "bromo-kaldera": stock("bromo-kaldera", "photo-1749731630653-d9b3f00573ed"),
  "bromo-udara": stock("bromo-udara", "photo-1585357214259-f977cc7d73a4"),
  "ijen-kawah": stock("ijen-kawah", "photo-1776875339246-ba5d0e9dce43"),

  // ── Lombok & Gili ─────────────────────────────────────────────────────
  "gili-udara": stock("gili-udara", "photo-1583022846753-83a4eba54ac1"),
  "gili-pulau": stock("gili-pulau", "photo-1587364125669-354c5735dd2d"),
  "gili-penyu": stock("gili-penyu", "photo-1709483095301-2d1f3e95b1d4"),
  "lombok-rinjani": stock("lombok-rinjani", "photo-1698267703889-06c41f9acba5"),

  // ── Danau Toba ────────────────────────────────────────────────────────
  "toba-perahu": stock("toba-perahu", "photo-1592639298199-7b9d01c1cf29"),
  "toba-danau": stock("toba-danau", "photo-1569081562679-6d71c00aab86"),
  "toba-samosir": stock("toba-samosir", "photo-1674648749681-288624ea37ff"),

  // ── Bangkok & Pattaya ─────────────────────────────────────────────────
  "bangkok-grand-palace": stock("bangkok-grand-palace", "photo-1586098311577-520120ba3df3"),
  "bangkok-wat-phra-kaew": stock("bangkok-wat-phra-kaew", "photo-1678915554115-a5e2de853191"),
  "bangkok-wat-arun": stock("bangkok-wat-arun", "photo-1563492065599-3520f775eeed"),
  "bangkok-kota": stock("bangkok-kota", "photo-1531169628939-e84f860fa5d6"),
  "bangkok-pasar-terapung": stock("bangkok-pasar-terapung", "photo-1546945344-e830559a0601"),
  "pattaya-teluk": stock("pattaya-teluk", "photo-1625492206717-61c584a8b11e"),
  "pattaya-pantai": stock("pattaya-pantai", "photo-1620373901514-4319a7c81cdb"),

  // ── Singapura & Malaysia ──────────────────────────────────────────────
  "singapura-marina-bay": stock("singapura-marina-bay", "photo-1525625293386-3f8f99389edd"),
  "singapura-merlion": stock("singapura-merlion", "photo-1707412948209-e5143b6e2b49"),
  "singapura-sentosa": stock("singapura-sentosa", "photo-1707412924066-13d9e3e58257"),
  "malaysia-kuala-lumpur": stock("malaysia-kuala-lumpur", "photo-1469130388952-72c427e96bb9"),
  "malaysia-malaka": stock("malaysia-malaka", "photo-1654428168579-a8c200df6848"),

  // ── Vietnam ───────────────────────────────────────────────────────────
  "vietnam-ha-long": stock("vietnam-ha-long", "photo-1561461221-959c3f16234b"),
  "vietnam-ha-long-kapal": stock("vietnam-ha-long-kapal", "photo-1528127269322-539801943592"),
  "vietnam-hanoi-kota-tua": stock("vietnam-hanoi-kota-tua", "photo-1758104372690-0e14bc4dec5c"),
  "vietnam-hanoi-jalan": stock("vietnam-hanoi-jalan", "photo-1613131145282-9476375618e1"),

  // ── Jepang ────────────────────────────────────────────────────────────
  "jepang-fuji": stock("jepang-fuji", "photo-1526481280693-3bfa7568e0f3"),
  "jepang-chureito": stock("jepang-chureito", "photo-1579525108311-0c5730b5799d"),
  "jepang-fushimi-inari": stock("jepang-fushimi-inari", "photo-1558862107-d49ef2a04d72"),
  "jepang-gion": stock("jepang-gion", "photo-1693378173709-2197ce8c5af3"),
  "jepang-osaka-castle": stock("jepang-osaka-castle", "photo-1596240748549-6ec0f32d4c95"),
  "jepang-shibuya": stock("jepang-shibuya", "photo-1564608909988-b678124c55d6"),
  "jepang-tokyo": stock("jepang-tokyo", "photo-1547448526-5e9d57fa28f7"),

  // ── Korea Selatan ─────────────────────────────────────────────────────
  "korea-gyeongbokgung": stock("korea-gyeongbokgung", "photo-1448523183439-d2ac62aca997"),
  "korea-istana": stock("korea-istana", "photo-1556966346-0215efedf4d3"),
  "korea-seoul-malam": stock("korea-seoul-malam", "photo-1532649097480-b67d52743b69"),
  "korea-nami": stock("korea-nami", "photo-1558920560-8baa9b43dcc4"),

  // ── Turki ─────────────────────────────────────────────────────────────
  "turki-cappadocia": stock("turki-cappadocia", "photo-1559925906-3da1c5807d61"),
  "turki-balon": stock("turki-balon", "photo-1609932937042-56e6bdd7a41b"),
  "turki-istanbul": stock("turki-istanbul", "photo-1633773246110-442d2a731938"),
  "turki-masjid": stock("turki-masjid", "photo-1623621534850-d325a1980c7e"),

  // ── Dubai & Abu Dhabi ─────────────────────────────────────────────────
  "dubai-burj-khalifa": stock("dubai-burj-khalifa", "photo-1544092683-c0c9ebb368e5"),
  "dubai-kota": stock("dubai-kota", "photo-1512453979798-5ea266f8880c"),
  "dubai-gurun": stock("dubai-gurun", "photo-1746569867775-c994d833b6aa"),
  "dubai-unta": stock("dubai-unta", "photo-1549944850-84e00be4203b"),
  "abu-dhabi-masjid": stock("abu-dhabi-masjid", "photo-1512632578888-169bbbc64f33"),

  // ── Umum ──────────────────────────────────────────────────────────────
  "umum-rombongan": stock("umum-rombongan", "photo-1506869640319-fe1a24fd76dc"),
  "umum-pesawat": stock("umum-pesawat", "photo-1530469641172-8ac15d0a7d6a"),
  // Siswa SD berseragam merah putih di gazebo luar ruang.
  "umum-study-tour": stock("umum-study-tour", "photo-1648518295678-f78670c35924"),
  // Rombongan pendaki bergembira di puncak berbatu.
  "umum-teman-puncak": stock("umum-teman-puncak", "photo-1578598486218-90db948624fb"),
  // Tangan memegang paspor Indonesia di depan terminal bandara.
  "umum-paspor": stock("umum-paspor", "photo-1787030186312-ee07d04114f6"),
  // Wisatawan memotret danau dengan kamera.
  "umum-fotografer": stock("umum-fotografer", "photo-1599488488048-10c00b12ea2b"),

  // ── Suasana (wisatawan umum, bukan peserta tur Bunga Wisata) ─────────
  // Rombongan pendaki menyaksikan matahari terbit di puncak gunung.
  "suasana-sunrise-rombongan": stock("suasana-sunrise-rombongan", "photo-1706865854509-821c960ce465"),
  // Ibu dan anak berlari ke ombak saat matahari sore.
  "suasana-pantai-keluarga": stock("suasana-pantai-keluarga", "photo-1761030149081-50abb59676ef"),
  // Wisatawan di haluan kapal pinisi saat senja dekat Pulau Kalong, Labuan Bajo.
  "suasana-kapal-teman": stock("suasana-kapal-teman", "photo-1665234811705-02e42eda85d2"),
  // Wisatawan berjalan menuju Candi Borobudur.
  "suasana-candi-jalan": stock("suasana-candi-jalan", "photo-1684189162727-3b0fd73ba9e3"),
} as const;

export type ImageKey = keyof typeof images;

/** Dipakai `scripts/check-images.mjs` untuk menguji seluruh URL sekaligus. */
export const imageKeys = Object.keys(images) as ImageKey[];
