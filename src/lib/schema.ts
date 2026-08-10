import { z } from "zod";

export const REGIONS = ["dalam-negeri", "luar-negeri"] as const;
export type Region = (typeof REGIONS)[number];

export const LOCALES = ["id", "en"] as const;

const nonEmpty = z.string().trim().min(1);

/**
 * Makan yang ditanggung pada hari bersangkutan. Di PDF ketiganya diringkas
 * menjadi kode Mp (makan pagi), Ms (makan siang), dan Mm (makan malam) —
 * singkatan yang sudah lazim dipakai di lembar itinerary tur.
 */
export const MEALS = ["breakfast", "lunch", "dinner"] as const;
export type Meal = (typeof MEALS)[number];

const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: nonEmpty,
  /** Kosongkan (atau hilangkan) kalau hari itu tanpa makan yang ditanggung. */
  meals: z.array(z.enum(MEALS)).default([]),
  activities: z.array(nonEmpty).min(1),
});

const hotelSchema = z.object({
  city: nonEmpty,
  /** Nama hotel; sertakan "atau setaraf" di `notes`, bukan di sini. */
  name: nonEmpty,
  nights: z.number().int().positive(),
  stars: z.number().int().min(1).max(5).optional(),
});

const localizedContentSchema = z.object({
  title: nonEmpty,
  summary: nonEmpty,
  highlights: z.array(nonEmpty).min(1),
  itinerary: z.array(itineraryDaySchema).min(1),
  includes: z.array(nonEmpty).min(1),
  excludes: z.array(nonEmpty).min(1),
  notes: z.string().trim().optional(),
});

export const packageSchema = z
  .object({
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "slug hanya boleh huruf kecil, angka, dan tanda hubung",
      ),
    region: z.enum(REGIONS),
    /** Negara untuk luar negeri, provinsi/pulau untuk dalam negeri. */
    destination: nonEmpty,
    durationDays: z.number().int().positive(),
    durationNights: z.number().int().nonnegative(),
    priceFrom: z.number().int().positive(),
    /** Kota keberangkatan utama, mis. "Surabaya (SUB)". */
    departureFrom: nonEmpty,
    /** Kosongkan untuk paket yang tidak memakai penerbangan tertentu. */
    airline: z.string().trim().min(1).optional(),
    /** Minimum peserta agar `priceFrom` berlaku. */
    minPax: z.number().int().positive(),
    hotels: z.array(hotelSchema).min(1),
    featured: z.boolean().default(false),
    heroImage: nonEmpty,
    gallery: z.array(nonEmpty).default([]),
    tags: z.array(nonEmpty).default([]),
    content: z.object({
      id: localizedContentSchema,
      en: localizedContentSchema,
    }),
  })
  .superRefine((pkg, ctx) => {
    const addIssue = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: "custom", message, path });

    if (pkg.durationNights !== pkg.durationDays - 1) {
      addIssue(
        `durationNights sebaiknya durationDays - 1 (${pkg.durationDays} hari → ${pkg.durationDays - 1} malam)`,
        ["durationNights"],
      );
    }

    // Daftar hotel harus menutup seluruh malam paket — kalau tidak, tabel
    // hotel di PDF akan menampilkan menginap yang lebih pendek dari durasinya.
    const bookedNights = pkg.hotels.reduce((total, h) => total + h.nights, 0);

    if (bookedNights !== pkg.durationNights) {
      addIssue(
        `total malam di hotels = ${bookedNights}, sedangkan durationNights = ${pkg.durationNights}`,
        ["hotels"],
      );
    }

    // Paritas ID/EN: versi Inggris tidak boleh tertinggal saat konten ditambah.
    const idDays = pkg.content.id.itinerary.length;
    const enDays = pkg.content.en.itinerary.length;

    if (idDays !== enDays) {
      addIssue(
        `jumlah hari itinerary tidak sinkron: id punya ${idDays} hari, en punya ${enDays} hari`,
        ["content", "en", "itinerary"],
      );
    }

    if (idDays !== pkg.durationDays) {
      addIssue(
        `itinerary punya ${idDays} hari tapi durationDays = ${pkg.durationDays}`,
        ["content", "id", "itinerary"],
      );
    }

    for (const locale of LOCALES) {
      const { itinerary, includes, excludes, highlights } = pkg.content[locale];

      itinerary.forEach((entry, index) => {
        if (entry.day !== index + 1) {
          addIssue(
            `nomor hari harus urut mulai dari 1 (ditemukan ${entry.day} pada posisi ke-${index + 1})`,
            ["content", locale, "itinerary", index, "day"],
          );
        }
      });

      if (locale === "en") {
        const idContent = pkg.content.id;

        // Makan yang ditanggung adalah fakta paket, bukan terjemahan — kalau
        // dua versi berbeda, salah satunya pasti keliru.
        itinerary.forEach((entry, index) => {
          const idMeals = idContent.itinerary[index]?.meals ?? [];
          const enMeals = entry.meals;
          const sameOrder =
            idMeals.length === enMeals.length &&
            idMeals.every((meal, i) => meal === enMeals[i]);

          if (!sameOrder) {
            addIssue(
              `meals hari ${index + 1} tidak sama: id = [${idMeals.join(", ")}], en = [${enMeals.join(", ")}]`,
              ["content", "en", "itinerary", index, "meals"],
            );
          }
        });

        const pairs = [
          ["includes", includes.length, idContent.includes.length],
          ["excludes", excludes.length, idContent.excludes.length],
          ["highlights", highlights.length, idContent.highlights.length],
        ] as const;

        for (const [field, enCount, idCount] of pairs) {
          if (enCount !== idCount) {
            addIssue(
              `${field} tidak sinkron: id punya ${idCount} item, en punya ${enCount} item`,
              ["content", "en", field],
            );
          }
        }
      }
    }
  });

/** Bentuk data yang ditulis di `src/content/packages/*.ts`. */
export type PackageInput = z.input<typeof packageSchema>;

/** Bentuk data setelah divalidasi — inilah yang dipakai komponen. */
export type Package = z.output<typeof packageSchema>;

export type LocalizedContent = Package["content"]["id"];
export type ItineraryDay = LocalizedContent["itinerary"][number];
export type Hotel = Package["hotels"][number];

/**
 * Memvalidasi satu paket dan melempar error yang menyebut slug-nya, supaya
 * saat `npm run build` gagal Anda langsung tahu file mana yang salah.
 */
export function parsePackage(input: unknown): Package {
  const result = packageSchema.safeParse(input);

  if (!result.success) {
    const slug =
      typeof input === "object" && input !== null && "slug" in input
        ? String((input as { slug: unknown }).slug)
        : "(slug tidak diketahui)";

    const details = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Data paket "${slug}" tidak valid:\n${details}`);
  }

  return result.data;
}
