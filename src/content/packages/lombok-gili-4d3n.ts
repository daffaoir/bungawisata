import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { DOMESTIC_NOTE } from "./shared";

export const lombokGili4d3n = {
  slug: "lombok-gili-4d3n",
  region: "dalam-negeri",
  destination: "Nusa Tenggara Barat",
  durationDays: 4,
  durationNights: 3,
  priceFrom: 4950000,
  departureFrom: "Lombok (LOP)",
  minPax: 15,
  hotels: [
    { city: "Senggigi", name: "Aruna Senggigi Resort", nights: 2, stars: 4 },
    { city: "Gili Trawangan", name: "Villa Ombak Gili Trawangan", nights: 1, stars: 4 },
  ],
  heroImage: images["gili-udara"],
  gallery: [images["gili-pulau"], images["gili-penyu"], images["lombok-rinjani"]],
  tags: ["pantai", "laut", "budaya"],
  content: {
    id: {
      title: "Lombok & Gili 4 Hari 3 Malam",
      summary:
        "Pantai selatan Lombok, desa adat Sasak, dan satu malam menginap di Gili Trawangan yang bebas kendaraan bermotor.",
      highlights: [
        "Desa adat Sade dengan rumah beratap alang-alang dan lantai tanah liat",
        "Pantai Tanjung Aan dan Bukit Merese di ujung selatan Lombok",
        "Menginap di Gili Trawangan — hanya sepeda dan cidomo, tanpa mobil",
        "Snorkeling di titik penyu antara Gili Trawangan, Meno, dan Air",
      ],
      itinerary: [
        {
          day: 1,
          title: "Tiba di Lombok – Sade – Kuta Mandalika",
          meals: ["lunch", "dinner"],
          activities: [
            "Penjemputan di Bandara Internasional Lombok",
            "Kunjungan ke desa adat Sade dan demonstrasi tenun songket",
            "Makan siang khas Lombok — ayam taliwang dan plecing kangkung",
            "Pantai Tanjung Aan dan Bukit Merese menjelang sore",
            "Check-in hotel di Senggigi, makan malam",
          ],
        },
        {
          day: 2,
          title: "Senggigi – Gili Trawangan",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan di hotel",
            "Menyeberang dari Pelabuhan Bangsal ke Gili Trawangan",
            "Check-in penginapan, makan siang di tepi pantai",
            "Bersepeda mengelilingi pulau (± 7 km)",
            "Matahari terbenam di sisi barat pulau dengan latar Gunung Agung",
            "Makan malam di pasar malam Gili Trawangan",
          ],
        },
        {
          day: 3,
          title: "Hopping Tiga Gili – Senggigi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Sarapan dan check-out penginapan",
            "Snorkeling di titik penyu dan patung bawah laut dekat Gili Meno",
            "Berhenti di Gili Air untuk berenang dan makan siang",
            "Kembali ke daratan Lombok, check-in hotel di Senggigi",
            "Bukit Malimbu untuk menonton matahari terbenam",
            "Makan malam dan istirahat",
          ],
        },
        {
          day: 4,
          title: "Kota Mataram – Kepulangan",
          meals: ["breakfast"],
          activities: [
            "Sarapan dan check-out hotel",
            "Sentra kerajinan gerabah Banyumulek",
            "Belanja mutiara dan oleh-oleh di kota Mataram",
            "Pengantaran ke Bandara Internasional Lombok",
          ],
        },
      ],
      includes: [
        "Hotel bintang 4 di Senggigi 2 malam dan Gili Trawangan 1 malam (sekamar berdua)",
        "Tiket kapal penyeberangan dan sewa kapal hopping tiga gili",
        "Transportasi ber-AC di daratan Lombok",
        "Makan sesuai program (3x makan pagi, 3x makan siang, 3x makan malam)",
        "Tiket masuk desa Sade, Tanjung Aan, dan Bukit Merese",
        "Peralatan snorkeling dan sewa sepeda di Gili Trawangan",
        "Tour leader dan pemandu lokal",
      ],
      excludes: [
        "Tiket pesawat pulang-pergi ke Lombok",
        "Pengeluaran pribadi dan belanja oleh-oleh",
        "Tipping untuk pemandu, sopir, dan awak kapal",
        "Asuransi perjalanan",
        "Biaya di luar itinerary yang tertulis",
      ],
      notes: DOMESTIC_NOTE.id,
    },
    en: {
      title: "Lombok & Gili 4 Days 3 Nights",
      summary:
        "Lombok's southern beaches, a traditional Sasak village, and a night on Gili Trawangan, where no motor vehicles are allowed.",
      highlights: [
        "Sade village, with thatched roofs and clay floors",
        "Tanjung Aan beach and Merese Hill at Lombok's southern tip",
        "A night on Gili Trawangan — bicycles and horse carts only",
        "Snorkelling the turtle spots between Trawangan, Meno, and Air",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Lombok – Sade – Kuta Mandalika",
          meals: ["lunch", "dinner"],
          activities: [
            "Pickup at Lombok International Airport",
            "Visit Sade traditional village and a songket weaving demonstration",
            "Lombok lunch — ayam taliwang and plecing kangkung",
            "Tanjung Aan beach and Merese Hill in the late afternoon",
            "Hotel check-in in Senggigi and dinner",
          ],
        },
        {
          day: 2,
          title: "Senggigi – Gili Trawangan",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast at the hotel",
            "Boat across from Bangsal harbour to Gili Trawangan",
            "Check in and have lunch by the beach",
            "Cycle the island loop (about 7 km)",
            "Sunset on the west side with Mount Agung on the horizon",
            "Dinner at the Gili Trawangan night market",
          ],
        },
        {
          day: 3,
          title: "Three-Gili hopping – Senggigi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Breakfast and check-out",
            "Snorkelling at the turtle spot and the underwater statues near Gili Meno",
            "A stop at Gili Air to swim, then lunch",
            "Back to mainland Lombok and check in at Senggigi",
            "Malimbu Hill for sunset",
            "Dinner and rest",
          ],
        },
        {
          day: 4,
          title: "Mataram – Departure",
          meals: ["breakfast"],
          activities: [
            "Breakfast and hotel check-out",
            "Banyumulek pottery workshops",
            "Pearl and souvenir shopping in Mataram",
            "Transfer to Lombok International Airport",
          ],
        },
      ],
      includes: [
        "4-star hotel: 2 nights in Senggigi and 1 night on Gili Trawangan (twin sharing)",
        "Ferry tickets and the three-Gili hopping boat charter",
        "Air-conditioned transport on mainland Lombok",
        "Meals as per programme (3 breakfasts, 3 lunches, 3 dinners)",
        "Entrance to Sade village, Tanjung Aan, and Merese Hill",
        "Snorkelling gear and bicycle hire on Gili Trawangan",
        "Tour leader and local guide",
      ],
      excludes: [
        "Return flights to Lombok",
        "Personal expenses and souvenir shopping",
        "Tipping for guides, driver, and boat crew",
        "Travel insurance",
        "Anything not listed in the itinerary",
      ],
      notes: DOMESTIC_NOTE.en,
    },
  },
} satisfies PackageInput;
