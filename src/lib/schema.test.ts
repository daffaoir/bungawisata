import { describe, expect, it } from "vitest";
import { parsePackage, type PackageInput } from "./schema";

/**
 * Paket minimal yang valid. Tiap test menyimpangkan satu hal saja dari sini,
 * jadi kalau test gagal, penyebabnya jelas.
 */
function validPackage(): PackageInput {
  return {
    slug: "contoh-2d1n",
    region: "dalam-negeri",
    destination: "Jawa Barat",
    durationDays: 2,
    durationNights: 1,
    priceFrom: 1500000,
    departureFrom: "Surabaya (SUB)",
    minPax: 20,
    hotels: [{ city: "Bandung", name: "Hotel Contoh", nights: 1, stars: 3 }],
    heroImage: "/images/contoh.jpg",
    content: {
      id: {
        title: "Contoh 2 Hari 1 Malam",
        summary: "Ringkasan contoh.",
        highlights: ["Sorotan satu"],
        itinerary: [
          {
            day: 1,
            title: "Hari pertama",
            meals: ["dinner"],
            activities: ["Kegiatan A"],
          },
          {
            day: 2,
            title: "Hari kedua",
            meals: ["breakfast", "lunch"],
            activities: ["Kegiatan B"],
          },
        ],
        includes: ["Transportasi"],
        excludes: ["Tiket pesawat"],
      },
      en: {
        title: "Sample 2 Days 1 Night",
        summary: "Sample summary.",
        highlights: ["Highlight one"],
        itinerary: [
          {
            day: 1,
            title: "Day one",
            meals: ["dinner"],
            activities: ["Activity A"],
          },
          {
            day: 2,
            title: "Day two",
            meals: ["breakfast", "lunch"],
            activities: ["Activity B"],
          },
        ],
        includes: ["Transport"],
        excludes: ["Flights"],
      },
    },
  };
}

describe("parsePackage", () => {
  it("menerima paket yang lengkap dan mengisi nilai default", () => {
    const parsed = parsePackage(validPackage());

    expect(parsed.slug).toBe("contoh-2d1n");
    expect(parsed.featured).toBe(false);
    expect(parsed.gallery).toEqual([]);
    expect(parsed.tags).toEqual([]);
  });

  it("menolak paket tanpa versi Inggris", () => {
    const pkg = validPackage() as unknown as Record<string, unknown>;
    delete (pkg.content as Record<string, unknown>).en;

    expect(() => parsePackage(pkg)).toThrow(/content\.en/);
  });

  it("menolak jumlah hari itinerary yang tidak sinkron antarbahasa", () => {
    const pkg = validPackage();
    pkg.content.en.itinerary.pop();

    expect(() => parsePackage(pkg)).toThrow(/tidak sinkron/);
  });

  it("menolak itinerary yang jumlah harinya beda dari durationDays", () => {
    const pkg = validPackage();
    pkg.durationDays = 3;
    pkg.durationNights = 2;

    expect(() => parsePackage(pkg)).toThrow(/durationDays = 3/);
  });

  it("menolak nomor hari yang tidak urut", () => {
    const pkg = validPackage();
    pkg.content.id.itinerary[1].day = 5;

    expect(() => parsePackage(pkg)).toThrow(/harus urut/);
  });

  it("menolak jumlah item includes yang tidak sinkron antarbahasa", () => {
    const pkg = validPackage();
    pkg.content.en.includes.push("Extra item only in English");

    expect(() => parsePackage(pkg)).toThrow(/includes tidak sinkron/);
  });

  it("menolak slug yang mengandung huruf kapital atau spasi", () => {
    const pkg = validPackage();
    pkg.slug = "Contoh Paket";

    expect(() => parsePackage(pkg)).toThrow(/slug/);
  });

  it("menyebut slug paket di pesan error agar mudah dilacak", () => {
    const pkg = validPackage();
    pkg.priceFrom = -1;

    expect(() => parsePackage(pkg)).toThrow(/contoh-2d1n/);
  });

  it("mengisi meals kosong kalau tidak disebutkan", () => {
    const pkg = validPackage();
    delete pkg.content.id.itinerary[0].meals;
    delete pkg.content.en.itinerary[0].meals;

    expect(parsePackage(pkg).content.id.itinerary[0].meals).toEqual([]);
  });

  it("menolak meals yang berbeda antara versi ID dan EN", () => {
    const pkg = validPackage();
    pkg.content.en.itinerary[0].meals = ["lunch"];

    expect(() => parsePackage(pkg)).toThrow(/meals hari 1 tidak sama/);
  });

  it("menolak urutan meals yang tidak sama walau isinya sama", () => {
    const pkg = validPackage();
    pkg.content.en.itinerary[1].meals = ["lunch", "breakfast"];

    expect(() => parsePackage(pkg)).toThrow(/meals hari 2 tidak sama/);
  });

  it("menolak total malam hotel yang tidak menutup durationNights", () => {
    const pkg = validPackage();
    pkg.hotels = [
      { city: "Bandung", name: "Hotel Contoh", nights: 2, stars: 3 },
    ];

    expect(() => parsePackage(pkg)).toThrow(/total malam di hotels = 2/);
  });

  it("menerima beberapa hotel selama jumlah malamnya pas", () => {
    const pkg = validPackage();
    pkg.durationDays = 3;
    pkg.durationNights = 2;
    pkg.hotels = [
      { city: "Bandung", name: "Hotel A", nights: 1 },
      { city: "Garut", name: "Hotel B", nights: 1 },
    ];
    const thirdDay = { day: 3, title: "Hari ketiga", activities: ["Kegiatan C"] };
    pkg.content.id.itinerary.push({ ...thirdDay });
    pkg.content.en.itinerary.push({ ...thirdDay, title: "Day three" });

    expect(parsePackage(pkg).hotels).toHaveLength(2);
  });

  it("menolak minPax nol atau negatif", () => {
    const pkg = validPackage();
    pkg.minPax = 0;

    expect(() => parsePackage(pkg)).toThrow(/minPax/);
  });
});
