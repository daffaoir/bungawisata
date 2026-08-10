import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { INTERNATIONAL_NOTE } from "./shared";

/**
 * Paket acuan — susunannya mengikuti template PDF "Bangkok – Pattaya 4h3m"
 * milik Bunga Wisata: rute Surabaya–Bandar Seri Begawan–Bangkok dengan Royal
 * Brunei, satu malam di Pattaya diapit dua malam di Bangkok, dan harga yang
 * berlaku untuk grup minimal 40 orang.
 */
export const bangkokPattaya4d3n = {
  slug: "bangkok-pattaya-4d3n",
  region: "luar-negeri",
  destination: "Thailand",
  durationDays: 4,
  durationNights: 3,
  priceFrom: 7000000,
  departureFrom: "Surabaya (SUB)",
  airline: "Royal Brunei Airlines",
  minPax: 40,
  hotels: [
    { city: "Bangkok", name: "Prince Palace Hotel Bangkok", nights: 2, stars: 3 },
    { city: "Pattaya", name: "Golden Beach Hotel Pattaya", nights: 1, stars: 3 },
  ],
  featured: true,
  heroImage: images["bangkok-grand-palace"],
  gallery: [
    images["bangkok-wat-arun"],
    images["pattaya-teluk"],
    images["bangkok-pasar-terapung"],
    images["bangkok-kota"],
  ],
  tags: ["kota", "belanja", "budaya"],
  content: {
    id: {
      title: "Bangkok – Pattaya 4 Hari 3 Malam",
      summary:
        "Dua kota yang saling melengkapi: Bangkok untuk kuil, pasar, dan belanja; Pattaya untuk pantai dan pertunjukan malam. Paket ini mengikuti rundown yang paling sering diminta rombongan kami.",
      highlights: [
        "Wat Phra Kaew dan Grand Palace, kompleks istana kerajaan Thailand",
        "Nong Nooch Tropical Garden dengan pertunjukan budaya dan gajah",
        "Pertunjukan kabaret Alcazar di Pattaya",
        "Belanja di Pratunam dan pusat grosir Platinum Fashion Mall",
      ],
      itinerary: [
        {
          day: 1,
          title: "Surabaya – Bandar Seri Begawan – Bangkok",
          meals: ["dinner"],
          activities: [
            "Berkumpul di Bandara Internasional Juanda, Surabaya",
            "Terbang bersama Royal Brunei Airlines dengan transit di Bandar Seri Begawan",
            "Tiba di Bandara Suvarnabhumi, Bangkok, dan proses imigrasi",
            "Makan malam di restoran halal kawasan Ratchathewi",
            "Check-in hotel dan istirahat",
          ],
        },
        {
          day: 2,
          title: "Bangkok – Pattaya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel dan check-out",
            "Kunjungan ke Wat Phra Kaew dan Grand Palace",
            "Makan siang, lalu perjalanan darat menuju Pattaya (± 2 jam)",
            "Nong Nooch Tropical Garden: taman botani, pertunjukan budaya Thai, dan atraksi gajah",
            "Makan malam dilanjutkan pertunjukan kabaret Alcazar",
            "Check-in hotel di Pattaya",
          ],
        },
        {
          day: 3,
          title: "Pattaya – Bangkok",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel dan check-out",
            "Menyeberang ke Koh Larn (Coral Island) dengan speedboat untuk bermain di pantai",
            "Makan siang seafood di pulau, kembali ke daratan",
            "Perjalanan kembali ke Bangkok, mampir ke Gems Gallery",
            "Belanja di Pratunam dan Platinum Fashion Mall",
            "Makan malam dan check-in hotel di Bangkok",
          ],
        },
        {
          day: 4,
          title: "Bangkok – Surabaya",
          meals: ["breakfast"],
          activities: [
            "Sarapan di hotel dan check-out",
            "Kunjungan singkat ke Wat Arun di tepi Sungai Chao Phraya",
            "Pengantaran ke Bandara Suvarnabhumi",
            "Penerbangan kembali ke Surabaya via Bandar Seri Begawan",
          ],
        },
      ],
      includes: [
        "Tiket pesawat pulang-pergi kelas ekonomi beserta bagasi 20 kg",
        "Hotel bintang 3 selama 3 malam (sekamar berdua)",
        "Makan sesuai program (3x makan pagi, 2x makan siang, 3x makan malam)",
        "Bus pariwisata ber-AC selama di Thailand",
        "Tiket masuk seluruh objek wisata dalam itinerary",
        "Tour leader dari Indonesia dan pemandu lokal berbahasa Indonesia",
        "Air mineral 1 botol per orang per hari",
      ],
      excludes: [
        "Paspor dengan masa berlaku minimal 6 bulan",
        "Pengeluaran pribadi, laundry, dan minuman di luar program",
        "Tipping untuk pemandu dan sopir sebesar THB 400 per orang",
        "Asuransi perjalanan",
        "Kelebihan bagasi dan biaya di luar itinerary",
      ],
      notes: INTERNATIONAL_NOTE.id,
    },
    en: {
      title: "Bangkok – Pattaya 4 Days 3 Nights",
      summary:
        "Two cities that complement each other: Bangkok for temples, markets, and shopping; Pattaya for the beach and its evening shows. This package follows the rundown our groups ask for most.",
      highlights: [
        "Wat Phra Kaew and the Grand Palace, Thailand's royal complex",
        "Nong Nooch Tropical Garden with its cultural and elephant shows",
        "The Alcazar cabaret show in Pattaya",
        "Shopping at Pratunam and the Platinum Fashion Mall",
      ],
      itinerary: [
        {
          day: 1,
          title: "Surabaya – Bandar Seri Begawan – Bangkok",
          meals: ["dinner"],
          activities: [
            "Meet at Juanda International Airport, Surabaya",
            "Fly with Royal Brunei Airlines, transiting in Bandar Seri Begawan",
            "Arrive at Suvarnabhumi Airport, Bangkok, and clear immigration",
            "Dinner at a halal restaurant in the Ratchathewi area",
            "Hotel check-in and rest",
          ],
        },
        {
          day: 2,
          title: "Bangkok – Pattaya",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel, then check out",
            "Visit Wat Phra Kaew and the Grand Palace",
            "Lunch, then the overland drive to Pattaya (about 2 hours)",
            "Nong Nooch Tropical Garden: botanical park, Thai cultural show, and elephant attraction",
            "Dinner followed by the Alcazar cabaret show",
            "Check in to the hotel in Pattaya",
          ],
        },
        {
          day: 3,
          title: "Pattaya – Bangkok",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel, then check out",
            "Speedboat across to Koh Larn (Coral Island) for beach time",
            "Seafood lunch on the island, then back to the mainland",
            "Drive back to Bangkok with a stop at the Gems Gallery",
            "Shopping at Pratunam and the Platinum Fashion Mall",
            "Dinner and hotel check-in in Bangkok",
          ],
        },
        {
          day: 4,
          title: "Bangkok – Surabaya",
          meals: ["breakfast"],
          activities: [
            "Breakfast at the hotel, then check out",
            "Short visit to Wat Arun on the Chao Phraya River",
            "Transfer to Suvarnabhumi Airport",
            "Flight home to Surabaya via Bandar Seri Begawan",
          ],
        },
      ],
      includes: [
        "Return economy-class flights with 20 kg baggage allowance",
        "3-star hotels for 3 nights (twin sharing)",
        "Meals as per programme (3 breakfasts, 2 lunches, 3 dinners)",
        "Air-conditioned coach throughout Thailand",
        "Entrance tickets to every attraction in the itinerary",
        "Tour leader from Indonesia and a local guide",
        "One bottle of water per person per day",
      ],
      excludes: [
        "A passport valid for at least 6 months",
        "Personal expenses, laundry, and drinks outside the programme",
        "Tipping for guide and driver of THB 400 per person",
        "Travel insurance",
        "Excess baggage and anything not listed in the itinerary",
      ],
      notes: INTERNATIONAL_NOTE.en,
    },
  },
} satisfies PackageInput;
