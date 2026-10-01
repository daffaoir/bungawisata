import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import id from "@/messages/id.json";
import { PRIVACY_UPDATED_AT, privacy } from "./privacy";

describe("kebijakan privasi", () => {
  it("versi ID dan EN punya jumlah bagian dan butir daftar yang sama", () => {
    expect(privacy.en.sections).toHaveLength(privacy.id.sections.length);
    privacy.id.sections.forEach((section, index) => {
      expect(privacy.en.sections[index].list?.length).toBe(
        section.list?.length,
      );
    });
  });

  it("tanggal pembaruan berformat YYYY-MM-DD yang valid", () => {
    expect(PRIVACY_UPDATED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(PRIVACY_UPDATED_AT))).toBe(false);
  });

  it("tidak memuat penanda draf yang tampil ke pengunjung", () => {
    const text = JSON.stringify(privacy);
    expect(text).not.toMatch(/TODO|TBD|lorem/i);
  });

  it("menyebut cookie yang benar-benar dipasang situs", () => {
    for (const locale of ["id", "en"] as const) {
      expect(JSON.stringify(privacy[locale])).toContain("NEXT_LOCALE");
    }
  });
});

describe("pesan WhatsApp paket", () => {
  it.each([
    ["id", id],
    ["en", en],
  ])("%s: menyertakan nama dan tautan paket", (_, messages) => {
    for (const message of [
      messages.WhatsApp.package,
      messages.QuoteForm.greetingPackage,
    ]) {
      expect(message).toContain("{packageTitle}");
      expect(message).toContain("{packageUrl}");
    }
  });
});
