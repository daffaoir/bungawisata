/**
 * Memastikan bundle Worker muat di free plan Cloudflare (3 MB gzip).
 *
 *   npx opennextjs-cloudflare build && npm run cf:size
 *
 * Ukurannya diambil dari `wrangler deploy --dry-run`, angka yang sama dengan
 * yang diperiksa Cloudflare saat deploy. Kalau gagal, cari dependensi besar
 * yang ikut terbundel (mis. @react-pdf, next/og) di
 * `.open-next/server-functions/default/handler.mjs.meta.json`.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";

const LIMIT_KIB = 3072;
// Beri tahu lebih awal sebelum benar-benar mentok.
const WARN_KIB = 2950;

const outdir = mkdtempSync(path.join(tmpdir(), "wrangler-dry-run-"));
// Jalankan CLI wrangler langsung dengan Node (tanpa `npx`/shell) supaya
// sama di Windows dan Linux.
const wrangler = path.join(
  path.dirname(createRequire(import.meta.url).resolve("wrangler/package.json")),
  "bin",
  "wrangler.js",
);
const result = spawnSync(
  process.execPath,
  [wrangler, "deploy", "--dry-run", "--outdir", outdir],
  { encoding: "utf8" },
);
rmSync(outdir, { recursive: true, force: true });

const output = `${result.stdout}\n${result.stderr}`;
const match = output.match(/gzip:\s*([\d.]+)\s*KiB/);

if (result.status !== 0 || !match) {
  console.error(output);
  console.error("check-worker-size: dry run gagal atau ukuran tidak terbaca");
  process.exit(1);
}

const gzipKiB = Number(match[1]);
const summary = `Worker gzip ${gzipKiB.toFixed(0)} KiB / batas ${LIMIT_KIB} KiB`;

if (gzipKiB > LIMIT_KIB) {
  console.error(`check-worker-size: GAGAL, ${summary}`);
  process.exit(1);
}
if (gzipKiB > WARN_KIB) {
  console.warn(`check-worker-size: PERINGATAN, ${summary} (hampir penuh)`);
} else {
  console.log(`check-worker-size: OK, ${summary}`);
}
