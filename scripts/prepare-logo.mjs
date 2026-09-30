/**
 * Menyiapkan turunan logo dari file master.
 *
 * Master aslinya 11080×11080 (1,7 MB) — jauh lebih besar dari yang dibutuhkan
 * situs. Skrip ini memotong dan menurunkan resolusinya sekali, hasilnya
 * di-commit, jadi tidak ada pemrosesan gambar saat build maupun runtime.
 *
 * Jalankan ulang hanya kalau file master diganti:
 *   node scripts/prepare-logo.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = path.join(ROOT, "assets", "logo-master.png");

/**
 * Posisi belah ketupat di dalam gambar master, hasil pemindaian baris piksel
 * berisi tinta. Nilainya proporsional supaya tetap benar walau master
 * di-resize.
 */
const MARK_BOX = { left: 0.325, top: 0.2175, right: 0.7138, bottom: 0.6062 };

/** Ruang napas di sekeliling potongan, sebagai rasio sisi potongan. */
const MARK_PADDING = 0.06;

/**
 * Warna tinta logo: cokelat soga palet situs (`--color-ink`). Master-nya
 * hitam-putih; `linear` memetakan hitam → soga dan membiarkan putih tetap
 * putih, per kanal RGB. Kanal alfa tidak diubah.
 */
const INK = { r: 0x2a, g: 0x1f, b: 0x16 };
const TINT = {
  a: [(255 - INK.r) / 255, (255 - INK.g) / 255, (255 - INK.b) / 255, 1],
  b: [INK.r, INK.g, INK.b, 0],
};

/** Warna latar favicon & ikon aplikasi: kertas (`--color-canvas`). */
const CANVAS = "#FBF8F2";

async function main() {
  const master = sharp(MASTER);
  const { width, height } = await master.metadata();

  if (!width || !height) throw new Error("Tidak bisa membaca dimensi master.");

  const rawLeft = Math.round(MARK_BOX.left * width);
  const rawTop = Math.round(MARK_BOX.top * height);
  const rawWidth = Math.round((MARK_BOX.right - MARK_BOX.left) * width);
  const rawHeight = Math.round((MARK_BOX.bottom - MARK_BOX.top) * height);

  // Jadikan bujur sangkar dengan sisi terpanjang, lalu beri padding, supaya
  // belah ketupatnya tidak gepeng dan tidak menempel di tepi.
  const side = Math.max(rawWidth, rawHeight);
  const pad = Math.round(side * MARK_PADDING);
  const boxSide = side + pad * 2;
  const centerX = rawLeft + rawWidth / 2;
  const centerY = rawTop + rawHeight / 2;

  const extract = {
    left: Math.max(0, Math.round(centerX - boxSide / 2)),
    top: Math.max(0, Math.round(centerY - boxSide / 2)),
    width: Math.min(width, boxSide),
    height: Math.min(height, boxSide),
  };

  await mkdir(path.join(ROOT, "public"), { recursive: true });

  // 1. Lambang saja, latar transparan — dipakai header, footer, kartu.
  await sharp(MASTER)
    .ensureAlpha()
    .linear(TINT.a, TINT.b)
    .extract(extract)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "public", "logo-mark.png"));

  // 2. Logo utuh (lambang + wordmark + tagline) — dipakai PDF dan OG image.
  await sharp(MASTER)
    .ensureAlpha()
    .linear(TINT.a, TINT.b)
    .trim({ threshold: 1 })
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "public", "logo-full.png"));

  // 3. Favicon & ikon aplikasi. Latar transparan akan hilang di tab browser
  //    bertema gelap, jadi diratakan ke warna kanvas situs.
  const icons = [
    { file: "src/app/icon.png", size: 512 },
    { file: "src/app/apple-icon.png", size: 180 },
    { file: "public/icon-192.png", size: 192 },
    { file: "public/icon-512.png", size: 512 },
  ];

  for (const icon of icons) {
    const inner = Math.round(icon.size * 0.875);
    const margin = Math.round((icon.size - inner) / 2);
    await sharp(MASTER)
      .ensureAlpha()
      .linear(TINT.a, TINT.b)
      .extract(extract)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: margin,
        bottom: icon.size - inner - margin,
        left: margin,
        right: icon.size - inner - margin,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .flatten({ background: CANVAS })
      .png({ compressionLevel: 9 })
      .toFile(path.join(ROOT, icon.file));
  }

  for (const file of [
    "public/logo-mark.png",
    "public/logo-full.png",
    ...icons.map((icon) => icon.file),
  ]) {
    const meta = await sharp(path.join(ROOT, file)).metadata();
    console.log(`${file} — ${meta.width}×${meta.height}, ${meta.size} bytes`);
  }
}

await main();
