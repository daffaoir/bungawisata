import { images } from "@/content/images";
import type { PackageInput } from "@/lib/schema";
import { DOMESTIC_NOTE } from "./shared";

export const bromoIjen4d3n = {
  slug: "bromo-ijen-4d3n",
  region: "dalam-negeri",
  destination: "Jawa Timur",
  durationDays: 4,
  durationNights: 3,
  priceFrom: 3450000,
  departureFrom: "Surabaya (SUB)",
  minPax: 15,
  hotels: [
    { city: "Probolinggo", name: "Jiwa Jawa Resort Bromo", nights: 1, stars: 3 },
    {
      city: "Banyuwangi",
      name: "Ketapang Indah Hotel Banyuwangi",
      nights: 2,
      stars: 3,
    },
  ],
  heroImage: images["bromo-lanskap"],
  gallery: [images["bromo-kaldera"], images["bromo-udara"], images["ijen-kawah"]],
  tags: ["gunung", "alam", "petualangan"],
  content: {
    id: {
      title: "Bromo – Ijen 4 Hari 3 Malam",
      summary:
        "Dua gunung berapi paling terkenal di Jawa Timur dalam satu perjalanan: matahari terbit di Penanjakan, lalu pendakian dini hari ke kawah Ijen.",
      highlights: [
        "Matahari terbit dari Penanjakan dengan latar Bromo, Batok, dan Semeru",
        "Menyeberangi Lautan Pasir menuju kawah Bromo",
        "Pendakian dini hari ke kawah Ijen dan danau asamnya yang biru toska",
        "Air Terjun Tumpak Sewu atau Taman Nasional Baluran sebagai penutup",
      ],
      itinerary: [
        {
          day: 1,
          title: "Surabaya – Kawasan Bromo",
          meals: ["lunch", "dinner"],
          activities: [
            "Berkumpul dan berangkat dari Surabaya",
            "Makan siang di kawasan Pasuruan",
            "Perjalanan menuju kawasan Bromo (± 4 jam)",
            "Check-in penginapan di ketinggian, pengarahan pendakian",
            "Makan malam dan istirahat awal — bangun dini hari",
          ],
        },
        {
          day: 2,
          title: "Bromo – Banyuwangi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Berangkat pukul 03.00 dengan jip menuju Penanjakan",
            "Menyaksikan matahari terbit dengan latar Bromo, Batok, dan Semeru",
            "Menyeberangi Lautan Pasir dan menaiki tangga ke bibir kawah Bromo",
            "Kembali ke penginapan untuk sarapan dan check-out",
            "Perjalanan darat menuju Banyuwangi (± 6 jam) dengan makan siang di perjalanan",
            "Check-in hotel di Banyuwangi, makan malam, istirahat awal",
          ],
        },
        {
          day: 3,
          title: "Kawah Ijen – Banyuwangi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Berangkat pukul 00.30 menuju Pos Paltuding",
            "Pendakian ± 3 km menuju bibir Kawah Ijen bersama pemandu",
            "Menyaksikan danau kawah dan aktivitas penambang belerang saat fajar",
            "Turun kembali, sarapan di Paltuding, lalu istirahat di hotel",
            "Makan siang, dilanjutkan Taman Nasional Baluran pada sore hari",
            "Makan malam khas Banyuwangi",
          ],
        },
        {
          day: 4,
          title: "Banyuwangi – Surabaya",
          meals: ["breakfast", "lunch"],
          activities: [
            "Sarapan dan check-out hotel",
            "Belanja oleh-oleh khas Banyuwangi",
            "Perjalanan kembali ke Surabaya dengan makan siang di perjalanan",
            "Pengantaran ke Bandara Juanda atau titik penjemputan awal",
          ],
        },
      ],
      includes: [
        "Penginapan 3 malam (sekamar berdua) di kawasan Bromo dan Banyuwangi",
        "Transportasi ber-AC Surabaya – Bromo – Banyuwangi – Surabaya",
        "Sewa jip 4x4 di kawasan Bromo (1 jip untuk 6 orang)",
        "Makan sesuai program (3x makan pagi, 4x makan siang, 3x makan malam)",
        "Tiket masuk Taman Nasional Bromo Tengger Semeru, Kawah Ijen, dan Baluran",
        "Pemandu pendakian Ijen dan tour leader",
        "Masker dan senter kepala untuk pendakian Ijen",
      ],
      excludes: [
        "Tiket pesawat atau kereta menuju Surabaya",
        "Ojek di kawasan Bromo dan troli tarik di Ijen",
        "Pengeluaran pribadi dan belanja oleh-oleh",
        "Tipping untuk pemandu, sopir jip, dan sopir bus",
        "Asuransi perjalanan",
      ],
      notes:
        "Kawah Ijen dapat ditutup sewaktu-waktu oleh PVMBG bila aktivitas vulkanik meningkat; bila itu terjadi, kami alihkan ke Air Terjun Tumpak Sewu tanpa biaya tambahan. " +
        DOMESTIC_NOTE.id,
    },
    en: {
      title: "Bromo – Ijen 4 Days 3 Nights",
      summary:
        "East Java's two best-known volcanoes in one trip: sunrise from Penanjakan, then a pre-dawn hike up to the Ijen crater.",
      highlights: [
        "Sunrise from Penanjakan with Bromo, Batok, and Semeru lined up behind",
        "Crossing the Sea of Sand to the Bromo crater rim",
        "The pre-dawn climb to Ijen and its turquoise acid lake",
        "Tumpak Sewu waterfall or Baluran National Park to close the trip",
      ],
      itinerary: [
        {
          day: 1,
          title: "Surabaya – Bromo area",
          meals: ["lunch", "dinner"],
          activities: [
            "Meet and depart from Surabaya",
            "Lunch in the Pasuruan area",
            "Drive up to the Bromo area (about 4 hours)",
            "Check in to the highland lodge and take the hike briefing",
            "Dinner and an early night — the wake-up call is before dawn",
          ],
        },
        {
          day: 2,
          title: "Bromo – Banyuwangi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Depart at 03:00 by jeep for Penanjakan",
            "Watch sunrise with Bromo, Batok, and Semeru behind",
            "Cross the Sea of Sand and climb the steps to the Bromo crater rim",
            "Back to the lodge for breakfast and check-out",
            "Overland to Banyuwangi (about 6 hours) with lunch on the way",
            "Hotel check-in in Banyuwangi, dinner, and an early night",
          ],
        },
        {
          day: 3,
          title: "Ijen Crater – Banyuwangi",
          meals: ["breakfast", "lunch", "dinner"],
          activities: [
            "Depart at 00:30 for the Paltuding post",
            "A 3 km climb to the Ijen crater rim with a guide",
            "See the crater lake and the sulphur miners at first light",
            "Descend, breakfast at Paltuding, then rest at the hotel",
            "Lunch, followed by Baluran National Park in the afternoon",
            "Banyuwangi-style dinner",
          ],
        },
        {
          day: 4,
          title: "Banyuwangi – Surabaya",
          meals: ["breakfast", "lunch"],
          activities: [
            "Breakfast and hotel check-out",
            "Shopping for Banyuwangi specialities",
            "Drive back to Surabaya with lunch en route",
            "Transfer to Juanda Airport or the original meeting point",
          ],
        },
      ],
      includes: [
        "3 nights accommodation (twin sharing) in the Bromo and Banyuwangi areas",
        "Air-conditioned transport Surabaya – Bromo – Banyuwangi – Surabaya",
        "4x4 jeep hire in the Bromo area (one jeep per 6 people)",
        "Meals as per programme (3 breakfasts, 4 lunches, 3 dinners)",
        "Entrance to Bromo Tengger Semeru National Park, Ijen, and Baluran",
        "Ijen hiking guide and tour leader",
        "Mask and head torch for the Ijen climb",
      ],
      excludes: [
        "Flights or train tickets to Surabaya",
        "Motorbike rides at Bromo and pull-carts at Ijen",
        "Personal expenses and souvenir shopping",
        "Tipping for guides, jeep drivers, and the coach driver",
        "Travel insurance",
      ],
      notes:
        "Ijen can be closed at short notice by the volcanology agency if activity rises; if that happens we switch to Tumpak Sewu waterfall at no extra cost. " +
        DOMESTIC_NOTE.en,
    },
  },
} satisfies PackageInput;
