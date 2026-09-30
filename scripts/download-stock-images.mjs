/**
 * Sekali jalan: unduh foto stok Unsplash yang dipakai situs ke
 * `public/images/stock/<kunci>.jpg`, lalu tulis daftar sumbernya ke
 * `docs/CREDITS-FOTO.md`.
 *
 * Pakai: node scripts/download-stock-images.mjs [--force] [sumber.ts]
 *
 * Membaca kunci dan ID Unsplash dari `src/content/images.ts` (pola
 * `"kunci": stock("kunci", "photo-…")`). Foto yang sudah ada dilewati,
 * kecuali dengan `--force` (semua foto diunduh ulang).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const SOURCE = args.find((arg) => !arg.startsWith("--")) ?? "src/content/images.ts";
const OUT_DIR = "public/images/stock";
// Lebar maks. 2560 supaya layar retina/lebar tetap tajam; next/image yang
// membuat varian kecilnya.
const WIDTH = 2560;
const QUALITY = 85;

const text = readFileSync(SOURCE, "utf8");
const entries = [
  ...text.matchAll(/"([a-z0-9-]+)":\s*stock\("[a-z0-9-]+",\s*"([^"]+)"\)/g),
].map(([, key, id]) => ({ key, id }));

if (entries.length === 0) {
  console.error(`Tidak ada entri stock(...) di ${SOURCE}`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

let total = 0;
for (const { key, id } of entries) {
  const file = `${OUT_DIR}/${key}.jpg`;
  if (existsSync(file) && !FORCE) continue;

  // `fit=max`: diperkecil ke 2560px, tapi tidak pernah diperbesar — foto
  // asli yang lebih kecil diambil dengan lebar aslinya.
  const url = `https://images.unsplash.com/${id}?fm=jpg&fit=max&w=${WIDTH}&q=${QUALITY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${key}: HTTP ${response.status} (${url})`);

  // Byte JPEG dari Unsplash disimpan apa adanya, tanpa kompres ulang:
  // setiap encode lossy tambahan mengikis detail. Diukur (PSNR terhadap
  // unduhan q100): q85 apa adanya ≥ kompres ulang mozjpeg q88 4:4:4, dengan
  // ukuran file setara.
  const buffer = Buffer.from(await response.arrayBuffer());
  const { width, height, format } = await sharp(buffer).metadata();
  if (format !== "jpeg") throw new Error(`${key}: bukan JPEG (${format})`);
  writeFileSync(file, buffer);
  total += buffer.length;
  console.log(`${key}.jpg  ${width}x${height}  ${Math.round(buffer.length / 1024)} KB`);
}

const rows = entries
  .map(
    ({ key, id }) =>
      `| \`/images/stock/${key}.jpg\` | https://images.unsplash.com/${id} |`,
  )
  .join("\n");

writeFileSync(
  "docs/CREDITS-FOTO.md",
  `# Kredit foto

Semua foto di \`public/images/stock/\` adalah foto stok dari **Unsplash**, dipakai
di bawah [Unsplash License](https://unsplash.com/license): boleh dipakai gratis
untuk keperluan komersial, tanpa wajib atribusi, tetapi **tidak boleh** dijual
ulang apa adanya atau dipakai untuk layanan foto sejenis.

Foto-foto ini menggambarkan **destinasi**, bukan dokumentasi perjalanan Bunga
Wisata. Jangan beri caption yang mengklaim sebaliknya. Ganti dengan foto asli
kapan pun tersedia (lihat \`src/content/images.ts\`). Foto \`suasana-*\`
menampilkan wisatawan umum (bukan peserta tur Bunga Wisata).

Diunduh ${new Date().toISOString().slice(0, 10)} dengan \`node scripts/download-stock-images.mjs --force\`
(lebar maks. ${WIDTH}px tanpa pembesaran, JPEG q${QUALITY} dari Unsplash disimpan apa
adanya — tidak dikompres ulang).

| File | Sumber |
|---|---|
${rows}
`,
);

console.log(`\n${entries.length} foto, ${Math.round(total / 1024 / 1024)} MB baru diunduh.`);
