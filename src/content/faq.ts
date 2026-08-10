import type { AppLocale } from "@/i18n/routing";

export type FaqItem = {
  id: string;
  question: Record<AppLocale, string>;
  answer: Record<AppLocale, string>;
};

/** TODO: sesuaikan jawaban di bawah dengan kebijakan Bunga Wisata yang berlaku. */
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
      id: "TODO: sesuaikan dengan kebijakan Anda. Umumnya uang muka sebesar 30% dari harga paket, dan pelunasan paling lambat 14 hari sebelum keberangkatan.",
      en: "TODO: adjust to your own policy. Typically a 30% deposit is required, with the balance settled no later than 14 days before departure.",
    },
  },
  {
    id: "group-size",
    question: {
      id: "Berapa jumlah minimal peserta agar trip berangkat?",
      en: "What is the minimum group size for a departure?",
    },
    answer: {
      id: "TODO: sesuaikan. Umumnya trip berangkat jika terkumpul minimal 15 peserta. Jika kuota tidak terpenuhi, Anda dapat memilih pindah tanggal atau menerima pengembalian penuh.",
      en: "TODO: adjust. Departures typically run once at least 15 travellers have joined. If the minimum isn't met you may move to another date or receive a full refund.",
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
      id: "TODO: sesuaikan dengan syarat dan ketentuan Anda, termasuk tenggat pembatalan dan besaran potongan biaya di tiap tahap.",
      en: "TODO: adjust to your own terms, including cancellation deadlines and the fee retained at each stage.",
    },
  },
];
