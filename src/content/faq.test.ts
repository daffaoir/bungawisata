import { describe, expect, it } from "vitest";
import { faq } from "./faq";

describe("faq", () => {
  it("tidak menampilkan penanda TODO atau teks kosong ke pengunjung", () => {
    expect(faq.length).toBeGreaterThan(0);
    for (const item of faq) {
      for (const text of [
        ...Object.values(item.question),
        ...Object.values(item.answer),
      ]) {
        expect(text.trim()).not.toBe("");
        expect(text).not.toMatch(/todo/i);
      }
    }
  });
});
