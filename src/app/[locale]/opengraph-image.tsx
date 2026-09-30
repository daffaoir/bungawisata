import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bunga Wisata Tour & Travel";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Gambar pratinjau untuk WhatsApp, Facebook, dan X — dibuat saat build.
 * Bahasanya sama dengan situs: panel hijau daun, foto membulat, teks kertas.
 */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const tHero = await getTranslations({ locale, namespace: "Home.hero" });

  const photo = await readFile(
    path.join(process.cwd(), "public", "images", "stock", "bromo-kaldera.jpg"),
  );
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: "#1e3b2f",
          color: "#fbf8f2",
          fontFamily: "serif",
        }}
      >
        {/* Satori mensyaratkan setiap <div> berisi satu anak teks saja,
            kecuali diberi display flex secara eksplisit. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 620,
            padding: "44px 40px 44px 44px",
          }}
        >
          <div style={{ fontSize: 26, color: "#ebc27a", fontFamily: "sans-serif" }}>
            {t("siteName")}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, lineHeight: 1.08, maxWidth: 540 }}>
              {tHero("title")}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                lineHeight: 1.45,
                color: "rgba(251,248,242,0.82)",
                fontFamily: "sans-serif",
                maxWidth: 520,
              }}
            >
              {tHero("departure")}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori hanya mengenal <img>. */}
        <img
          src={photoSrc}
          alt=""
          width={524}
          height={574}
          style={{ borderRadius: 36, objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
