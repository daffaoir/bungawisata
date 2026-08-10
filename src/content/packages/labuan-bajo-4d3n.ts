import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { DOMESTIC_NOTE } from "./shared";

export const labuanBajo4d3n = {
  slug: "labuan-bajo-4d3n",
  region: "dalam-negeri",
  destination: "Nusa Tenggara Timur",
  durationDays: 4,
  durationNights: 3,
  priceFrom: 6950000,
  departureFrom: "Labuan Bajo (LBJ)",
  minPax: 12,
  hotels: [
    { city: "Labuan Bajo", name: "Bintang Flores Hotel", nights: 3, stars: 4 },
  ],
  featured: true,
  heroImage: images["komodo-padar"],
  gallery: [
    images["komodo-satwa"],
    images["komodo-pink-beach"],
    images["komodo-kapal"],
  ],
  tags: ["laut", "alam", "petualangan"],
  content: {
    id: {
      title: "Labuan Bajo & Komodo 4 Hari 3 Malam",
      summary:
        "Dua hari penuh berlayar di Taman Nasional Komodo — Padar, Pink Beach, dan Manta Point — dengan pangkalan yang nyaman di Labuan Bajo.",
      highlights: [
        "Trekking ke puncak Pulau Padar, titik pandang tiga teluk",
        "Bertemu komodo di Pulau Komodo bersama ranger taman nasional",
        "Berenang bersama pari manta di Manta Point",
        "Matahari terbenam dari Bukit Amelia",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tiba di Labuan Bajo – Bukit Amelia",
          meals: ["dinner"],
          activities: [
            "Penjemputan di Bandara Komodo, Labuan Bajo",
            "Check-in hotel dan waktu istirahat",
            "Naik ke Bukit Amelia untuk menonton matahari terbenam di atas teluk",
            "Makan malam di kawasan Kampung Ujung",
          ],
        },
        {
          day: 2,
          title: "Berlayar: Padar – Pink Beach – Komodo",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan pagi, berangkat dari Pelabuhan Labuan Bajo",
            "Trekking ± 30 menit ke puncak Pulau Padar",
            "Berenang dan berjemur di Pink Beach",
            "Makan siang di atas kapal",
            "Menyusuri Pulau Komodo bersama ranger taman nasional",
            "Kembali ke Labuan Bajo, makan malam, dan istirahat di hotel",
          ],
        },
        {
          day: 3,
          title: "Manta Point – Pulau Kanawa",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan pagi dan kembali berlayar",
            "Snorkeling bersama pari manta di Manta Point",
            "Snorkeling di Taka Makassar, gundukan pasir di tengah laut",
            "Makan siang di atas kapal, dilanjutkan waktu santai di Pulau Kanawa",
            "Kembali ke pelabuhan, makan malam, dan istirahat",
          ],
        },
        {
          day: 4,
          title: "Gua Batu Cermin – Kepulangan",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Kunjungan ke Gua Batu Cermin",
            "Belanja oleh-oleh mutiara dan kain tenun di kota",
            "Pengantaran ke Bandara Komodo",
          ],
        },
      ],
      includes: [
        "Hotel bintang 4 selama 3 malam (sekamar berdua)",
        "Sewa kapal wisata dua hari beserta awak dan pemandu",
        "Makan sesuai program (3x makan pagi, 2x makan siang, 3x makan malam)",
        "Tiket masuk Taman Nasional Komodo dan jasa ranger",
        "Peralatan snorkeling",
        "Transportasi darat di Labuan Bajo",
        "Air mineral selama perjalanan",
      ],
      excludes: [
        "Tiket pesawat pulang-pergi ke Labuan Bajo",
        "Pengeluaran pribadi dan belanja oleh-oleh",
        "Tipping untuk awak kapal, ranger, dan pemandu",
        "Asuransi perjalanan",
        "Biaya dokumentasi drone dan kamera bawah air",
      ],
      notes: DOMESTIC_NOTE.id,
    },
    en: {
      title: "Labuan Bajo & Komodo 4 Days 3 Nights",
      summary:
        "Two full days sailing Komodo National Park — Padar, Pink Beach, and Manta Point — with a comfortable base back in Labuan Bajo.",
      highlights: [
        "The trek up Padar Island for its three-bay viewpoint",
        "Meeting Komodo dragons on Komodo Island with a park ranger",
        "Swimming with manta rays at Manta Point",
        "Sunset from Amelia Hill",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Labuan Bajo – Amelia Hill",
          meals: ["dinner"],
          activities: [
            "Pickup at Komodo Airport, Labuan Bajo",
            "Hotel check-in and time to rest",
            "Up to Amelia Hill for sunset over the bay",
            "Dinner in the Kampung Ujung food street",
          ],
        },
        {
          day: 2,
          title: "Sailing: Padar – Pink Beach – Komodo",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast, then departure from Labuan Bajo harbour",
            "A 30-minute trek to the top of Padar Island",
            "Swimming and sunbathing at Pink Beach",
            "Lunch on board",
            "Walking Komodo Island with a national park ranger",
            "Back to Labuan Bajo for dinner and rest at the hotel",
          ],
        },
        {
          day: 3,
          title: "Manta Point – Kanawa Island",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast, then back out to sea",
            "Snorkelling with manta rays at Manta Point",
            "Snorkelling at Taka Makassar, a sandbar in open water",
            "Lunch on board, then free time on Kanawa Island",
            "Back to the harbour for dinner and rest",
          ],
        },
        {
          day: 4,
          title: "Batu Cermin Cave – Departure",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Visit to Batu Cermin Cave",
            "Shopping for pearls and woven cloth in town",
            "Transfer to Komodo Airport",
          ],
        },
      ],
      includes: [
        "4-star hotel for 3 nights (twin sharing)",
        "Two-day boat charter with crew and guide",
        "Meals as per programme (3 breakfasts, 2 lunches, 3 dinners)",
        "Komodo National Park entry fees and ranger service",
        "Snorkelling gear",
        "Land transport in Labuan Bajo",
        "Bottled water throughout the trip",
      ],
      excludes: [
        "Return flights to Labuan Bajo",
        "Personal expenses and souvenir shopping",
        "Tipping for crew, rangers, and guide",
        "Travel insurance",
        "Drone and underwater camera documentation fees",
      ],
      notes: DOMESTIC_NOTE.en,
    },
  },
} satisfies PackageInput;
