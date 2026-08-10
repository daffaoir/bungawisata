import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { INTERNATIONAL_NOTE } from "./shared";

export const vietnam5d4n = {
  slug: "vietnam-5d4n",
  region: "luar-negeri",
  destination: "Vietnam",
  durationDays: 5,
  durationNights: 4,
  priceFrom: 9500000,
  departureFrom: "Jakarta (CGK)",
  airline: "Vietnam Airlines",
  minPax: 25,
  hotels: [
    { city: "Hanoi", name: "Muong Thanh Grand Hanoi Hotel", nights: 3, stars: 4 },
    { city: "Ha Long", name: "Muong Thanh Luxury Ha Long Centre", nights: 1, stars: 4 },
  ],
  heroImage: images["vietnam-ha-long"],
  gallery: [
    images["vietnam-ha-long-kapal"],
    images["vietnam-hanoi-kota-tua"],
    images["vietnam-hanoi-jalan"],
  ],
  tags: ["budaya", "alam", "kuliner"],
  content: {
    id: {
      title: "Vietnam: Hanoi – Ha Long 5 Hari 4 Malam",
      summary:
        "Ibu kota Vietnam yang padat dan penuh sejarah, dipasangkan dengan teluk karst Ha Long yang masuk daftar Warisan Dunia UNESCO.",
      highlights: [
        "Berlayar di Teluk Ha Long dan singgah di Gua Sung Sot",
        "Kota Tua Hanoi dengan 36 jalan pedagangnya",
        "Kompleks Mausoleum Ho Chi Minh dan Pagoda Satu Pilar",
        "Pertunjukan wayang air Thang Long, tradisi khas delta Sungai Merah",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Hanoi",
          meals: ["dinner"],
          activities: [
            "Berkumpul di Bandara Soekarno-Hatta, Jakarta",
            "Terbang menuju Hanoi bersama Vietnam Airlines",
            "Tiba di Bandara Noi Bai dan proses imigrasi",
            "Makan malam di kawasan Kota Tua",
            "Check-in hotel dan istirahat",
          ],
        },
        {
          day: 2,
          title: "Hanoi – Ha Long",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Perjalanan darat menuju Ha Long lewat jalan tol (± 2,5 jam)",
            "Naik kapal wisata untuk berlayar di Teluk Ha Long",
            "Makan siang seafood di atas kapal",
            "Menyusuri Gua Sung Sot dan berhenti di Pulau Titop",
            "Check-in hotel di Ha Long, makan malam",
          ],
        },
        {
          day: 3,
          title: "Ha Long – Hanoi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan dan check-out hotel",
            "Kembali ke Hanoi dengan berhenti di sentra kerajinan Dong Trieu",
            "Makan siang di Hanoi",
            "Kompleks Mausoleum Ho Chi Minh, rumah panggung, dan Pagoda Satu Pilar",
            "Pertunjukan wayang air Thang Long",
            "Makan malam dan check-in hotel di Hanoi",
          ],
        },
        {
          day: 4,
          title: "Hanoi: Kuil Sastra – Danau Hoan Kiem",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Kuil Sastra (Van Mieu), universitas pertama Vietnam",
            "Penjara Hoa Lo dan Katedral Saint Joseph",
            "Makan siang, dilanjutkan naik becak cyclo menyusuri Kota Tua",
            "Danau Hoan Kiem dan Kuil Ngoc Son",
            "Makan malam dan waktu bebas berbelanja di Jalan Hang Gai",
          ],
        },
        {
          day: 5,
          title: "Hanoi – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Belanja oleh-oleh kopi dan kacang mede",
            "Pengantaran ke Bandara Noi Bai",
            "Penerbangan kembali ke Jakarta",
          ],
        },
      ],
      includes: [
        "Tiket pesawat pulang-pergi kelas ekonomi beserta bagasi 23 kg",
        "Hotel bintang 4 selama 4 malam (sekamar berdua)",
        "Makan sesuai program (4x makan pagi, 3x makan siang, 4x makan malam)",
        "Bus pariwisata ber-AC dan kapal wisata Teluk Ha Long",
        "Tiket masuk seluruh objek wisata dalam itinerary",
        "Tour leader dari Indonesia dan pemandu lokal berbahasa Indonesia",
        "Air mineral 1 botol per orang per hari",
      ],
      excludes: [
        "Paspor dengan masa berlaku minimal 6 bulan",
        "Pengeluaran pribadi, laundry, dan minuman di luar program",
        "Tipping untuk pemandu dan sopir sebesar USD 25 per orang",
        "Asuransi perjalanan",
        "Kelebihan bagasi dan biaya di luar itinerary",
      ],
      notes:
        "Warga negara Indonesia bebas visa untuk kunjungan wisata ke Vietnam hingga 30 hari. " +
        INTERNATIONAL_NOTE.id,
    },
    en: {
      title: "Vietnam: Hanoi – Ha Long 5 Days 4 Nights",
      summary:
        "Vietnam's dense, history-heavy capital paired with the karst seascape of Ha Long Bay, a UNESCO World Heritage site.",
      highlights: [
        "Cruising Ha Long Bay with a stop at Sung Sot Cave",
        "Hanoi's Old Quarter and its 36 merchant streets",
        "The Ho Chi Minh Mausoleum complex and the One Pillar Pagoda",
        "The Thang Long water puppet show, a Red River delta tradition",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Hanoi",
          meals: ["dinner"],
          activities: [
            "Meet at Soekarno-Hatta Airport, Jakarta",
            "Fly to Hanoi with Vietnam Airlines",
            "Arrive at Noi Bai Airport and clear immigration",
            "Dinner in the Old Quarter",
            "Hotel check-in and rest",
          ],
        },
        {
          day: 2,
          title: "Hanoi – Ha Long",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Drive to Ha Long on the expressway (about 2.5 hours)",
            "Board a cruise boat for Ha Long Bay",
            "Seafood lunch on board",
            "Walk through Sung Sot Cave and stop at Titop Island",
            "Hotel check-in in Ha Long and dinner",
          ],
        },
        {
          day: 3,
          title: "Ha Long – Hanoi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast and hotel check-out",
            "Return to Hanoi with a stop at the Dong Trieu craft workshops",
            "Lunch in Hanoi",
            "The Ho Chi Minh Mausoleum complex, stilt house, and One Pillar Pagoda",
            "The Thang Long water puppet show",
            "Dinner and hotel check-in in Hanoi",
          ],
        },
        {
          day: 4,
          title: "Hanoi: Temple of Literature – Hoan Kiem Lake",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "The Temple of Literature (Van Mieu), Vietnam's first university",
            "Hoa Lo Prison and Saint Joseph's Cathedral",
            "Lunch, then a cyclo ride through the Old Quarter",
            "Hoan Kiem Lake and Ngoc Son Temple",
            "Dinner and free time to shop on Hang Gai street",
          ],
        },
        {
          day: 5,
          title: "Hanoi – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Shopping for coffee and cashews",
            "Transfer to Noi Bai Airport",
            "Flight home to Jakarta",
          ],
        },
      ],
      includes: [
        "Return economy-class flights with 23 kg baggage allowance",
        "4-star hotels for 4 nights (twin sharing)",
        "Meals as per programme (4 breakfasts, 3 lunches, 4 dinners)",
        "Air-conditioned coach and the Ha Long Bay cruise boat",
        "Entrance tickets to every attraction in the itinerary",
        "Tour leader from Indonesia and a local guide",
        "One bottle of water per person per day",
      ],
      excludes: [
        "A passport valid for at least 6 months",
        "Personal expenses, laundry, and drinks outside the programme",
        "Tipping for guide and driver of USD 25 per person",
        "Travel insurance",
        "Excess baggage and anything not listed in the itinerary",
      ],
      notes:
        "Indonesian passport holders do not need a visa for tourist visits to Vietnam of up to 30 days. " +
        INTERNATIONAL_NOTE.en,
    },
  },
} satisfies PackageInput;
