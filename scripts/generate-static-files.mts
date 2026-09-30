/**
 * Membuat PDF itinerary dan gambar Open Graph ke `public/`.
 *
 *   npm run generate                 (otomatis lewat `prebuild`)
 *   npm run generate -- --if-missing (lewat `predev`: lewati kalau sudah ada)
 *
 * Keduanya dulu dirender route Next saat build. Di Cloudflare Workers kode
 * @react-pdf dan resvg tetap ikut dibundel walau halamannya statis, dan
 * bundlenya jadi melewati batas 3 MB free plan. Jadi berkasnya dibuat di
 * sini dan Worker cukup melayaninya sebagai aset statis.
 *
 * Keluaran ada di `.gitignore`; sumber kebenarannya tetap konten di `src/`.
 */
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import type { AppLocale } from "@/i18n/routing";

// Muat berkas env seperti `next build`/`next dev` (nomor WhatsApp dan email
// di PDF dibaca dari sana). Harus sebelum modul konten diimpor, karena
// `src/content/site.ts` membaca `process.env` saat dimuat.
nextEnv.loadEnvConfig(process.cwd(), process.argv.includes("--if-missing"));

const { routing } = await import("@/i18n/routing");
const { getAllPackages } = await import("@/lib/packages");
const { renderOgImage } = await import("@/lib/og/OgImage");
const { renderItineraryPdf } = await import("@/lib/pdf/render");
const { itineraryPdfPath, ogImagePath } = await import("@/lib/static-files");

const PUBLIC_DIR = path.join(process.cwd(), "public");

function toFile(publicPath: string) {
  return path.join(PUBLIC_DIR, ...publicPath.split("/"));
}

async function write(publicPath: string, data: Uint8Array) {
  const file = toFile(publicPath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

async function loadMessages(locale: AppLocale) {
  const raw = await readFile(
    path.join(process.cwd(), "src", "messages", `${locale}.json`),
    "utf8",
  );
  return JSON.parse(raw) as {
    Meta: { siteName: string };
    Home: { hero: { title: string; departure: string } };
  };
}

async function generatePdfs() {
  let count = 0;
  for (const locale of routing.locales) {
    for (const pkg of getAllPackages()) {
      const pdf = await renderItineraryPdf(pkg, locale);
      await write(itineraryPdfPath(locale, pkg.slug), pdf);
      count++;
    }
  }
  return count;
}

async function generateOgImages() {
  const photo = await readFile(
    path.join(PUBLIC_DIR, "images", "stock", "bromo-kaldera.jpg"),
  );
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  for (const locale of routing.locales) {
    const messages = await loadMessages(locale);
    const image = renderOgImage({
      siteName: messages.Meta.siteName,
      title: messages.Home.hero.title,
      departure: messages.Home.hero.departure,
      photoSrc,
    });
    await write(ogImagePath(locale), new Uint8Array(await image.arrayBuffer()));
  }
  return routing.locales.length;
}

/**
 * Untuk `next dev`: 28 PDF butuh ±30 detik, jadi tidak dibuat ulang tiap kali
 * server dev dinyalakan. Build selalu membuat ulang supaya ikut konten terbaru.
 */
async function allOutputsExist() {
  const outputs = routing.locales.flatMap((locale) => [
    ogImagePath(locale),
    ...getAllPackages().map((pkg) => itineraryPdfPath(locale, pkg.slug)),
  ]);
  try {
    await Promise.all(outputs.map((output) => access(toFile(output))));
    return true;
  } catch {
    return false;
  }
}

if (process.argv.includes("--if-missing") && (await allOutputsExist())) {
  console.log("generate-static-files: berkas sudah ada, dilewati");
  process.exit(0);
}

const started = Date.now();
const [pdfs, ogs] = await Promise.all([generatePdfs(), generateOgImages()]);
console.log(
  `generate-static-files: ${pdfs} PDF, ${ogs} OG image (${Date.now() - started} ms)`,
);
