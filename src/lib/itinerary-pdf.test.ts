import { describe, expect, it } from "vitest";
import {
  buildContentDisposition,
  buildItineraryFilename,
  formatDurationCode,
  formatMealCodes,
  toPdfText,
} from "./itinerary-pdf";

describe("toPdfText", () => {
  it("membiarkan huruf yang sudah ada di WinAnsi", () => {
    expect(toPdfText("Çanakkale · Türkiye – Göreme")).toBe(
      "Çanakkale · Türkiye – Göreme",
    );
  });

  it("menyederhanakan huruf Turki yang tidak ada di WinAnsi", () => {
    expect(toPdfText("Kuşadası")).toBe("Kusadasi");
    expect(toPdfText("Kızılırmak")).toBe("Kizilirmak");
  });

  it("membuang karakter yang tidak punya padanan, bukan menyisakan kotak", () => {
    expect(toPdfText("Hotel ★★★")).toBe("Hotel ");
  });

  it("mempertahankan tanda pisah dan simbol yang ada di WinAnsi", () => {
    const text = "Menyeberang ke Koh Larn (± 2 jam) — Rp 7.000.000";
    expect(toPdfText(text)).toBe(text);
  });
});

describe("formatMealCodes", () => {
  it("memakai singkatan Indonesia Mp/Ms/Mm", () => {
    expect(formatMealCodes(["breakfast", "lunch", "dinner"], "id")).toBe(
      "Mp-Ms-Mm",
    );
  });

  it("memakai singkatan Inggris B/L/D", () => {
    expect(formatMealCodes(["breakfast", "dinner"], "en")).toBe("B-D");
  });

  it("mengembalikan string kosong kalau tidak ada makan yang ditanggung", () => {
    expect(formatMealCodes([], "id")).toBe("");
  });
});

describe("formatDurationCode", () => {
  it("memakai H/M untuk bahasa Indonesia", () => {
    expect(formatDurationCode(4, 3, "id")).toBe("4H3M");
  });

  it("memakai D/N untuk bahasa Inggris", () => {
    expect(formatDurationCode(9, 8, "en")).toBe("9D8N");
  });
});

describe("buildItineraryFilename", () => {
  const pkg = {
    slug: "bangkok-pattaya-4d3n",
    durationDays: 4,
    durationNights: 3,
  };

  it("menyusun nama berkas dari slug tanpa penanda durasinya", () => {
    expect(buildItineraryFilename(pkg, "id")).toBe(
      "Bunga Wisata - Bangkok Pattaya 4H3M.pdf",
    );
  });

  it("mengikuti bahasa yang diminta", () => {
    expect(buildItineraryFilename(pkg, "en")).toBe(
      "Bunga Wisata - Bangkok Pattaya 4D3N.pdf",
    );
  });

  it("tetap bekerja untuk slug yang tidak berakhiran durasi", () => {
    expect(
      buildItineraryFilename(
        { slug: "danau-toba", durationDays: 4, durationNights: 3 },
        "id",
      ),
    ).toBe("Bunga Wisata - Danau Toba 4H3M.pdf");
  });
});

describe("buildContentDisposition", () => {
  it("mengutip nama berkas yang mengandung spasi", () => {
    expect(
      buildContentDisposition("Bunga Wisata - Bali 4H3M.pdf"),
    ).toContain('filename="Bunga Wisata - Bali 4H3M.pdf"');
  });

  it("menyediakan versi UTF-8 untuk nama berkas non-ASCII", () => {
    const header = buildContentDisposition("Bunga Wisata - Türkiye 9H8M.pdf");

    // Versi ASCII-nya tidak boleh membawa karakter di luar rentang aman.
    expect(header).toContain('filename="Bunga Wisata - T_rkiye 9H8M.pdf"');
    expect(header).toContain("filename*=UTF-8''");
    expect(header).toContain(encodeURIComponent("Türkiye"));
  });
});
