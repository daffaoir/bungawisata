import { describe, expect, it } from "vitest";
import { buildQuoteMessage, buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("membangun tautan wa.me dengan pesan terenkode", () => {
    const url = buildWhatsAppUrl("Halo Bunga Wisata", "6281234567890");

    expect(url).toBe("https://wa.me/6281234567890?text=Halo%20Bunga%20Wisata");
  });

  it("membersihkan format nomor telepon yang ditulis manusia", () => {
    const url = buildWhatsAppUrl("Halo", "+62 812-3456-7890");

    expect(url).toMatch(/^https:\/\/wa\.me\/6281234567890\?/);
  });

  it("mengenkode tanda kutip pada nama paket agar tautan tidak rusak", () => {
    const url = buildWhatsAppUrl(
      'Saya tertarik dengan paket "Turki 9 Hari 8 Malam".',
      "6281234567890",
    );

    expect(url).toContain("%22Turki%209%20Hari%208%20Malam%22");
    expect(url).not.toContain('"');
  });

  it("mengenkode karakter non-ASCII dan baris baru", () => {
    const url = buildWhatsAppUrl("Halo\nSaya mau ke Türkiye 🇹🇷", "6281234567890");

    expect(url).toContain("%0A");
    expect(url).not.toContain("\n");
    expect(url).toContain("T%C3%BCrkiye");
  });

  it("menghilangkan tanda tanya bila pesan kosong", () => {
    expect(buildWhatsAppUrl("   ", "6281234567890")).toBe(
      "https://wa.me/6281234567890",
    );
  });

  it("melempar error kalau nomor tidak berisi angka sama sekali", () => {
    expect(() => buildWhatsAppUrl("Halo", "ganti-nomor-ini")).toThrow(
      /Nomor WhatsApp kosong/,
    );
  });
});

describe("buildQuoteMessage", () => {
  it("memuat sapaan dan semua field yang terisi", () => {
    const message = buildQuoteMessage("Halo Bunga Wisata.", [
      { label: "Layanan", value: "Study Tour" },
      { label: "Tujuan", value: "Yogyakarta" },
      { label: "Jumlah peserta", value: "120" },
    ]);

    expect(message).toBe(
      "Halo Bunga Wisata.\n\nLayanan: Study Tour\nTujuan: Yogyakarta\nJumlah peserta: 120",
    );
  });

  it("melewati field kosong atau hanya spasi", () => {
    const message = buildQuoteMessage("Halo.", [
      { label: "Tujuan", value: "Bali" },
      { label: "Budget", value: "   " },
      { label: "Tanggal", value: undefined },
    ]);

    expect(message).toBe("Halo.\n\nTujuan: Bali");
    expect(message).not.toContain("Budget");
  });
});
