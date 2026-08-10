import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { INTERNATIONAL_NOTE } from "./shared";

export const koreaSelatan6d5n = {
  slug: "korea-selatan-6d5n",
  region: "luar-negeri",
  destination: "Korea Selatan",
  durationDays: 6,
  durationNights: 5,
  priceFrom: 19500000,
  departureFrom: "Jakarta (CGK)",
  airline: "Korean Air",
  minPax: 25,
  hotels: [
    { city: "Seoul", name: "Ramada Seoul Dongdaemun", nights: 5, stars: 4 },
  ],
  heroImage: images["korea-gyeongbokgung"],
  gallery: [
    images["korea-istana"],
    images["korea-nami"],
    images["korea-seoul-malam"],
  ],
  tags: ["kota", "budaya", "keluarga"],
  content: {
    id: {
      title: "Korea Selatan 6 Hari 5 Malam",
      summary:
        "Seoul sebagai basis selama lima malam, dengan perjalanan harian ke Pulau Nami, Everland, dan desa hanok — cocok untuk rombongan keluarga.",
      highlights: [
        "Istana Gyeongbokgung dan upacara pergantian penjaga",
        "Pulau Nami dengan barisan pohon metasequoia-nya",
        "Taman hiburan Everland, terbesar di Korea Selatan",
        "Menyewa hanbok untuk berfoto di Desa Hanok Bukchon",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Seoul",
          meals: ["dinner"],
          activities: [
            "Berkumpul di Bandara Soekarno-Hatta, Jakarta",
            "Terbang menuju Seoul bersama Korean Air",
            "Tiba di Bandara Internasional Incheon dan proses imigrasi",
            "Makan malam khas Korea di kawasan Dongdaemun",
            "Check-in hotel dan istirahat",
          ],
        },
        {
          day: 2,
          title: "Pulau Nami – Petite France",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Perjalanan menuju Gapyeong (± 1,5 jam)",
            "Menyeberang dengan feri ke Pulau Nami dan menyusuri jalur metasequoia",
            "Makan siang khas dakgalbi",
            "Petite France dan Italian Village",
            "Kembali ke Seoul, makan malam, dan istirahat",
          ],
        },
        {
          day: 3,
          title: "Seoul: Gyeongbokgung – Bukchon – N Seoul Tower",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Istana Gyeongbokgung dan upacara pergantian penjaga",
            "Menyewa hanbok untuk berfoto di Desa Hanok Bukchon",
            "Makan siang di kawasan Insadong",
            "Naik kereta gantung ke N Seoul Tower di Gunung Namsan",
            "Makan malam dan waktu bebas di Myeongdong",
          ],
        },
        {
          day: 4,
          title: "Everland",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Perjalanan menuju Everland di Yongin",
            "Waktu bebas menikmati wahana dan safari Everland",
            "Makan siang di dalam kawasan taman",
            "Kembali ke Seoul lewat sentra kosmetik",
            "Makan malam dan istirahat",
          ],
        },
        {
          day: 5,
          title: "Seoul: Sungai Han – Hongdae",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Kebun teh hijau atau taman bunga sesuai musim",
            "Makan siang, dilanjutkan kunjungan ke Museum Rumput Laut dan sesi kimbap",
            "Menyusuri Taman Sungai Han Yeouido",
            "Waktu bebas di Hongdae",
            "Makan malam perpisahan",
          ],
        },
        {
          day: 6,
          title: "Seoul – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Belanja oleh-oleh terakhir di supermarket lokal",
            "Pengantaran ke Bandara Internasional Incheon",
            "Penerbangan kembali ke Jakarta",
          ],
        },
      ],
      includes: [
        "Tiket pesawat pulang-pergi kelas ekonomi beserta bagasi 23 kg",
        "Hotel bintang 4 di Seoul selama 5 malam (sekamar berdua)",
        "Makan sesuai program (5x makan pagi, 4x makan siang, 5x makan malam)",
        "Bus pariwisata ber-AC selama di Korea Selatan",
        "Tiket Pulau Nami, Everland, N Seoul Tower, dan sewa hanbok",
        "Tour leader dari Indonesia dan pemandu lokal berbahasa Indonesia",
        "Air mineral 1 botol per orang per hari",
      ],
      excludes: [
        "Paspor dengan masa berlaku minimal 6 bulan",
        "Biaya pengurusan visa Korea Selatan",
        "Pengeluaran pribadi, laundry, dan minuman di luar program",
        "Tipping untuk pemandu dan sopir sebesar KRW 50.000 per orang",
        "Asuransi perjalanan dan kelebihan bagasi",
      ],
      notes:
        "Warga negara Indonesia memerlukan visa untuk masuk Korea Selatan; pengurusannya kami bantu dan biayanya ditagih terpisah. Taman bunga yang dikunjungi menyesuaikan musim. " +
        INTERNATIONAL_NOTE.id,
    },
    en: {
      title: "South Korea 6 Days 5 Nights",
      summary:
        "Seoul as a base for five nights, with day trips to Nami Island, Everland, and the hanok village — an easy fit for family groups.",
      highlights: [
        "Gyeongbokgung Palace and the changing of the guard",
        "Nami Island and its metasequoia tree lane",
        "Everland, South Korea's largest theme park",
        "Renting a hanbok for photos in Bukchon Hanok Village",
      ],
      itinerary: [
        {
          day: 1,
          title: "Jakarta – Seoul",
          meals: ["dinner"],
          activities: [
            "Meet at Soekarno-Hatta Airport, Jakarta",
            "Fly to Seoul with Korean Air",
            "Arrive at Incheon International Airport and clear immigration",
            "Korean dinner in the Dongdaemun area",
            "Hotel check-in and rest",
          ],
        },
        {
          day: 2,
          title: "Nami Island – Petite France",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Drive out to Gapyeong (about 1.5 hours)",
            "Ferry across to Nami Island and a walk down the metasequoia lane",
            "Dakgalbi lunch",
            "Petite France and the Italian Village",
            "Back to Seoul for dinner and rest",
          ],
        },
        {
          day: 3,
          title: "Seoul: Gyeongbokgung – Bukchon – N Seoul Tower",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Gyeongbokgung Palace and the changing of the guard",
            "Hanbok rental for photos in Bukchon Hanok Village",
            "Lunch in the Insadong area",
            "Cable car up to N Seoul Tower on Namsan",
            "Dinner and free time in Myeongdong",
          ],
        },
        {
          day: 4,
          title: "Everland",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Drive to Everland in Yongin",
            "Free time for the rides and the Everland safari",
            "Lunch inside the park",
            "Back to Seoul via a cosmetics centre",
            "Dinner and rest",
          ],
        },
        {
          day: 5,
          title: "Seoul: Han River – Hongdae",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "A green tea plantation or flower park, depending on the season",
            "Lunch, then the Seaweed Museum with a kimbap-making session",
            "A walk through Yeouido Han River Park",
            "Free time in Hongdae",
            "Farewell dinner",
          ],
        },
        {
          day: 6,
          title: "Seoul – Jakarta",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Last-minute shopping at a local supermarket",
            "Transfer to Incheon International Airport",
            "Flight home to Jakarta",
          ],
        },
      ],
      includes: [
        "Return economy-class flights with 23 kg baggage allowance",
        "4-star hotel in Seoul for 5 nights (twin sharing)",
        "Meals as per programme (5 breakfasts, 4 lunches, 5 dinners)",
        "Air-conditioned coach throughout South Korea",
        "Nami Island, Everland, N Seoul Tower tickets, and hanbok rental",
        "Tour leader from Indonesia and a local guide",
        "One bottle of water per person per day",
      ],
      excludes: [
        "A passport valid for at least 6 months",
        "South Korean visa processing fees",
        "Personal expenses, laundry, and drinks outside the programme",
        "Tipping for guide and driver of KRW 50,000 per person",
        "Travel insurance and excess baggage",
      ],
      notes:
        "Indonesian passport holders need a visa for South Korea; we help with the application and bill the fee separately. The flower park visited depends on the season. " +
        INTERNATIONAL_NOTE.en,
    },
  },
} satisfies PackageInput;
