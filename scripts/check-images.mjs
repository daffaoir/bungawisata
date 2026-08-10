/**
 * Menguji setiap foto di `src/content/images.ts` benar-benar dapat diambil.
 *
 *   node scripts/check-images.mjs
 *
 * Keluar dengan kode 1 kalau ada URL yang tidak membalas 200, supaya bisa
 * dipasang di CI kalau nanti diperlukan. Skrip ini sengaja membaca berkasnya
 * sebagai teks — jadi tidak butuh langkah kompilasi TypeScript.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = await readFile(
  fileURLToPath(new URL("../src/content/images.ts", import.meta.url)),
  "utf8",
);

const entries = [...source.matchAll(/"([\w-]+)":\s*unsplash\("([^"]+)"/g)].map(
  ([, key, id]) => ({ key, id }),
);

if (entries.length === 0) {
  console.error("Tidak ada entri unsplash() yang terbaca — cek pola regexnya.");
  process.exit(1);
}

const duplicates = new Map();
for (const { key, id } of entries) {
  duplicates.set(id, [...(duplicates.get(id) ?? []), key]);
}

let failed = 0;

// Dibatasi 8 permintaan sekaligus supaya Unsplash tidak menolak karena laju.
const queue = [...entries];
async function worker() {
  while (queue.length > 0) {
    const { key, id } = queue.shift();
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=60`;
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        failed += 1;
        console.error(`✗ ${key.padEnd(26)} HTTP ${res.status}  ${id}`);
      }
    } catch (err) {
      failed += 1;
      console.error(`✗ ${key.padEnd(26)} ${err.message}  ${id}`);
    }
  }
}

await Promise.all(Array.from({ length: 8 }, worker));

for (const [id, keys] of duplicates) {
  if (keys.length > 1) {
    console.warn(`! foto ${id} dipakai ulang oleh: ${keys.join(", ")}`);
  }
}

console.log(`\n${entries.length - failed}/${entries.length} foto membalas 200.`);
process.exit(failed === 0 ? 0 : 1);
