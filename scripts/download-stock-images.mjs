/**
 * Sekali jalan: unduh foto stok Unsplash yang dipakai situs ke
 * `public/images/stock/<kunci>.jpg`, lalu tulis daftar sumbernya ke
 * `docs/CREDITS-FOTO.md`.
 *
 * Pakai: node scripts/download-stock-images.mjs
 *
 * Membaca kunci dan ID Unsplash dari `src/content/images.ts` (pola
 * `"kunci": stock("kunci", "photo-…")`). Foto yang sudah ada dilewati.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SOURCE = process.argv[2] ?? "src/content/images.ts";
const OUT_DIR = "public/images/stock";
const WIDTH = 1600;

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
  if (existsSync(file)) continue;

  const url = `https://images.unsplash.com/${id}?fm=jpg&fit=crop&w=${WIDTH}&q=72`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${key}: HTTP ${response.status} (${url})`);

  // Kompres ulang (mozjpeg) — ukuran repo turun kira-kira separuhnya.
  const buffer = await sharp(Buffer.from(await response.arrayBuffer()))
    .resize({ width: WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true, progressive: true })
    .toBuffer();
  writeFileSync(file, buffer);
  total += buffer.length;
  console.log(`${key}.jpg  ${Math.round(buffer.length / 1024)} KB`);
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
kapan pun tersedia (lihat \`src/content/images.ts\`).

Diunduh ${new Date().toISOString().slice(0, 10)} dengan \`node scripts/download-stock-images.mjs\`
(lebar maks. ${WIDTH}px, JPEG mozjpeg q70).

| File | Sumber |
|---|---|
${rows}
`,
);

console.log(`\n${entries.length} foto, ${Math.round(total / 1024 / 1024)} MB baru diunduh.`);
