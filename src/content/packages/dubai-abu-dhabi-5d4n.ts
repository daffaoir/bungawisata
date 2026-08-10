import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { INTERNATIONAL_NOTE } from "./shared";

export const dubaiAbuDhabi5d4n = {
  slug: "dubai-abu-dhabi-5d4n",
  region: "luar-negeri",
  destination: "Uni Emirat Arab",
  durationDays: 5,
  durationNights: 4,
  priceFrom: 15900000,
  departureFrom: "Jakarta (CGK)",
  airline: "Emirates",
  minPax: 25,
  hotels: [
    { city: "Dubai", name: "Ibis Al Barsha Dubai", nights: 4, stars: 3 },
  ],
  heroImage: images["dubai-burj-khalifa"],
  gallery: [
    images["dubai-kota"],
    images["dubai-gurun"],
    images["abu-dhabi-masjid"],
    images["dubai-unta"],
  ],
  tags: ["kota", "gurun", "belanja"],
  content: {
    id: {
      title: "Dubai – Abu Dhabi 5 Hari 4 Malam",
      summary:
        "Menara tertinggi di dunia, safari gurun dengan makan malam di bawah bintang, dan Masjid Sheikh Zayed di Abu Dhabi dalam satu perjalanan.",
      highlights: [
        "Dek pandang lantai 124 Burj Khalifa, gedung tertinggi di dunia",
        "Desert safari dune bashing dilanjutkan makan malam barbeku di kemah gurun",
        "Masjid Agung Sheikh Zayed di Abu Dhabi",
        "Menyusuri Dubai Creek dengan perahu abra menuju Gold Souk",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Dubai",
          meals: ["dinner"],
          activities: [
            "Berkumpul di Bandara Soekarno-Hatta, Jakarta",
            "Terbang langsung menuju Dubai bersama Emirates",
            "Tiba di Bandara Internasional Dubai dan proses imigrasi",
            "Makan malam di restoran kawasan Deira",
            "Check-in hotel dan istirahat",
          ],
        },
        {
          day: 2,
          title: "Dubai Klasik – Burj Khalifa",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Menyusuri Dubai Creek dengan perahu abra, mampir ke Gold Souk dan Spice Souk",
            "Foto di Masjid Jumeirah dan Burj Al Arab dari Pantai Jumeirah",
            "Makan siang di Dubai Mall",
            "Naik ke dek pandang lantai 124 Burj Khalifa",
            "Pertunjukan Dubai Fountain, makan malam, kembali ke hotel",
          ],
        },
        {
          day: 3,
          title: "Abu Dhabi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel, berangkat menuju Abu Dhabi (± 1,5 jam)",
            "Masjid Agung Sheikh Zayed — pengunjung perempuan wajib mengenakan abaya",
            "Makan siang di kawasan Corniche",
            "Berhenti di Emirates Palace dan Qasr Al Watan dari luar",
            "Kembali ke Dubai, makan malam, dan istirahat",
          ],
        },
        {
          day: 4,
          title: "Palm Jumeirah – Desert Safari",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Monorel Palm Jumeirah dan foto di depan Atlantis The Palm",
            "Makan siang, dilanjutkan waktu bebas di Mall of the Emirates",
            "Desert safari: dune bashing dengan 4x4 di gurun Lahbab",
            "Naik unta, henna, dan pertunjukan tanwura di kemah gurun",
            "Makan malam barbeku di kemah, kembali ke hotel",
          ],
        },
        {
          day: 5,
          title: "Dubai – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Waktu bebas terakhir untuk oleh-oleh kurma dan parfum",
            "Pengantaran ke Bandara Internasional Dubai",
            "Penerbangan kembali ke Jakarta",
          ],
        },
      ],
      includes: [
        "Tiket pesawat pulang-pergi kelas ekonomi beserta bagasi 30 kg",
        "Hotel bintang 3 selama 4 malam (sekamar berdua)",
        "Makan sesuai program (4x makan pagi, 3x makan siang, 4x makan malam)",
        "Bus pariwisata ber-AC selama di Uni Emirat Arab",
        "Tiket Burj Khalifa lantai 124, perahu abra, dan monorel Palm Jumeirah",
        "Desert safari dengan kendaraan 4x4 dan makan malam di kemah",
        "Visa Uni Emirat Arab, tour leader, dan pemandu lokal berbahasa Indonesia",
      ],
      excludes: [
        "Paspor dengan masa berlaku minimal 6 bulan",
        "Sewa abaya di Masjid Sheikh Zayed",
        "Pengeluaran pribadi, laundry, dan minuman di luar program",
        "Tipping untuk pemandu dan sopir sebesar AED 120 per orang",
        "Asuransi perjalanan dan kelebihan bagasi",
      ],
      notes:
        "Warga negara Indonesia mendapat visa on arrival gratis 14 hari untuk Uni Emirat Arab; kami tetap mengurus visa elektronik agar rombongan tidak antre terpisah. " +
        INTERNATIONAL_NOTE.id,
    },
    en: {
      title: "Dubai – Abu Dhabi 5 Days 4 Nights",
      summary:
        "The world's tallest tower, a desert safari with dinner under the stars, and the Sheikh Zayed Grand Mosque in Abu Dhabi, all in one trip.",
      highlights: [
        "The level 124 observation deck of the Burj Khalifa, the world's tallest building",
        "Desert dune bashing followed by a barbecue dinner at a desert camp",
        "The Sheikh Zayed Grand Mosque in Abu Dhabi",
        "Crossing Dubai Creek by abra boat to the Gold Souk",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Dubai",
          meals: ["dinner"],
          activities: [
            "Meet at Soekarno-Hatta Airport, Jakarta",
            "Direct flight to Dubai with Emirates",
            "Arrive at Dubai International Airport and clear immigration",
            "Dinner at a restaurant in Deira",
            "Hotel check-in and rest",
          ],
        },
        {
          day: 2,
          title: "Classic Dubai – Burj Khalifa",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Cross Dubai Creek by abra, then the Gold Souk and Spice Souk",
            "Photo stops at Jumeirah Mosque and the Burj Al Arab from Jumeirah Beach",
            "Lunch at the Dubai Mall",
            "Up to the level 124 observation deck of the Burj Khalifa",
            "The Dubai Fountain show, dinner, and back to the hotel",
          ],
        },
        {
          day: 3,
          title: "Abu Dhabi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast, then the drive to Abu Dhabi (about 1.5 hours)",
            "Sheikh Zayed Grand Mosque — women visitors must wear an abaya",
            "Lunch along the Corniche",
            "Exterior stops at Emirates Palace and Qasr Al Watan",
            "Back to Dubai for dinner and rest",
          ],
        },
        {
          day: 4,
          title: "Palm Jumeirah – Desert Safari",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "The Palm Jumeirah monorail and photos in front of Atlantis The Palm",
            "Lunch, then free time at the Mall of the Emirates",
            "Desert safari: 4x4 dune bashing in the Lahbab desert",
            "Camel rides, henna, and a tanoura show at the desert camp",
            "Barbecue dinner at the camp, then back to the hotel",
          ],
        },
        {
          day: 5,
          title: "Dubai – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "A last free spell for dates and perfume",
            "Transfer to Dubai International Airport",
            "Flight home to Jakarta",
          ],
        },
      ],
      includes: [
        "Return economy-class flights with 30 kg baggage allowance",
        "3-star hotel for 4 nights (twin sharing)",
        "Meals as per programme (4 breakfasts, 3 lunches, 4 dinners)",
        "Air-conditioned coach throughout the UAE",
        "Burj Khalifa level 124, abra boat, and Palm Jumeirah monorail tickets",
        "Desert safari by 4x4 with dinner at the camp",
        "UAE visa, tour leader, and a local guide",
      ],
      excludes: [
        "A passport valid for at least 6 months",
        "Abaya hire at the Sheikh Zayed Mosque",
        "Personal expenses, laundry, and drinks outside the programme",
        "Tipping for guide and driver of AED 120 per person",
        "Travel insurance and excess baggage",
      ],
      notes:
        "Indonesian passport holders receive a free 14-day visa on arrival for the UAE; we still arrange the e-visa so the group is not split up in separate queues. " +
        INTERNATIONAL_NOTE.en,
    },
  },
} satisfies PackageInput;
