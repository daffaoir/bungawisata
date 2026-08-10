import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import type { AppLocale } from "@/i18n/routing";
import type { Package } from "@/lib/schema";
import { ItineraryDocument } from "./ItineraryDocument";

/**
 * Logo dibaca sekali lalu ditahan di memori. Saat `next build` merender 28
 * PDF (14 paket x 2 bahasa) berturut-turut, ini menghemat 27 pembacaan berkas.
 */
let logoPromise: Promise<Buffer> | null = null;

function loadLogo(): Promise<Buffer> {
  logoPromise ??= readFile(path.join(process.cwd(), "public", "logo-full.png"));
  return logoPromise;
}

export async function renderItineraryPdf(
  pkg: Package,
  locale: AppLocale,
): Promise<Buffer> {
  const logo = await loadLogo();

  return renderToBuffer(
    <ItineraryDocument pkg={pkg} locale={locale} logo={logo} />,
  );
}
