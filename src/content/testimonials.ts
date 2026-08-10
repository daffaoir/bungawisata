import type { AppLocale } from "@/i18n/routing";

export type Testimonial = {
  id: string;
  name: string;
  /** Kota asal atau keterangan singkat. */
  from: string;
  /** Slug paket yang diikuti, hanya untuk konteks. */
  trip: Record<AppLocale, string>;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: Record<AppLocale, string>;
};

/**
 * TODO: ganti seluruh isi berikut dengan testimoni asli.
 * Minta izin pelanggan sebelum menampilkan nama lengkap dan fotonya.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina Kusuma",
    from: "Bandung",
    trip: { id: "Turki 9 Hari 8 Malam", en: "Türkiye 9 Days 8 Nights" },
    rating: 5,
    quote: {
      id: "Rundown-nya benar-benar sesuai yang dikirim di awal. Tour leader-nya sabar banget menghadapi rombongan kami yang isinya orang tua semua.",
      en: "The rundown matched exactly what was sent beforehand. Our tour leader was endlessly patient with a group made up entirely of older travellers.",
    },
  },
  {
    id: "t2",
    name: "Andi Prasetyo",
    from: "Surabaya",
    trip: { id: "Labuan Bajo 4 Hari 3 Malam", en: "Labuan Bajo 4 Days 3 Nights" },
    rating: 5,
    quote: {
      id: "Yang saya suka, dari awal sudah jelas mana yang termasuk dan mana yang tidak. Tidak ada biaya dadakan sama sekali selama trip.",
      en: "What I appreciated most was knowing from the start what was and wasn't included. Not a single surprise cost during the whole trip.",
    },
  },
  {
    id: "t3",
    name: "Keluarga Wijaya",
    from: "Jakarta",
    trip: { id: "Bali 4 Hari 3 Malam", en: "Bali 4 Days 3 Nights" },
    rating: 5,
    quote: {
      id: "Anak-anak senang, orang tua tidak kecapekan. Jadwalnya pas, tidak diburu-buru seperti trip sebelumnya yang pernah kami ikuti.",
      en: "The kids had a great time and the grandparents weren't worn out. The pacing was right — nothing like the rushed trips we'd joined before.",
    },
  },
  {
    id: "t4",
    name: "Dewi Lestari",
    from: "Semarang",
    trip: { id: "Jepang 7 Hari 6 Malam", en: "Japan 7 Days 6 Nights" },
    rating: 5,
    quote: {
      id: "Pengurusan visanya dibantu sampai selesai. Untuk saya yang baru pertama kali ke luar negeri, itu sangat menenangkan.",
      en: "They walked me through the visa process from start to finish. As a first-time international traveller, that was hugely reassuring.",
    },
  },
  {
    id: "t5",
    name: "Budi Santoso",
    from: "Yogyakarta",
    trip: { id: "Raja Ampat 6 Hari 5 Malam", en: "Raja Ampat 6 Days 5 Nights" },
    rating: 4,
    quote: {
      id: "Homestay-nya sederhana, tapi memang sudah diberi tahu dari awal jadi tidak kaget. Pemandangannya lebih dari cukup untuk menebus itu.",
      en: "The homestays were basic, but we were told that upfront so there was no shock. The scenery more than made up for it.",
    },
  },
  {
    id: "t6",
    name: "Sari & Hendra",
    from: "Tangerang",
    trip: { id: "Korea Selatan 6 Hari 5 Malam", en: "South Korea 6 Days 5 Nights" },
    rating: 5,
    quote: {
      id: "Kami minta beberapa penyesuaian jadwal untuk honeymoon dan langsung diakomodasi tanpa biaya tambahan yang aneh-aneh.",
      en: "We asked for a few schedule tweaks for our honeymoon and they accommodated everything without any odd extra charges.",
    },
  },
];
