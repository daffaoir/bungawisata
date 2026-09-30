import { images } from "@/content/images";
import type { ServiceInput } from "@/lib/content-schema";

export const privateTour = {
  slug: "private-tour",
  icon: "heart",
  heroImage: images["jepang-fuji"],
  relatedPackages: ["jepang-7d6n", "korea-selatan-6d5n", "turki-9d8n"],
  whatsappMessage: {
    id: "Halo Bunga Wisata, saya ingin tanya private tour untuk keluarga/pasangan kami. Rencana tujuan dan tanggalnya: ",
    en: "Hello Bunga Wisata, I'd like to ask about a private tour for my family/partner. Planned destination and dates: ",
  },
  faq: [
    {
      id: "private-beda-open-trip",
      question: {
        id: "Apa bedanya private tour dengan ikut rombongan umum?",
        en: "How is a private tour different from joining a general group?",
      },
      answer: {
        id: "Private tour hanya berisi keluarga atau grup Anda sendiri. Tanggal berangkat, urutan kunjungan, lama di setiap tempat, dan pilihan hotel bisa disesuaikan dengan keinginan Anda, tanpa harus mengikuti jadwal orang lain.",
        en: "A private tour includes only your own family or group. Departure dates, the order of visits, time spent at each place and hotel choices can all follow your preferences, without having to fit anyone else's schedule.",
      },
    },
    {
      id: "private-jumlah-kecil",
      question: {
        id: "Apakah private tour bisa untuk dua orang saja?",
        en: "Can a private tour be for just two people?",
      },
      answer: {
        id: "Bisa. Kami melayani pasangan, keluarga kecil, maupun grup teman. Silakan sampaikan jumlah dan komposisi peserta saat konsultasi agar kendaraan, kamar, dan kegiatannya kami sesuaikan.",
        en: "Yes. We serve couples, small families and groups of friends. Just tell us how many are travelling and who they are during the consultation, and we adjust vehicles, rooms and activities to match.",
      },
    },
    {
      id: "private-lansia-anak",
      question: {
        id: "Bagaimana kalau ada orang tua lanjut usia atau anak kecil?",
        en: "What if we are travelling with elderly parents or small children?",
      },
      answer: {
        id: "Justru itu salah satu alasan memilih private tour. Kami bisa mengatur ritme yang lebih santai, mengurangi perjalanan panjang dalam satu hari, dan memilih objek wisata yang mudah diakses. Ceritakan kebutuhan khusus keluarga Anda sejak awal.",
        en: "That is one of the best reasons to go private. We can set a gentler pace, cut down on long travel days and choose attractions that are easy to get around. Let us know about your family's particular needs from the start.",
      },
    },
    {
      id: "private-luar-negeri",
      question: {
        id: "Destinasi mana saja yang bisa dijadikan private tour?",
        en: "Which destinations are available as a private tour?",
      },
      answer: {
        id: "Paket di situs ini, baik dalam negeri maupun luar negeri seperti Jepang, Korea Selatan, dan Turki, bisa dijalankan sebagai private tour. Kami juga bisa menyusun rencana dari nol bila Anda punya tujuan sendiri.",
        en: "The packages on this site, both domestic and overseas such as Japan, South Korea and Turkey, can be run as a private tour. We can also build a plan from scratch if you have your own destination in mind.",
      },
    },
    {
      id: "private-ubah-jadwal",
      question: {
        id: "Apakah jadwal masih bisa diubah setelah itinerary disusun?",
        en: "Can the schedule still change after the itinerary is drafted?",
      },
      answer: {
        id: "Selama pemesanan belum dikonfirmasi, itinerary bebas direvisi sampai terasa pas. Setelah tiket dan hotel dipesan, perubahan tetap kami bantu sebisa mungkin, dan kami jelaskan dulu apa pengaruhnya terhadap pemesanan yang sudah ada.",
        en: "Until the booking is confirmed, the itinerary can be revised as often as you like. Once flights and hotels are booked, we still help with changes wherever possible and explain first how they affect the existing bookings.",
      },
    },
    {
      id: "private-cara-pesan",
      question: {
        id: "Bagaimana cara memesan private tour?",
        en: "How do I book a private tour?",
      },
      answer: {
        id: "Hubungi kami lewat WhatsApp 0812-3390-9129, Senin–Sabtu pukul 08.00–17.00. Sebutkan tujuan, tanggal yang diinginkan, jumlah peserta, dan gaya liburan yang Anda suka.",
        en: "Contact us on WhatsApp at 0812-3390-9129, Monday to Saturday, 08.00–17.00. Tell us your destination, preferred dates, number of travellers and the kind of holiday you enjoy.",
      },
    },
  ],
  content: {
    id: {
      name: "Private Tour",
      title: "Private tour keluarga & pasangan dari Malang",
      metaTitle: "Private Tour Keluarga dari Malang",
      metaDescription:
        "Private tour dari Malang untuk keluarga, pasangan, dan grup kecil. Jadwal fleksibel, itinerary disesuaikan, ke destinasi dalam negeri maupun Jepang, Korea, Turki.",
      summary:
        "Liburan khusus keluarga, pasangan, atau grup kecil dari Malang dengan jadwal fleksibel dan itinerary yang disusun mengikuti keinginan Anda.",
      intro: [
        "Tidak semua orang ingin berlibur dalam rombongan besar. Ada keluarga yang membawa orang tua lanjut usia, pasangan yang merayakan momen penting, atau sekelompok sahabat yang ingin jalan-jalan dengan ritme sendiri. Untuk mereka, Bunga Wisata menyiapkan private tour dari Malang: perjalanan yang hanya berisi orang-orang Anda, dengan jadwal yang bisa ditawar.",
        "Anda menentukan kapan berangkat, berapa lama tinggal di setiap kota, dan seberapa padat harinya. Mau lebih lama di pemandian air panas Jepang, menambah hari di Seoul, atau menikmati balon udara di Cappadocia tanpa terburu-buru? Kami susun rencananya, lalu mengurus detail yang biasanya merepotkan kalau berangkat sendiri.",
        "Karena grupnya kecil, perhatian kami juga lebih personal. Kebutuhan seperti makanan halal, kursi roda, atau kamar yang berdekatan bisa dibicarakan sejak awal. Kami juga memberi saran jujur bila rencana terlalu padat untuk anggota keluarga yang sudah sepuh atau masih kecil.",
      ],
      suitableForTitle: "Cocok untuk",
      suitableFor: [
        "Keluarga yang berlibur bersama anak kecil atau orang tua lanjut usia",
        "Pasangan yang merayakan bulan madu atau ulang tahun pernikahan",
        "Grup sahabat yang ingin jadwal santai tanpa ikut rombongan besar",
        "Wisatawan yang ingin ke luar negeri tetapi tidak mau repot mengurus sendiri",
        "Keluarga yang mencari tempat ibadah dan makanan halal selama perjalanan",
      ],
      weHandleTitle: "Yang kami urus",
      weHandle: [
        "Itinerary pribadi yang disusun sesuai minat dan ritme keluarga Anda",
        "Tiket pesawat dari Surabaya, Malang, atau Jakarta",
        "Hotel pilihan dengan tipe kamar yang cocok untuk keluarga atau pasangan",
        "Kendaraan dan pemandu lokal di destinasi",
        "Rekomendasi makanan halal dan waktu untuk ibadah di sela jadwal",
        "Penjelasan dokumen perjalanan untuk tujuan luar negeri",
      ],
      steps: [
        {
          title: "Cerita lewat WhatsApp",
          text: "Sampaikan siapa saja yang ikut, tujuan impian, tanggal yang memungkinkan, dan gaya liburan Anda, apakah santai, penuh petualangan, atau fokus kuliner.",
        },
        {
          title: "Itinerary pribadi tertulis",
          text: "Kami kirim rencana perjalanan hari per hari beserta penawaran tertulis. Anda bebas meminta perubahan sampai rencananya terasa pas.",
        },
        {
          title: "Konfirmasi",
          text: "Setelah Anda setuju, kami pesan tiket, hotel, dan kendaraan, lalu mengingatkan dokumen serta perlengkapan yang perlu disiapkan sebelum berangkat.",
        },
        {
          title: "Nikmati perjalanan",
          text: "Anda berangkat dengan jadwal sendiri, dan tim kami tetap bisa dihubungi lewat WhatsApp pada jam kerja bila ada yang perlu dibantu selama perjalanan.",
        },
      ],
    },
    en: {
      name: "Private Tours",
      title: "Private tours for families & couples from Malang",
      metaTitle: "Private Family Tours from Malang",
      metaDescription:
        "Private tours from Malang for families, couples and small groups. Flexible dates and tailored itineraries across Indonesia or to Japan, South Korea and Turkey.",
      summary:
        "Holidays just for your family, partner or small group from Malang, with flexible dates and an itinerary built around what you want to do.",
      intro: [
        "Not everyone wants to travel in a big group. Some families bring elderly parents along, some couples are celebrating a special moment, and some groups of friends simply want to explore at their own pace. For them, Bunga Wisata offers private tours from Malang: trips with only your own people and a schedule you can shape.",
        "You decide when to leave, how long to stay in each city and how full each day should be. Want longer at a Japanese hot spring, an extra day in Seoul, or a hot-air balloon morning in Cappadocia without rushing? We draft the plan, then handle the details that are usually a hassle when you travel on your own.",
        "Because the group is small, our attention is more personal too. Needs such as halal food, a wheelchair or rooms next to each other can be discussed right from the start. We will also tell you honestly if a plan looks too packed for older relatives or young children.",
      ],
      suitableForTitle: "Ideal for",
      suitableFor: [
        "Families travelling with small children or elderly parents",
        "Couples celebrating a honeymoon or wedding anniversary",
        "Groups of friends who want a relaxed pace without a large tour group",
        "Travellers heading abroad who would rather not organise everything themselves",
        "Families looking for places to pray and halal food along the way",
      ],
      weHandleTitle: "What we handle",
      weHandle: [
        "A personal itinerary built around your family's interests and pace",
        "Flight tickets from Surabaya, Malang or Jakarta",
        "Selected hotels with room types that suit families or couples",
        "Transport and local guides at the destination",
        "Halal food suggestions and time for prayers within the schedule",
        "Guidance on travel documents for overseas destinations",
      ],
      steps: [
        {
          title: "Tell us on WhatsApp",
          text: "Let us know who is coming, your dream destination, the dates that work and your travel style, whether relaxed, adventurous or food-focused.",
        },
        {
          title: "Written personal itinerary",
          text: "We send a day-by-day plan with a written quote. Feel free to ask for changes until the plan feels just right.",
        },
        {
          title: "Confirmation",
          text: "Once you agree, we book flights, hotels and transport, then remind you which documents and essentials to prepare before departure.",
        },
        {
          title: "Enjoy the trip",
          text: "You travel on your own schedule, and our team stays reachable on WhatsApp during office hours if you need a hand on the road.",
        },
      ],
    },
  },
} satisfies ServiceInput;
