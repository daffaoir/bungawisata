import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { DOMESTIC_NOTE } from "./shared";

export const yogyakarta3d2n = {
  slug: "yogyakarta-3d2n",
  region: "dalam-negeri",
  destination: "DI Yogyakarta",
  durationDays: 3,
  durationNights: 2,
  priceFrom: 2750000,
  departureFrom: "Malang",
  minPax: 20,
  hotels: [
    {
      city: "Yogyakarta",
      name: "Grand Mercure Yogyakarta Adi Sucipto",
      nights: 2,
      stars: 4,
    },
  ],
  heroImage: images["yogya-borobudur"],
  gallery: [images["yogya-prambanan"], images["yogya-borobudur-stupa"]],
  tags: ["budaya", "sejarah", "keluarga"],
  content: {
    id: {
      title: "Yogyakarta & Borobudur 3 Hari 2 Malam",
      summary:
        "Paket tour Yogyakarta 3 hari dari Malang dengan bus: Borobudur, Prambanan, Keraton, dan Malioboro. Ringkas untuk rombongan sekolah maupun kantor.",
      highlights: [
        "Candi Borobudur, candi Buddha terbesar di dunia (Warisan Dunia UNESCO)",
        "Candi Prambanan, kompleks candi Hindu abad ke-9",
        "Keraton Ngayogyakarta Hadiningrat dan Taman Sari",
        "Malam hari menyusuri Malioboro dan Titik Nol Kilometer",
      ],
      itinerary: [
        {
          day: 1,
          title: "Malang – Yogyakarta – Keraton – Malioboro",
          meals: ["lunch", "dinner"],
          activities: [
            "Berkumpul di Malang dan berangkat pukul 03.00 via tol Trans Jawa menuju Yogyakarta (± 6–7 jam)",
            "Makan siang gudeg khas Yogyakarta",
            "Keraton Ngayogyakarta Hadiningrat bersama abdi dalem pemandu",
            "Taman Sari, bekas pemandian kerajaan",
            "Check-in hotel, makan malam",
            "Waktu bebas di Malioboro dan Titik Nol Kilometer",
          ],
        },
        {
          day: 2,
          title: "Borobudur – Prambanan",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Candi Borobudur di Magelang bersama pemandu resmi kawasan",
            "Makan siang di rumah makan kawasan Magelang",
            "Perjalanan ke Candi Prambanan",
            "Menjelajahi kompleks Prambanan menjelang matahari terbenam",
            "Makan malam dan kembali ke hotel",
          ],
        },
        {
          day: 3,
          title: "Oleh-oleh – Kembali ke Malang",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Belanja bakpia di kawasan Pathuk",
            "Mampir ke sentra kerajinan perak Kotagede",
            "Perjalanan kembali ke Malang via tol Trans Jawa (± 6–7 jam), tiba malam hari",
          ],
        },
      ],
      includes: [
        "Hotel bintang 4 selama 2 malam (sekamar berdua)",
        "Bus pariwisata ber-AC Malang – Yogyakarta – Malang",
        "Makan sesuai program (2x makan pagi, 2x makan siang, 2x makan malam)",
        "Tiket masuk Borobudur, Prambanan, Keraton, dan Taman Sari",
        "Pemandu resmi di kawasan candi",
        "Tour leader dan air mineral selama perjalanan",
      ],
      excludes: [
        "Transportasi menuju titik kumpul di Malang",
        "Tiket naik ke struktur Candi Borobudur (kuota terbatas, dipesan terpisah)",
        "Pengeluaran pribadi dan belanja oleh-oleh",
        "Tipping untuk pemandu dan sopir",
        "Asuransi perjalanan",
      ],
      notes: DOMESTIC_NOTE.id,
    },
    en: {
      title: "Yogyakarta & Borobudur 3 Days 2 Nights",
      summary:
        "A 3-day Yogyakarta coach tour from Malang: Borobudur, Prambanan, the Kraton, and Malioboro after dark. Compact enough for school and office groups.",
      highlights: [
        "Borobudur, the largest Buddhist temple in the world (UNESCO World Heritage)",
        "Prambanan, the 9th-century Hindu temple complex",
        "The Kraton of Yogyakarta and the Taman Sari water castle",
        "An evening along Malioboro and Kilometre Zero",
      ],
      itinerary: [
        {
          day: 1,
          title: "Malang – Yogyakarta – Kraton – Malioboro",
          meals: ["lunch", "dinner"],
          activities: [
            "Meet in Malang and depart at 03:00 via the Trans-Java toll road to Yogyakarta (about 6–7 hours)",
            "Lunch of gudeg, the city's signature dish",
            "The Kraton of Yogyakarta with an abdi dalem palace guide",
            "Taman Sari, the former royal bathing complex",
            "Hotel check-in and dinner",
            "Free time along Malioboro and Kilometre Zero",
          ],
        },
        {
          day: 2,
          title: "Borobudur – Prambanan",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Borobudur Temple in Magelang with an official site guide",
            "Lunch at a restaurant in the Magelang area",
            "Drive on to Prambanan Temple",
            "Exploring the Prambanan complex towards sunset",
            "Dinner, then back to the hotel",
          ],
        },
        {
          day: 3,
          title: "Souvenirs – Back to Malang",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Bakpia pastry shopping in the Pathuk district",
            "A stop at the Kotagede silverwork workshops",
            "Drive back to Malang via the Trans-Java toll road (about 6–7 hours), arriving in the evening",
          ],
        },
      ],
      includes: [
        "4-star hotel for 2 nights (twin sharing)",
        "Air-conditioned coach Malang – Yogyakarta – Malang",
        "Meals as per programme (2 breakfasts, 2 lunches, 2 dinners)",
        "Entrance tickets to Borobudur, Prambanan, the Kraton, and Taman Sari",
        "Official guides at the temple sites",
        "Tour leader and bottled water throughout",
      ],
      excludes: [
        "Travel to the meeting point in Malang",
        "The ticket to climb the Borobudur structure (limited quota, booked separately)",
        "Personal expenses and souvenir shopping",
        "Tipping for guide and driver",
        "Travel insurance",
      ],
      notes: DOMESTIC_NOTE.en,
    },
  },
} satisfies PackageInput;
