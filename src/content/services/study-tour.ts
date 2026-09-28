import { images } from "@/content/images";
import type { ServiceInput } from "@/lib/content-schema";

export const studyTour = {
  slug: "study-tour",
  icon: "graduation-cap",
  heroImage: images["yogya-borobudur"],
  relatedPackages: ["yogyakarta-3d2n", "bali-4d3n", "bromo-ijen-4d3n"],
  whatsappMessage: {
    id: "Halo Bunga Wisata, saya dari pihak sekolah/kampus dan ingin tanya study tour untuk siswa kami. Tujuan dan perkiraan jumlah pesertanya: ",
    en: "Hello Bunga Wisata, I'm contacting you on behalf of a school/university and would like to ask about a study tour for our students. Destination and estimated group size: ",
  },
  faq: [
    {
      id: "study-tour-tujuan",
      question: {
        id: "Tujuan study tour apa saja yang bisa diatur dari Malang?",
        en: "Which study tour destinations can you arrange from Malang?",
      },
      answer: {
        id: "Yang paling sering dipilih sekolah adalah Yogyakarta (Borobudur, Prambanan, museum, dan kampus), Bali (budaya dan desa wisata), serta Bromo untuk belajar geografi dan alam. Tujuan lain bisa didiskusikan sesuai kurikulum dan waktu yang tersedia.",
        en: "Schools most often choose Yogyakarta (Borobudur, Prambanan, museums and universities), Bali (culture and tourism villages) and Bromo for geography and nature. Other destinations can be discussed to fit your curriculum and available time.",
      },
    },
    {
      id: "study-tour-keamanan",
      question: {
        id: "Bagaimana keamanan siswa dijaga selama perjalanan?",
        en: "How do you keep students safe during the trip?",
      },
      answer: {
        id: "Tour leader kami bekerja sama dengan guru pendamping: mengatur titik kumpul, menghitung ulang peserta di setiap perpindahan, dan menyepakati aturan jam malam di hotel. Jadwal disusun tidak terlalu padat agar siswa cukup istirahat, dan guru selalu tahu posisi rombongan.",
        en: "Our tour leader works alongside the accompanying teachers: setting meeting points, recounting students at every transfer and agreeing on curfew rules at the hotel. The schedule is kept from getting too packed so students rest properly, and teachers always know where the group is.",
      },
    },
    {
      id: "study-tour-edukatif",
      question: {
        id: "Apakah itinerary bisa dikaitkan dengan materi pelajaran?",
        en: "Can the itinerary be linked to classroom subjects?",
      },
      answer: {
        id: "Bisa. Sampaikan tema atau mata pelajaran yang ingin didukung, misalnya sejarah, seni budaya, atau IPA. Kami sesuaikan urutan kunjungan dan memberi waktu yang cukup di lokasi agar siswa bisa mengerjakan tugas atau laporan kunjungan.",
        en: "Yes. Tell us the theme or subject you want to support, such as history, arts and culture or science. We adjust the order of visits and allow enough time at each site for students to complete assignments or visit reports.",
      },
    },
    {
      id: "study-tour-dokumen-panitia",
      question: {
        id: "Apakah ada dokumen yang bisa dipakai untuk rapat dengan orang tua?",
        en: "Do you provide documents we can use for a parents' meeting?",
      },
      answer: {
        id: "Ada. Penawaran dan itinerary kami kirim secara tertulis, lengkap dengan rincian yang sudah termasuk. Dokumen itu bisa dipakai panitia dan kepala sekolah untuk sosialisasi kepada orang tua atau wali mahasiswa.",
        en: "Yes. We send the quote and itinerary in writing, with a full breakdown of what is included. Organisers and the principal can use them to brief parents or guardians.",
      },
    },
    {
      id: "study-tour-kesehatan",
      question: {
        id: "Bagaimana jika ada siswa yang sakit selama perjalanan?",
        en: "What if a student falls ill during the trip?",
      },
      answer: {
        id: "Kami minta sekolah mencatat kondisi kesehatan khusus siswa sebelum berangkat. Bila ada yang sakit di jalan, tour leader membantu guru mencari apotek atau fasilitas kesehatan terdekat dan menyesuaikan jadwal rombongan bila perlu.",
        en: "We ask the school to note any particular health conditions before departure. If a student falls ill on the road, the tour leader helps the teachers find the nearest pharmacy or clinic and adjusts the group's schedule if needed.",
      },
    },
    {
      id: "study-tour-cara-pesan",
      question: {
        id: "Kapan sebaiknya sekolah mulai menghubungi kami?",
        en: "When should a school start contacting you?",
      },
      answer: {
        id: "Sebaiknya sejak rencana study tour mulai dibahas di sekolah, karena bus dan hotel di musim karya wisata cepat penuh. Hubungi kami lewat WhatsApp 0812-3390-9129, Senin–Sabtu pukul 08.00–17.00.",
        en: "Ideally as soon as the study tour is first discussed at school, because coaches and hotels fill up quickly during school trip season. Reach us on WhatsApp at 0812-3390-9129, Monday to Saturday, 08.00–17.00.",
      },
    },
  ],
  content: {
    id: {
      name: "Study Tour",
      title: "Study Tour Sekolah & Kampus dari Malang",
      metaTitle: "Study Tour Sekolah & Kampus dari Malang",
      metaDescription:
        "Study tour dan karya wisata sekolah atau kampus dari Malang ke Yogyakarta, Bali, dan Bromo. Itinerary edukatif, koordinasi dengan guru, tour leader pendamping.",
      summary:
        "Karya wisata sekolah dan kampus dari Malang ke Yogyakarta, Bali, atau Bromo dengan itinerary edukatif dan koordinasi erat bersama guru serta panitia.",
      intro: [
        "Study tour adalah pengalaman yang diingat siswa bertahun-tahun, tetapi bagi guru dan panitia, persiapannya bisa melelahkan. Harus ada izin orang tua, anggaran yang masuk akal, jadwal yang aman, dan kunjungan yang benar-benar bernilai belajar. Bunga Wisata membantu sekolah dan kampus di Malang menyusun karya wisata yang tertata dari awal sampai siswa kembali ke sekolah.",
        "Destinasi yang paling sering kami atur adalah Yogyakarta dengan Borobudur, Prambanan, dan museumnya; Bali dengan budaya dan desa wisatanya; serta Bromo untuk belajar tentang gunung api dan alam Jawa Timur. Itinerary kami susun bersama guru, supaya setiap kunjungan terhubung dengan materi yang sedang dipelajari.",
        "Selama perjalanan, tour leader kami bekerja berdampingan dengan guru pendamping. Guru tetap memegang kendali atas siswa, sementara urusan kendaraan, hotel, makan, dan tiket masuk menjadi tanggung jawab kami.",
      ],
      suitableForTitle: "Cocok untuk",
      suitableFor: [
        "SD, SMP, dan SMA/SMK yang merencanakan karya wisata atau perpisahan kelas",
        "Pondok pesantren dan madrasah dengan kegiatan rihlah atau studi lapangan",
        "Jurusan atau himpunan mahasiswa yang mengadakan kunjungan industri dan studi banding",
        "Guru dan komite sekolah yang butuh rencana tertulis untuk disosialisasikan ke orang tua",
      ],
      weHandleTitle: "Yang kami urus",
      weHandle: [
        "Bus pariwisata sesuai jumlah siswa dan guru pendamping",
        "Hotel dengan pembagian kamar yang memisahkan siswa dan guru sesuai kebutuhan",
        "Itinerary edukatif yang disusun bersama guru dan panitia",
        "Tiket masuk candi, museum, dan objek wisata lain",
        "Jadwal makan rombongan yang teratur di setiap hari perjalanan",
        "Tour leader yang membantu guru mengatur titik kumpul dan menghitung peserta",
        "Dokumen penawaran dan itinerary tertulis untuk rapat sekolah dan orang tua",
      ],
      steps: [
        {
          title: "Konsultasi dengan panitia",
          text: "Guru atau panitia menghubungi kami lewat WhatsApp dengan tujuan, jenjang siswa, perkiraan jumlah peserta, dan tanggal yang dipertimbangkan sekolah.",
        },
        {
          title: "Penawaran & itinerary tertulis",
          text: "Kami kirim usulan itinerary edukatif dan rincian biaya tertulis yang siap dibawa ke rapat sekolah atau pertemuan dengan orang tua siswa.",
        },
        {
          title: "Konfirmasi sekolah",
          text: "Setelah sekolah setuju, kami amankan bus, hotel, dan tiket masuk, lalu menyepakati data peserta, pembagian kamar, dan aturan selama perjalanan bersama guru.",
        },
        {
          title: "Berangkat karya wisata",
          text: "Crew menjemput di sekolah, tour leader mendampingi sepanjang perjalanan, dan rombongan diantar kembali ke sekolah sesuai jadwal yang sudah diinformasikan ke orang tua.",
        },
      ],
    },
    en: {
      name: "Study Tours",
      title: "School & University Study Tours from Malang",
      metaTitle: "Study Tours from Malang",
      metaDescription:
        "School and university study tours from Malang to Yogyakarta, Bali and Bromo. Educational itineraries, close coordination with teachers and tour leader support.",
      summary:
        "School and university study trips from Malang to Yogyakarta, Bali or Bromo, with educational itineraries and close coordination with teachers and organisers.",
      intro: [
        "A study tour is something students remember for years, but for teachers and organisers the preparation can be exhausting. You need parental consent, a sensible budget, a safe schedule and visits that genuinely teach something. Bunga Wisata helps schools and universities in Malang plan field trips that stay organised from the first meeting until the students are back at school.",
        "The destinations we arrange most often are Yogyakarta, with Borobudur, Prambanan and its museums; Bali, with its culture and tourism villages; and Bromo, for learning about volcanoes and the nature of East Java. We build the itinerary together with teachers, so every visit connects to what students are studying.",
        "Throughout the trip our tour leader works side by side with the accompanying teachers. Teachers stay in charge of the students, while transport, hotels, meals and entrance tickets are our responsibility.",
      ],
      suitableForTitle: "Ideal for",
      suitableFor: [
        "Primary, junior and senior high schools planning a field trip or farewell trip",
        "Islamic boarding schools and madrasahs with study trips or field visits",
        "University departments and student associations running industry or benchmarking visits",
        "Teachers and school committees who need a written plan to share with parents",
      ],
      weHandleTitle: "What we handle",
      weHandle: [
        "Tour coaches sized for the students and accompanying teachers",
        "Hotels with room allocation that separates students and teachers as needed",
        "An educational itinerary developed with teachers and organisers",
        "Entrance tickets for temples, museums and other attractions",
        "Regular group meals on every day of the trip",
        "A tour leader who helps teachers manage meeting points and headcounts",
        "Written quotes and itineraries for school and parent meetings",
      ],
      steps: [
        {
          title: "Consult with the organisers",
          text: "A teacher or organiser messages us on WhatsApp with the destination, student level, estimated group size and the dates the school is considering.",
        },
        {
          title: "Written quote & itinerary",
          text: "We send a proposed educational itinerary and a written cost breakdown, ready to take into a school meeting or a session with parents.",
        },
        {
          title: "School confirmation",
          text: "Once the school agrees, we secure coaches, hotels and entrance tickets, then agree on the student list, room allocation and trip rules with the teachers.",
        },
        {
          title: "Off on the field trip",
          text: "Our crew picks everyone up at school, the tour leader stays with the group throughout, and students are brought back to school on the schedule parents were given.",
        },
      ],
    },
  },
} satisfies ServiceInput;
