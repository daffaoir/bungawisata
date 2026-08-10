import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { INTERNATIONAL_NOTE } from "./shared";

export const jepang7d6n = {
  slug: "jepang-7d6n",
  region: "luar-negeri",
  destination: "Jepang",
  durationDays: 7,
  durationNights: 6,
  priceFrom: 27500000,
  departureFrom: "Jakarta (CGK)",
  airline: "Garuda Indonesia",
  minPax: 25,
  hotels: [
    { city: "Tokyo", name: "Shinagawa Prince Hotel", nights: 2, stars: 4 },
    {
      city: "Fujikawaguchiko",
      name: "Fuji Premium Resort",
      nights: 1,
      stars: 4,
    },
    { city: "Nagoya", name: "Toyoko Inn Nagoya Marunouchi", nights: 1, stars: 3 },
    { city: "Osaka", name: "Namba Oriental Hotel", nights: 2, stars: 4 },
  ],
  featured: true,
  heroImage: images["jepang-fuji"],
  gallery: [
    images["jepang-chureito"],
    images["jepang-fushimi-inari"],
    images["jepang-osaka-castle"],
    images["jepang-shibuya"],
  ],
  tags: ["budaya", "kota", "alam"],
  content: {
    id: {
      title: "Jepang: Tokyo – Fuji – Kyoto – Osaka 7 Hari 6 Malam",
      summary:
        "Rute klasik Golden Route dari timur ke barat: Tokyo yang modern, Gunung Fuji, kuil-kuil Kyoto, lalu berakhir di Osaka yang gemar makan.",
      highlights: [
        "Gunung Fuji stasiun ke-5 dan Danau Kawaguchi di kakinya",
        "Lorong ribuan torii merah di Fushimi Inari Taisha, Kyoto",
        "Kuil Sensoji di Asakusa dan persimpangan Shibuya di Tokyo",
        "Naik Shinkansen antarkota — kereta peluru Jepang",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Tokyo",
          meals: ["dinner"],
          activities: [
            "Berkumpul di Bandara Soekarno-Hatta, Jakarta",
            "Terbang menuju Tokyo bersama Garuda Indonesia",
            "Tiba di Bandara Haneda dan proses imigrasi",
            "Makan malam di kawasan Shinagawa",
            "Check-in hotel dan istirahat",
          ],
        },
        {
          day: 2,
          title: "Tokyo: Asakusa – Shibuya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Kuil Sensoji di Asakusa dan jalan pertokoan Nakamise",
            "Foto Tokyo Skytree dari tepi Sungai Sumida",
            "Makan siang, dilanjutkan Istana Kekaisaran dari Jembatan Nijubashi",
            "Persimpangan Shibuya dan patung Hachiko",
            "Waktu bebas berbelanja di Shinjuku, makan malam",
          ],
        },
        {
          day: 3,
          title: "Tokyo – Gunung Fuji",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan dan check-out hotel",
            "Perjalanan menuju kawasan Gunung Fuji (± 2,5 jam)",
            "Gunung Fuji stasiun ke-5 (menyesuaikan cuaca dan kondisi jalan)",
            "Makan siang khas Yamanashi — hoto noodle",
            "Danau Kawaguchi dan dek pandang Oishi Park",
            "Check-in penginapan bergaya ryokan, makan malam, dan berendam onsen",
          ],
        },
        {
          day: 4,
          title: "Fuji – Hakone – Nagoya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan dan check-out penginapan",
            "Kapal bajak laut di Danau Ashi, Hakone",
            "Lembah Owakudani dan telur hitam khasnya",
            "Makan siang, dilanjutkan perjalanan menuju Nagoya",
            "Check-in hotel, makan malam di kawasan Sakae",
          ],
        },
        {
          day: 5,
          title: "Nagoya – Kyoto – Osaka",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan dan check-out hotel",
            "Naik Shinkansen dari Nagoya ke Kyoto",
            "Fushimi Inari Taisha dengan lorong ribuan torii merah",
            "Makan siang, dilanjutkan Kiyomizudera dan jalan Sannenzaka",
            "Perjalanan menuju Osaka",
            "Check-in hotel, makan malam di Dotonbori",
          ],
        },
        {
          day: 6,
          title: "Osaka – Nara",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Taman Nara dan Kuil Todaiji, tempat rusa berkeliaran bebas",
            "Makan siang di Nara",
            "Kembali ke Osaka untuk mengunjungi Kastil Osaka",
            "Waktu bebas berbelanja di Shinsaibashi",
            "Makan malam perpisahan",
          ],
        },
        {
          day: 7,
          title: "Osaka – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Pengantaran ke Bandara Internasional Kansai",
            "Penerbangan kembali ke Jakarta",
          ],
        },
      ],
      includes: [
        "Tiket pesawat pulang-pergi kelas ekonomi beserta bagasi 2 x 23 kg",
        "Hotel bintang 3–4 selama 6 malam (sekamar berdua)",
        "Makan sesuai program (6x makan pagi, 5x makan siang, 6x makan malam)",
        "Bus pariwisata ber-AC dan tiket Shinkansen Nagoya – Kyoto",
        "Tiket masuk seluruh objek wisata dalam itinerary",
        "Tour leader dari Indonesia dan pemandu lokal berbahasa Indonesia",
        "Air mineral 1 botol per orang per hari",
      ],
      excludes: [
        "Paspor dengan masa berlaku minimal 6 bulan",
        "Biaya pengurusan visa Jepang",
        "Pengeluaran pribadi, laundry, dan minuman di luar program",
        "Tipping untuk pemandu dan sopir sebesar JPY 5.000 per orang",
        "Asuransi perjalanan dan kelebihan bagasi",
      ],
      notes:
        "Warga negara Indonesia tetap memerlukan visa untuk masuk Jepang; pemegang e-paspor dapat mengajukan bebas visa lewat registrasi di kedutaan. Kunjungan ke Gunung Fuji stasiun ke-5 bergantung pada cuaca dan kondisi jalan — bila ditutup, kami alihkan ke kawasan Danau Kawaguchi. " +
        INTERNATIONAL_NOTE.id,
    },
    en: {
      title: "Japan: Tokyo – Fuji – Kyoto – Osaka 7 Days 6 Nights",
      summary:
        "The classic Golden Route from east to west: modern Tokyo, Mount Fuji, the temples of Kyoto, and a finish in food-obsessed Osaka.",
      highlights: [
        "Mount Fuji's 5th Station and Lake Kawaguchi at its foot",
        "The tunnel of thousands of red torii at Fushimi Inari Taisha, Kyoto",
        "Sensoji Temple in Asakusa and the Shibuya crossing in Tokyo",
        "An intercity ride on the Shinkansen bullet train",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Tokyo",
          meals: ["dinner"],
          activities: [
            "Meet at Soekarno-Hatta Airport, Jakarta",
            "Fly to Tokyo with Garuda Indonesia",
            "Arrive at Haneda Airport and clear immigration",
            "Dinner in the Shinagawa area",
            "Hotel check-in and rest",
          ],
        },
        {
          day: 2,
          title: "Tokyo: Asakusa – Shibuya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Sensoji Temple in Asakusa and Nakamise shopping street",
            "Photos of Tokyo Skytree from the Sumida riverbank",
            "Lunch, then the Imperial Palace from Nijubashi Bridge",
            "The Shibuya crossing and the Hachiko statue",
            "Free time to shop in Shinjuku, then dinner",
          ],
        },
        {
          day: 3,
          title: "Tokyo – Mount Fuji",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast and hotel check-out",
            "Drive to the Mount Fuji area (about 2.5 hours)",
            "Mount Fuji 5th Station (weather and road conditions permitting)",
            "Yamanashi-style lunch — hoto noodles",
            "Lake Kawaguchi and the Oishi Park viewpoint",
            "Check in to a ryokan-style inn, dinner, and an onsen soak",
          ],
        },
        {
          day: 4,
          title: "Fuji – Hakone – Nagoya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast and check-out",
            "The pirate ship across Lake Ashi, Hakone",
            "Owakudani valley and its black eggs",
            "Lunch, then the drive on to Nagoya",
            "Hotel check-in and dinner in the Sakae district",
          ],
        },
        {
          day: 5,
          title: "Nagoya – Kyoto – Osaka",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast and hotel check-out",
            "Shinkansen from Nagoya to Kyoto",
            "Fushimi Inari Taisha and its tunnel of red torii",
            "Lunch, then Kiyomizudera and the Sannenzaka lanes",
            "Transfer on to Osaka",
            "Hotel check-in and dinner in Dotonbori",
          ],
        },
        {
          day: 6,
          title: "Osaka – Nara",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Nara Park and Todaiji Temple, where the deer roam free",
            "Lunch in Nara",
            "Back to Osaka for Osaka Castle",
            "Free time to shop in Shinsaibashi",
            "Farewell dinner",
          ],
        },
        {
          day: 7,
          title: "Osaka – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Transfer to Kansai International Airport",
            "Flight home to Jakarta",
          ],
        },
      ],
      includes: [
        "Return economy-class flights with 2 x 23 kg baggage allowance",
        "3–4 star hotels for 6 nights (twin sharing)",
        "Meals as per programme (6 breakfasts, 5 lunches, 6 dinners)",
        "Air-conditioned coach and Shinkansen tickets Nagoya – Kyoto",
        "Entrance tickets to every attraction in the itinerary",
        "Tour leader from Indonesia and a local guide",
        "One bottle of water per person per day",
      ],
      excludes: [
        "A passport valid for at least 6 months",
        "Japanese visa processing fees",
        "Personal expenses, laundry, and drinks outside the programme",
        "Tipping for guide and driver of JPY 5,000 per person",
        "Travel insurance and excess baggage",
      ],
      notes:
        "Indonesian passport holders still need a visa for Japan; e-passport holders can register for visa exemption at the embassy. The Mount Fuji 5th Station visit depends on weather and road conditions — if it is closed we switch to the Lake Kawaguchi area. " +
        INTERNATIONAL_NOTE.en,
    },
  },
} satisfies PackageInput;
