import { describe, expect, it } from "vitest";
import { testimonials } from "./testimonials";

describe("testimonials", () => {
  it("semuanya bersumber dari ulasan Google", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const t of testimonials) expect(t.source).toBe("google");
  });

  it("tidak memuat testimoni karangan lama", () => {
    const names = testimonials.map((t) => t.name).join(" ");
    for (const invented of ["Rina Kusuma", "Andi Prasetyo"]) {
      expect(names).not.toContain(invented);
    }
  });

  it("kutipan ID dan EN tidak kosong", () => {
    for (const t of testimonials) {
      expect(t.quote.id.trim()).not.toBe("");
      expect(t.quote.en.trim()).not.toBe("");
    }
  });
});
