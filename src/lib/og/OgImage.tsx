import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE } from "@/lib/static-files";

/**
 * Gambar pratinjau untuk WhatsApp, Facebook, dan X. Dirender oleh
 * `scripts/generate-static-files.mts` sebelum build, bukan oleh server.
 * Bahasanya sama dengan situs: panel hijau daun, foto membulat, teks kertas.
 */
export function renderOgImage({
  siteName,
  title,
  departure,
  photoSrc,
}: {
  siteName: string;
  title: string;
  departure: string;
  /** Foto sebagai data URI, karena Satori tidak membaca berkas lokal. */
  photoSrc: string;
}): ImageResponse {
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
            {siteName}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, lineHeight: 1.08, maxWidth: 540 }}>
              {title}
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
              {departure}
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
    OG_IMAGE_SIZE,
  );
}
