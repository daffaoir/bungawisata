import { describe, expect, it } from "vitest";
import { itineraryPdfPath, ogImagePath } from "./static-files";

describe("itineraryPdfPath", () => {
  it("menaruh PDF per bahasa dengan slug sebagai nama berkas", () => {
    expect(itineraryPdfPath("id", "bali-4d3n")).toBe("/itinerary/id/bali-4d3n.pdf");
    expect(itineraryPdfPath("en", "bali-4d3n")).toBe("/itinerary/en/bali-4d3n.pdf");
  });
});

describe("ogImagePath", () => {
  it("memakai satu PNG per bahasa", () => {
    expect(ogImagePath("id")).toBe("/og/id.png");
    expect(ogImagePath("en")).toBe("/og/en.png");
  });
});
