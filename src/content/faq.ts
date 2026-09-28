import type { AppLocale } from "@/i18n/routing";

export type FaqItem = {
  id: string;
  question: Record<AppLocale, string>;
  answer: Record<AppLocale, string>;
};

/**
 * Jawaban sengaja tidak menyebut angka kebijakan (DP, minimal peserta) yang
 * belum dikonfirmasi pemilik. Tambahkan angka hanya kalau sudah pasti.
 */
export const faq: FaqItem[] = [
  {
    id: "booking",
    question: {
      id: "Bagaimana cara memesan paket wisata?",
      en: "How do I book a tour package?",
    },
    answer: {
      id: "Hubungi kami lewat WhatsApp dan sebutkan paket yang diminati. Tim kami akan mengirimkan rincian jadwal keberangkatan terdekat, ketersediaan kursi, dan langkah pembayarannya.",
      en: "Message us on WhatsApp and mention the package you're interested in. Our team will send you the nearest departure dates, seat availability, and the payment steps.",
    },
  },
  {
    id: "payment",
    question: {
      id: "Berapa uang muka yang harus dibayarkan?",
      en: "How much deposit is required?",
    },
    answer: {
      id: "Besaran uang muka dan tenggat pelunasan tergantung paket dan tanggal keberangkatan. Rinciannya kami kirim tertulis lewat WhatsApp sebelum Anda membayar apa pun.",
      en: "The deposit amount and final payment deadline depend on the package and departure date. We send the details in writing on WhatsApp before you pay anything.",
    },
  },
  {
    id: "group-size",
    question: {
      id: "Berapa jumlah minimal peserta agar trip berangkat?",
      en: "What is the minimum group size for a departure?",
    },
    answer: {
      id: "Kami melayani grup kecil, keluarga, hingga rombongan besar. Jumlah minimal peserta berbeda di tiap paket dan memengaruhi harga, jadi sebutkan perkiraan jumlah peserta saat menghubungi kami.",
      en: "We serve small groups, families and large groups alike. The minimum group size differs per package and affects the price, so tell us your expected headcount when you get in touch.",
    },
  },
  {
    id: "custom",
    question: {
      id: "Bisakah itinerary disesuaikan untuk rombongan kami?",
      en: "Can the itinerary be customised for our group?",
    },
    answer: {
      id: "Bisa. Untuk rombongan keluarga, kantor, sekolah, atau komunitas, kami dapat menyusun ulang itinerary sesuai jumlah peserta, anggaran, dan tanggal yang Anda inginkan.",
      en: "Yes. For family, corporate, school, or community groups we can rebuild the itinerary around your group size, budget, and preferred dates.",
    },
  },
  {
    id: "visa",
    question: {
      id: "Apakah pengurusan visa dibantu?",
      en: "Do you help with visa applications?",
    },
    answer: {
      id: "Untuk destinasi yang mensyaratkan visa, kami membantu menyiapkan dan mengajukan dokumen. Keputusan pemberian visa tetap sepenuhnya wewenang kedutaan terkait.",
      en: "For destinations that require a visa, we help prepare and submit the paperwork. The final decision always rests with the relevant embassy.",
    },
  },
  {
    id: "cancellation",
    question: {
      id: "Bagaimana kalau saya harus membatalkan keberangkatan?",
      en: "What if I need to cancel my trip?",
    },
    answer: {
      id: "Ketentuan pembatalan, termasuk tenggat dan besaran potongan biaya di tiap tahap, kami jelaskan saat pemesanan. Hubungi kami lewat WhatsApp untuk rinciannya.",
      en: "Our cancellation terms, including deadlines and the fee retained at each stage, are explained when you book. Message us on WhatsApp for the details.",
    },
  },
];
