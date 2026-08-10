import { routing, type AppLocale } from "@/i18n/routing";
import {
  buildContentDisposition,
  buildItineraryFilename,
} from "@/lib/itinerary-pdf";
import { getAllPackages, getPackageBySlug } from "@/lib/packages";
import { renderItineraryPdf } from "@/lib/pdf/render";

/**
 * Unduhan PDF itinerary.
 *
 * Ditaruh di bawah `/api` supaya dilewati matcher middleware next-intl di
 * `src/proxy.ts` — jadi jalurnya tidak ikut diterjemahkan. Dengan
 * `generateStaticParams` dan `dynamic = "force-static"`, seluruh kombinasi
 * bahasa x paket dirender sekali saat `next build`; tidak ada biaya rendering
 * saat pengguna mengklik tombol unduh.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPackages().map((pkg) => ({ locale, slug: pkg.slug })),
  );
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/itinerary/[locale]/[slug]">,
) {
  const { locale, slug } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    return new Response("Bahasa tidak dikenal", { status: 404 });
  }

  const pkg = getPackageBySlug(slug);
  if (!pkg) {
    return new Response("Paket tidak ditemukan", { status: 404 });
  }

  const appLocale = locale as AppLocale;
  const pdf = await renderItineraryPdf(pkg, appLocale);
  const filename = buildItineraryFilename(pkg, appLocale);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": buildContentDisposition(filename),
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
