import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bunga Wisata — Tour & Travel";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Gambar pratinjau untuk WhatsApp, Facebook, dan X — dibuat saat build,
 * jadi tidak perlu menyiapkan file gambar terpisah.
 *
 * TODO: ganti dengan desain resmi kalau nanti sudah ada.
 */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b2545 0%, #ae2e04 62%, #d63a05 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Satori mensyaratkan setiap <div> berisi satu anak teks saja,
            kecuali diberi display flex secara eksplisit. */}
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ffd84d",
            fontWeight: 700,
          }}
        >
          {`${t("siteName")} · ${t("tagline")}`}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            lineHeight: 1.1,
            fontWeight: 800,
            maxWidth: 900,
          }}
        >
          {t("defaultTitle")}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.82)",
            maxWidth: 880,
          }}
        >
          {t("defaultDescription")}
        </div>
      </div>
    ),
    size,
  );
}
