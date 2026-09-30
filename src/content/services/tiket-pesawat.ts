import { images } from "@/content/images";
import type { ServiceInput } from "@/lib/content-schema";

export const tiketPesawat = {
  slug: "tiket-pesawat",
  icon: "plane",
  heroImage: images["umum-pesawat"],
  relatedPackages: ["singapura-malaysia-4d3n", "jepang-7d6n", "dubai-abu-dhabi-5d4n"],
  whatsappMessage: {
    id: "Halo Bunga Wisata, saya ingin pesan tiket pesawat. Rute, tanggal, dan jumlah penumpangnya: ",
    en: "Hello Bunga Wisata, I'd like to book a flight. Route, date and number of passengers: ",
  },
  faq: [
    {
      id: "tiket-bandara-asal",
      question: {
        id: "Dari bandara mana saja tiket bisa dipesan?",
        en: "Which departure airports can you book from?",
      },
      answer: {
        id: "Pelanggan di Malang biasanya terbang dari Juanda (Surabaya) atau Abdul Rachman Saleh (Malang). Kami juga membantu penerbangan dari Jakarta, misalnya untuk sambungan ke luar negeri. Kami bantu membandingkan pilihan rute yang paling masuk akal untuk jadwal Anda.",
        en: "Travellers from Malang usually fly out of Juanda (Surabaya) or Abdul Rachman Saleh (Malang). We also help with flights from Jakarta, for example for international connections. We help compare the routes that make the most sense for your schedule.",
      },
    },
    {
      id: "tiket-grup",
      question: {
        id: "Apakah bisa memesan tiket untuk rombongan?",
        en: "Can you book tickets for a group?",
      },
      answer: {
        id: "Bisa. Kami membantu pemesanan tiket grup untuk rombongan kantor, keluarga besar, atau study tour, termasuk mengumpulkan data penumpang dan memastikan ejaan nama sesuai identitas. Untuk grup, semakin cepat menghubungi kami semakin banyak pilihan jadwal yang tersedia.",
        en: "Yes. We help with group bookings for office trips, extended families or study tours, including collecting passenger details and checking that names match each traveller's ID. For groups, the earlier you contact us, the more flight options remain available.",
      },
    },
    {
      id: "tiket-data-penumpang",
      question: {
        id: "Data apa yang perlu disiapkan untuk memesan tiket?",
        en: "What details do I need to prepare to book?",
      },
      answer: {
        id: "Umumnya nama lengkap sesuai KTP atau paspor, rute, dan tanggal perjalanan. Untuk penerbangan internasional, siapkan juga data paspor yang masih berlaku. Kami akan memberi tahu bila ada data tambahan yang diminta.",
        en: "Usually each passenger's full name as shown on their ID card or passport, the route and the travel date. For international flights, also have valid passport details ready. We will let you know if any extra details are required.",
      },
    },
    {
      id: "tiket-plus-tour",
      question: {
        id: "Bisakah tiket pesawat digabung dengan paket tour?",
        en: "Can a flight be combined with a tour package?",
      },
      answer: {
        id: "Bisa. Tiket bisa dipesan terpisah, atau digabung dengan paket tour, hotel, dan transportasi di tujuan. Dengan begitu jadwal penerbangan dan itinerary disusun bersamaan dan tidak saling bertabrakan.",
        en: "Yes. Tickets can be booked on their own or combined with a tour package, hotel and ground transport at your destination. That way the flight times and itinerary are planned together and do not clash.",
      },
    },
    {
      id: "tiket-perubahan-jadwal",
      question: {
        id: "Bagaimana kalau jadwal penerbangan berubah?",
        en: "What happens if the flight schedule changes?",
      },
      answer: {
        id: "Kalau ada perubahan jadwal dari pihak maskapai atau Anda perlu mengganti tanggal, hubungi kami lewat WhatsApp pada jam kerja. Kami bantu mengecek pilihan yang tersedia sesuai ketentuan tiket, lalu menjelaskannya sebelum ada perubahan yang diproses.",
        en: "If the airline changes the schedule or you need to change your date, contact us on WhatsApp during office hours. We check the options available under the ticket's conditions and explain them before any change is processed.",
      },
    },
    {
      id: "tiket-cara-pesan",
      question: {
        id: "Bagaimana cara memesan tiket pesawat di Bunga Wisata?",
        en: "How do I book a flight with Bunga Wisata?",
      },
      answer: {
        id: "Kirim rute, tanggal, dan jumlah penumpang ke WhatsApp 0812-3390-9129 pada jam kerja Senin–Sabtu, 08.00–17.00. Kami balas dengan pilihan jadwal, lalu memproses pemesanan setelah Anda memilih dan mengonfirmasi.",
        en: "Send your route, date and number of passengers to WhatsApp at 0812-3390-9129 during office hours, Monday to Saturday, 08.00–17.00. We reply with flight options, then process the booking once you have chosen and confirmed.",
      },
    },
  ],
  content: {
    id: {
      name: "Tiket Pesawat",
      title: "Pesan tiket pesawat di Malang",
      metaTitle: "Pesan tiket pesawat di Malang",
      metaDescription:
        "Pesan tiket pesawat domestik dan internasional di Malang lewat WhatsApp. Penerbangan dari Juanda, Abdul Rachman Saleh, atau Jakarta untuk grup maupun perorangan.",
      summary:
        "Bantuan pemesanan tiket pesawat domestik dan internasional dari Surabaya, Malang, atau Jakarta, untuk perorangan maupun rombongan, cukup lewat WhatsApp.",
      intro: [
        "Memesan tiket pesawat sendiri memang bisa, tetapi tidak selalu mudah: memilih bandara yang tepat, membandingkan jam terbang, memastikan ejaan nama sesuai paspor, atau mengurus tiket untuk banyak orang sekaligus. Bunga Wisata membantu warga Malang dan sekitarnya memesan tiket pesawat domestik maupun internasional, cukup dengan mengirim pesan WhatsApp.",
        "Pelanggan kami biasanya terbang dari Bandara Juanda di Surabaya atau Abdul Rachman Saleh di Malang, dan untuk beberapa rute internasional lewat Jakarta. Kami bantu menimbang pilihan bandara dan jadwal yang paling praktis, termasuk waktu tempuh dari rumah ke bandara.",
        "Layanan ini terbuka untuk perorangan maupun grup. Tiket juga bisa digabung dengan paket tour kami, sehingga penerbangan, hotel, dan itinerary di tujuan diatur oleh satu tim. Anda cukup menyimpan satu nomor WhatsApp untuk bertanya soal jadwal, dokumen, maupun rencana perjalanan, tanpa harus berpindah-pindah aplikasi.",
      ],
      suitableForTitle: "Cocok untuk",
      suitableFor: [
        "Perorangan dan keluarga yang ingin dibantu memilih jadwal penerbangan",
        "Rombongan kantor, komunitas, atau sekolah yang butuh tiket grup",
        "Wisatawan yang ingin tiket sekaligus paket tour dalam satu pemesanan",
        "Pelanggan yang lebih nyaman bertanya langsung daripada memesan lewat aplikasi",
        "Orang tua yang memesankan tiket untuk anak yang kuliah atau bekerja di luar kota",
      ],
      weHandleTitle: "Yang kami bantu",
      weHandle: [
        "Pencarian jadwal penerbangan domestik dan internasional",
        "Perbandingan rute dari Juanda, Abdul Rachman Saleh, atau Jakarta",
        "Pemesanan tiket untuk perorangan maupun grup",
        "Pengecekan data penumpang agar sesuai KTP atau paspor",
        "Pengiriman e-tiket dan ringkasan jadwal lewat WhatsApp",
        "Penggabungan tiket dengan paket tour, hotel, dan transportasi di tujuan",
      ],
      steps: [
        {
          title: "Kirim rute lewat WhatsApp",
          text: "Sebutkan kota asal dan tujuan, tanggal berangkat dan pulang, jumlah penumpang, serta preferensi jam terbang bila ada.",
        },
        {
          title: "Pilihan jadwal tertulis",
          text: "Kami kirim beberapa pilihan penerbangan beserta rincian dan ketentuannya secara tertulis, sehingga Anda bisa membandingkannya dengan tenang.",
        },
        {
          title: "Konfirmasi dan data penumpang",
          text: "Setelah Anda memilih, kirim data penumpang sesuai identitas. Kami cek ulang ejaan nama sebelum tiket diterbitkan.",
        },
        {
          title: "Terima e-tiket dan terbang",
          text: "E-tiket dikirim lewat WhatsApp. Bila ada pertanyaan menjelang keberangkatan, tim kami siap membantu pada jam kerja.",
        },
      ],
    },
    en: {
      name: "Flight Tickets",
      title: "Book flight tickets in Malang",
      metaTitle: "Book flight tickets in Malang",
      metaDescription:
        "Book domestic and international flights in Malang via WhatsApp. Departures from Juanda, Abdul Rachman Saleh or Jakarta, for individual travellers and groups.",
      summary:
        "Help booking domestic and international flights from Surabaya, Malang or Jakarta, for individuals and groups alike, all through WhatsApp.",
      intro: [
        "You can book a flight yourself, but it is not always easy: picking the right airport, comparing departure times, making sure names match passports, or handling tickets for many people at once. Bunga Wisata helps people in and around Malang book domestic and international flights, simply by sending a WhatsApp message.",
        "Our customers usually fly out of Juanda Airport in Surabaya or Abdul Rachman Saleh in Malang, and via Jakarta for some international routes. We help you weigh up the most practical airport and schedule, including the travel time from home to the airport.",
        "The service is open to individuals and groups. Tickets can also be combined with one of our tour packages, so your flights, hotel and itinerary at the destination are handled by one team. You only need to save one WhatsApp number to ask about schedules, documents or travel plans, without switching between apps.",
      ],
      suitableForTitle: "Ideal for",
      suitableFor: [
        "Individuals and families who want help choosing flight times",
        "Office, community or school groups that need group tickets",
        "Travellers who want flights and a tour package in one booking",
        "Customers who prefer asking a person directly over booking in an app",
        "Parents booking tickets for children studying or working in another city",
      ],
      weHandleTitle: "How we help",
      weHandle: [
        "Searching domestic and international flight schedules",
        "Comparing routes from Juanda, Abdul Rachman Saleh or Jakarta",
        "Booking tickets for individuals and groups",
        "Checking passenger details against ID cards or passports",
        "Sending e-tickets and a schedule summary via WhatsApp",
        "Combining flights with tour packages, hotels and ground transport",
      ],
      steps: [
        {
          title: "Send your route on WhatsApp",
          text: "Tell us your departure and destination cities, outbound and return dates, number of passengers and any preferred flight times.",
        },
        {
          title: "Written flight options",
          text: "We send several flight options with details and conditions in writing, so you can compare them without pressure.",
        },
        {
          title: "Confirm and share passenger details",
          text: "Once you choose, send each passenger's details as shown on their ID. We double-check the spelling of names before the ticket is issued.",
        },
        {
          title: "Receive your e-ticket and fly",
          text: "Your e-ticket arrives on WhatsApp. If questions come up before departure, our team is ready to help during office hours.",
        },
      ],
    },
  },
} satisfies ServiceInput;
