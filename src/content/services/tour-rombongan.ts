import { images } from "@/content/images";
import type { ServiceInput } from "@/lib/content-schema";

export const tourRombongan = {
  slug: "tour-rombongan",
  icon: "users",
  heroImage: images["umum-rombongan"],
  relatedPackages: ["bromo-ijen-4d3n", "bali-4d3n", "bangkok-pattaya-4d3n"],
  whatsappMessage: {
    id: "Halo Bunga Wisata, saya ingin tanya tour rombongan untuk kantor/komunitas kami. Tujuan dan perkiraan jumlah pesertanya: ",
    en: "Hello Bunga Wisata, I'd like to ask about a group tour for our office/community. Destination and estimated group size: ",
  },
  faq: [
    {
      id: "rombongan-jumlah-peserta",
      question: {
        id: "Berapa orang yang bisa ikut dalam satu rombongan?",
        en: "How many people can join one group tour?",
      },
      answer: {
        id: "Tidak ada ukuran baku. Kami menyesuaikan kendaraan, hotel, dan tempat makan dengan jumlah peserta yang Anda sampaikan. Semakin cepat perkiraan jumlah peserta diketahui, semakin mudah kami mengamankan bus dan kamar yang cocok, terutama di musim liburan.",
        en: "There is no fixed size. We match vehicles, hotels and restaurants to the headcount you give us. The sooner we know your estimated numbers, the easier it is to secure suitable coaches and rooms, especially during the holiday season.",
      },
    },
    {
      id: "rombongan-titik-jemput",
      question: {
        id: "Apakah rombongan bisa dijemput di luar kantor Bunga Wisata?",
        en: "Can the group be picked up somewhere other than your office?",
      },
      answer: {
        id: "Bisa. Kantor kami ada di rest area Jl. Raya Karangjuwet No. 6, Karangploso, di jalur Malang–Batu, tetapi titik kumpul biasanya kami atur di lokasi yang paling praktis bagi rombongan, misalnya kantor Anda, sekolah, atau tempat ibadah. Sebutkan titik jemput saat konsultasi agar masuk ke itinerary.",
        en: "Yes. Our office is at the rest area on Jl. Raya Karangjuwet No. 6, Karangploso, on the Malang–Batu road, but we usually set the meeting point wherever suits the group best, such as your office, a school or a place of worship. Mention your pick-up point during the consultation so it goes into the itinerary.",
      },
    },
    {
      id: "rombongan-luar-negeri",
      question: {
        id: "Apakah tour rombongan ke luar negeri juga dilayani?",
        en: "Do you also run group tours abroad?",
      },
      answer: {
        id: "Ya. Selain destinasi dalam negeri seperti Bromo, Bali, dan Yogyakarta, kami juga mengatur rombongan ke luar negeri, misalnya Thailand, Singapura–Malaysia, atau Jepang. Kami bantu menjelaskan dokumen yang perlu disiapkan peserta dan mengatur tiket pesawat grup.",
        en: "Yes. Besides domestic destinations such as Bromo, Bali and Yogyakarta, we also arrange groups travelling abroad, for example to Thailand, Singapore–Malaysia or Japan. We explain which documents each traveller needs and arrange group flight tickets.",
      },
    },
    {
      id: "rombongan-ubah-itinerary",
      question: {
        id: "Bisakah itinerary paket diubah sesuai keinginan rombongan?",
        en: "Can a package itinerary be changed to suit our group?",
      },
      answer: {
        id: "Bisa. Paket di situs ini adalah titik awal. Rombongan boleh menambah atau mengurangi objek wisata, mengganti tempat makan, atau menggeser jadwal. Kami akan menyampaikan penyesuaiannya secara tertulis sebelum Anda konfirmasi.",
        en: "Yes. The packages on this site are a starting point. Your group can add or drop attractions, swap restaurants or shift the schedule. We will send the adjustments in writing before you confirm.",
      },
    },
    {
      id: "rombongan-cara-pesan",
      question: {
        id: "Bagaimana cara memesan tour rombongan?",
        en: "How do we book a group tour?",
      },
      answer: {
        id: "Semua pemesanan dan konsultasi lewat WhatsApp 0812-3390-9129, Senin–Sabtu pukul 08.00–17.00. Kirim tujuan, perkiraan tanggal, dan jumlah peserta; kami balas dengan penawaran dan itinerary tertulis.",
        en: "All bookings and consultations go through WhatsApp at 0812-3390-9129, Monday to Saturday, 08.00–17.00. Send your destination, rough dates and headcount, and we reply with a written quote and itinerary.",
      },
    },
  ],
  content: {
    id: {
      name: "Tour Rombongan",
      title: "Tour Rombongan dari Malang",
      metaTitle: "Tour Rombongan dari Malang",
      metaDescription:
        "Tour rombongan dari Malang untuk kantor, komunitas, keluarga besar, dan arisan. Domestik maupun luar negeri, bus pariwisata, tour leader, konsultasi via WhatsApp.",
      summary:
        "Wisata bersama kantor, komunitas, keluarga besar, atau arisan dari Malang, ke destinasi dalam negeri maupun luar negeri, diatur dari berangkat sampai pulang.",
      intro: [
        "Mengurus liburan untuk banyak orang sekaligus jarang sederhana. Ada bus yang harus pas dengan jumlah peserta, kamar hotel yang perlu dibagi, jam makan yang harus tepat, dan satu grup chat yang tak berhenti bertanya. Bunga Wisata Tour and Travel membantu panitia di Malang dan sekitarnya menyusun semua itu menjadi satu rencana perjalanan yang jelas, sehingga Anda bisa ikut menikmati liburannya.",
        "Kami melayani tour rombongan untuk kantor, komunitas, keluarga besar, paguyuban, sampai arisan, baik ke destinasi dalam negeri seperti Bromo, Bali, dan Yogyakarta maupun ke luar negeri seperti Thailand dan Singapura. Kantor kami berada di rest area Karangploso, di jalur Malang–Batu, sehingga mudah dikunjungi kalau panitia ingin berdiskusi langsung.",
        "Pelanggan kami di Google sering menyebut crew yang ramah dan on time, bus yang nyaman, tour leader yang sabar, serta harga yang terjangkau. Itu pula yang kami jaga untuk setiap rombongan, besar maupun kecil.",
      ],
      suitableForTitle: "Cocok untuk",
      suitableFor: [
        "Rekreasi tahunan karyawan kantor, pabrik, atau instansi di Malang Raya",
        "Komunitas hobi, paguyuban, dan organisasi yang ingin jalan-jalan bersama",
        "Keluarga besar yang berkumpul saat libur sekolah atau Lebaran",
        "Kelompok arisan dan pengajian yang merencanakan wisata bersama",
        "Rombongan yang ingin mencoba tour luar negeri pertama kali bersama pendamping",
      ],
      weHandleTitle: "Yang kami urus",
      weHandle: [
        "Bus pariwisata atau kendaraan yang disesuaikan dengan jumlah peserta",
        "Hotel dan pembagian kamar sesuai daftar peserta dari panitia",
        "Tiket masuk objek wisata dan jadwal kunjungan yang realistis",
        "Tempat makan untuk rombongan, termasuk menu yang sesuai kebutuhan peserta",
        "Tour leader yang mendampingi rombongan selama perjalanan",
        "Tiket pesawat grup untuk tujuan yang jauh atau luar negeri",
        "Penjelasan dokumen perjalanan untuk tour luar negeri",
      ],
      steps: [
        {
          title: "Konsultasi lewat WhatsApp",
          text: "Ceritakan tujuan, perkiraan tanggal, jumlah peserta, dan titik jemput rombongan. Kami bantu memilih destinasi yang cocok dengan waktu dan anggaran panitia.",
        },
        {
          title: "Penawaran & itinerary tertulis",
          text: "Kami kirim itinerary hari per hari beserta rincian kendaraan, hotel, makan, dan apa saja yang sudah termasuk, sehingga mudah dibagikan ke peserta atau atasan.",
        },
        {
          title: "Konfirmasi rombongan",
          text: "Setelah panitia setuju, kami kunci kendaraan, hotel, dan tiket. Daftar peserta dan pembagian kamar bisa menyusul, dan kami ingatkan apa saja yang perlu disiapkan.",
        },
        {
          title: "Berangkat bersama",
          text: "Pada hari keberangkatan crew dan tour leader menjemput rombongan di titik kumpul, lalu mendampingi sampai kembali ke Malang.",
        },
      ],
    },
    en: {
      name: "Group Tours",
      title: "Group Tours from Malang",
      metaTitle: "Group Tours from Malang",
      metaDescription:
        "Group tours from Malang for offices, communities, extended families and social clubs. Domestic and overseas trips with coaches, tour leaders and WhatsApp support.",
      summary:
        "Trips for offices, communities, extended families and social clubs from Malang, to destinations in Indonesia or abroad, handled from departure to return.",
      intro: [
        "Organising a holiday for a lot of people at once is rarely simple. The coach has to fit the headcount, hotel rooms need to be shared out, meals have to run on time, and the group chat never stops asking questions. Bunga Wisata Tour and Travel helps organisers in Malang and the surrounding area turn all of that into one clear travel plan, so you can enjoy the trip too.",
        "We run group tours for offices, communities, extended families, associations and social clubs such as arisan groups, both to Indonesian destinations like Bromo, Bali and Yogyakarta and abroad to places like Thailand and Singapore. Our office sits at the Karangploso rest area on the Malang–Batu road, so it is easy to drop by if the organising team wants to talk things through in person.",
        "Our Google reviewers often mention friendly, punctual crew, comfortable coaches, patient tour leaders and fair prices. That is what we keep up for every group, large or small.",
      ],
      suitableForTitle: "Ideal for",
      suitableFor: [
        "Annual staff trips for offices, factories or agencies in Greater Malang",
        "Hobby communities, associations and organisations travelling together",
        "Extended families getting together during school holidays or Eid",
        "Arisan and religious study groups planning a shared trip",
        "Groups trying their first overseas tour with someone to guide them",
      ],
      weHandleTitle: "What we handle",
      weHandle: [
        "Tour coaches or other vehicles sized to your headcount",
        "Hotels and room allocation based on the organiser's passenger list",
        "Attraction tickets and a realistic visiting schedule",
        "Group-friendly restaurants, including menus that suit your travellers",
        "A tour leader who accompanies the group throughout the trip",
        "Group flight tickets for long-distance or overseas destinations",
        "Guidance on travel documents for overseas tours",
      ],
      steps: [
        {
          title: "Consult on WhatsApp",
          text: "Tell us the destination, rough dates, group size and pick-up point. We help you choose a destination that fits the organisers' time and budget.",
        },
        {
          title: "Written quote & itinerary",
          text: "We send a day-by-day itinerary with details of transport, hotels, meals and exactly what is included, so it is easy to share with travellers or management.",
        },
        {
          title: "Confirm the group",
          text: "Once the organisers agree, we lock in vehicles, hotels and tickets. The passenger list and room allocation can follow later, and we remind you of what still needs preparing.",
        },
        {
          title: "Travel together",
          text: "On departure day our crew and tour leader pick the group up at the meeting point and stay with you until you are back in Malang.",
        },
      ],
    },
  },
} satisfies ServiceInput;
