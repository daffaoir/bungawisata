/**
 * Menguji setiap foto di `src/content/images.ts` benar-benar ada di
 * `public/`.
 *
 *   node scripts/check-images.mjs
 *
 * Keluar dengan kode 1 kalau ada file yang hilang, supaya bisa dipasang di
 * CI kalau nanti diperlukan. Skrip ini sengaja membaca berkasnya sebagai
 * teks — jadi tidak butuh langkah kompilasi TypeScript.
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const source = await readFile(`${root}/src/content/images.ts`, "utf8");

const entries = [
  ...source.matchAll(/"([\w-]+)":\s*stock\("([\w-]+)",\s*"([^"]+)"\)/g),
].map(([, key, file, id]) => ({ key, file, id }));

if (entries.length === 0) {
  console.error("Tidak ada entri stock() yang terbaca — cek pola regexnya.");
  process.exit(1);
}

let failed = 0;
const duplicates = new Map();

for (const { key, file, id } of entries) {
  duplicates.set(id, [...(duplicates.get(id) ?? []), key]);

  if (key !== file) {
    failed += 1;
    console.error(`✗ ${key.padEnd(26)} nama file "${file}" tidak sama dengan kunci`);
  } else if (!existsSync(`${root}/public/images/stock/${file}.jpg`)) {
    failed += 1;
    console.error(`✗ ${key.padEnd(26)} public/images/stock/${file}.jpg tidak ada`);
  }
}

for (const [id, keys] of duplicates) {
  if (keys.length > 1) {
    console.warn(`! foto ${id} dipakai ulang oleh: ${keys.join(", ")}`);
  }
}

console.log(`\n${entries.length - failed}/${entries.length} foto tersedia.`);
process.exit(failed === 0 ? 0 : 1);
