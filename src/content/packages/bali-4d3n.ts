import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { DOMESTIC_NOTE } from "./shared";

export const bali4d3n = {
  slug: "bali-4d3n",
  region: "dalam-negeri",
  destination: "Bali",
  durationDays: 4,
  durationNights: 3,
  priceFrom: 4850000,
  departureFrom: "Denpasar (DPS)",
  minPax: 15,
  hotels: [{ city: "Kuta", name: "Grand Zuri Kuta Bali", nights: 3, stars: 4 }],
  featured: true,
  heroImage: images["bali-sawah"],
  gallery: [
    images["bali-pura-laut"],
    images["bali-terasering"],
    images["bali-tebing-uluwatu"],
    images["bali-pantai-senja"],
  ],
  tags: ["pantai", "budaya", "keluarga"],
  content: {
    id: {
      title: "Bali 4 Hari 3 Malam",
      summary:
        "Perpaduan pantai, budaya, dan kuliner Bali dalam empat hari yang santai — cocok untuk keluarga yang baru pertama kali ke Pulau Dewata.",
      highlights: [
        "Tari Kecak saat matahari terbenam di Pura Luhur Uluwatu",
        "Panorama sawah terasering Tegalalang, warisan subak yang diakui UNESCO",
        "Snorkeling di perairan jernih Blue Lagoon, Padangbai",
        "Matahari terbenam di Pura Tanah Lot",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tiba di Denpasar – Uluwatu",
          meals: ["lunch", "dinner"],
          activities: [
            "Penjemputan di Bandara I Gusti Ngurah Rai oleh tour leader",
            "Makan siang di restoran lokal kawasan Jimbaran",
            "Pura Luhur Uluwatu di atas tebing setinggi 70 meter, dilanjutkan Tari Kecak saat matahari terbenam",
            "Makan malam seafood di tepi Pantai Jimbaran",
            "Check-in hotel di kawasan Kuta",
          ],
        },
        {
          day: 2,
          title: "Ubud & Tegalalang",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Panorama sawah terasering Tegalalang dari sisi Ceking",
            "Kebun kopi luwak dengan sesi mencicip kopi dan teh",
            "Makan siang khas Bali di kawasan Ubud",
            "Pasar Seni Ubud dan Puri Saren Agung",
            "Makan malam dan kembali ke hotel",
          ],
        },
        {
          day: 3,
          title: "Padangbai – Tanah Lot",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel, perjalanan menuju Padangbai (± 1,5 jam)",
            "Snorkeling di Blue Lagoon dengan pemandu air",
            "Makan siang di tepi pantai",
            "Belanja oleh-oleh di Pasar Sukawati dan Krisna",
            "Matahari terbenam di Pura Tanah Lot",
            "Makan malam dan kembali ke hotel",
          ],
        },
        {
          day: 4,
          title: "Waktu Bebas – Kepulangan",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Waktu bebas di sekitar Kuta atau Seminyak",
            "Pengantaran ke Bandara I Gusti Ngurah Rai",
          ],
        },
      ],
      includes: [
        "Hotel bintang 4 selama 3 malam (sekamar berdua)",
        "Transportasi ber-AC selama perjalanan sesuai itinerary",
        "Makan sesuai program (3x makan pagi, 3x makan siang, 3x makan malam)",
        "Tiket masuk seluruh objek wisata dalam itinerary",
        "Peralatan snorkeling dan pemandu air di Blue Lagoon",
        "Tour leader dan pemandu lokal berbahasa Indonesia",
        "Air mineral selama perjalanan",
      ],
      excludes: [
        "Tiket pesawat pulang-pergi ke Denpasar",
        "Pengeluaran pribadi dan belanja oleh-oleh",
        "Tipping untuk pemandu dan sopir",
        "Asuransi perjalanan",
        "Biaya di luar itinerary yang tertulis",
      ],
      notes: DOMESTIC_NOTE.id,
    },
    en: {
      title: "Bali 4 Days 3 Nights",
      summary:
        "Beaches, culture, and Balinese food across four unhurried days — ideal for a family's first trip to the Island of the Gods.",
      highlights: [
        "The Kecak dance at sunset at Uluwatu Temple",
        "The Tegalalang rice terraces, part of Bali's UNESCO-listed subak system",
        "Snorkelling in the clear water of Blue Lagoon, Padangbai",
        "Sunset at Tanah Lot Temple",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Denpasar – Uluwatu",
          meals: ["lunch", "dinner"],
          activities: [
            "Airport pickup at I Gusti Ngurah Rai by your tour leader",
            "Lunch at a local restaurant in the Jimbaran area",
            "Uluwatu Temple on its 70-metre cliff, followed by the Kecak dance at sunset",
            "Seafood dinner on Jimbaran Beach",
            "Hotel check-in in the Kuta area",
          ],
        },
        {
          day: 2,
          title: "Ubud & Tegalalang",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "The Tegalalang rice terraces seen from the Ceking viewpoint",
            "A luwak coffee plantation with a coffee and tea tasting",
            "Balinese lunch in the Ubud area",
            "Ubud Art Market and Puri Saren Agung palace",
            "Dinner, then back to the hotel",
          ],
        },
        {
          day: 3,
          title: "Padangbai – Tanah Lot",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel, then the drive to Padangbai (about 1.5 hours)",
            "Snorkelling at Blue Lagoon with a water guide",
            "Lunch by the beach",
            "Souvenir shopping at Sukawati Market and Krisna",
            "Sunset at Tanah Lot Temple",
            "Dinner, then back to the hotel",
          ],
        },
        {
          day: 4,
          title: "Free Time – Departure",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Free time around Kuta or Seminyak",
            "Transfer to I Gusti Ngurah Rai Airport",
          ],
        },
      ],
      includes: [
        "4-star hotel for 3 nights (twin sharing)",
        "Air-conditioned transport throughout the itinerary",
        "Meals as per programme (3 breakfasts, 3 lunches, 3 dinners)",
        "Entrance tickets to all attractions in the itinerary",
        "Snorkelling gear and a water guide at Blue Lagoon",
        "Tour leader and local guide",
        "Bottled water throughout the trip",
      ],
      excludes: [
        "Return flights to Denpasar",
        "Personal expenses and souvenir shopping",
        "Tipping for guide and driver",
        "Travel insurance",
        "Anything not listed in the itinerary",
      ],
      notes: DOMESTIC_NOTE.en,
    },
  },
} satisfies PackageInput;
