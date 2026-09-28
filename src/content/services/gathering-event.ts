import { images } from "@/content/images";
import type { ServiceInput } from "@/lib/content-schema";

export const gatheringEvent = {
  slug: "gathering-event",
  icon: "party-popper",
  heroImage: images["bali-pantai-senja"],
  relatedPackages: ["bali-4d3n", "lombok-gili-4d3n", "labuan-bajo-4d3n"],
  whatsappMessage: {
    id: "Halo Bunga Wisata, saya ingin tanya paket gathering/outing untuk kantor kami. Rencana lokasi dan perkiraan jumlah pesertanya: ",
    en: "Hello Bunga Wisata, I'd like to ask about a gathering/outing for our company. Planned location and estimated number of participants: ",
  },
  faq: [
    {
      id: "gathering-lokasi",
      question: {
        id: "Di mana saja gathering bisa diadakan?",
        en: "Where can a gathering be held?",
      },
      answer: {
        id: "Banyak kantor memilih kawasan Malang–Batu karena dekat dan sejuk, cukup untuk acara sehari atau menginap semalam. Untuk suasana yang berbeda, gathering bisa digabung dengan liburan ke luar kota seperti Bali, Lombok, atau Labuan Bajo. Kami bantu menimbang pilihan sesuai waktu dan anggaran.",
        en: "Many companies choose the Malang–Batu area because it is close and cool, ideal for a day event or a one-night stay. For a change of scene, a gathering can be combined with a trip out of town to Bali, Lombok or Labuan Bajo. We help you weigh the options against your time and budget.",
      },
    },
    {
      id: "gathering-acara",
      question: {
        id: "Apakah Bunga Wisata juga mengatur susunan acaranya?",
        en: "Do you also help with the event programme?",
      },
      answer: {
        id: "Kami bantu menyusun rundown dan mengatur kebutuhan acara seperti tempat, konsumsi, dan kegiatan outbound atau games. Isi acara internal, misalnya sambutan direksi atau pembagian penghargaan karyawan, tetap dipegang panitia kantor, dan kami sesuaikan jadwal perjalanan di sekitarnya.",
        en: "We help draft the rundown and arrange event needs such as the venue, catering and outbound activities or games. Internal content, such as speeches from management or staff awards, stays with your organising team, and we plan the travel schedule around it.",
      },
    },
    {
      id: "gathering-keluarga",
      question: {
        id: "Bisakah keluarga karyawan ikut dalam family gathering?",
        en: "Can employees' families join a family gathering?",
      },
      answer: {
        id: "Bisa. Untuk family gathering kami memperhitungkan peserta anak-anak dan orang tua, misalnya dengan memilih kegiatan yang ramah semua usia, jadwal yang tidak terlalu padat, dan pembagian kamar per keluarga.",
        en: "Yes. For a family gathering we plan around children and older travellers, for example by choosing activities suitable for all ages, a relaxed schedule and room allocation by family.",
      },
    },
    {
      id: "gathering-kendaraan",
      question: {
        id: "Apakah transportasi dari kantor ke lokasi acara sudah termasuk?",
        en: "Is transport from the office to the venue included?",
      },
      answer: {
        id: "Kami bisa mengatur bus pariwisata dari kantor Anda ke lokasi acara dan kembali lagi. Apa saja yang termasuk akan tertulis jelas di penawaran, sehingga panitia tidak perlu menebak-nebak.",
        en: "We can arrange tour coaches from your office to the venue and back. Everything that is included is written clearly in the quote, so the organisers never have to guess.",
      },
    },
    {
      id: "gathering-cuaca",
      question: {
        id: "Bagaimana kalau cuaca tidak mendukung pada hari acara?",
        en: "What if the weather turns bad on the day of the event?",
      },
      answer: {
        id: "Untuk acara di alam terbuka, kami biasanya menyiapkan rencana cadangan sejak awal, misalnya area beratap atau urutan kegiatan yang bisa ditukar. Dengan begitu panitia tidak perlu panik bila hujan turun, dan acara inti tetap bisa berjalan.",
        en: "For outdoor events we usually prepare a backup plan from the start, such as a covered area or activities that can be swapped around. That way the organisers need not panic if it rains, and the main programme can still go ahead.",
      },
    },
    {
      id: "gathering-cara-pesan",
      question: {
        id: "Bagaimana memulai perencanaan gathering?",
        en: "How do we start planning a gathering?",
      },
      answer: {
        id: "Kirim pesan WhatsApp ke 0812-3390-9129 (Senin–Sabtu, 08.00–17.00) berisi perkiraan tanggal, jumlah peserta, lama acara, dan suasana yang diinginkan. Dari situ kami susun usulan pertama.",
        en: "Send a WhatsApp message to 0812-3390-9129 (Monday to Saturday, 08.00–17.00) with rough dates, number of participants, event length and the atmosphere you want. We build a first proposal from there.",
      },
    },
  ],
  content: {
    id: {
      name: "Gathering & Event",
      title: "Gathering Kantor & Event dari Malang",
      metaTitle: "Gathering Kantor & Event dari Malang",
      metaDescription:
        "Outing dan gathering kantor, family gathering, serta event outbound di Malang–Batu atau luar kota. Bunga Wisata mengatur transportasi, hotel, konsumsi, dan acara.",
      summary:
        "Outing kantor, family gathering, dan outbound di Malang–Batu atau luar kota, dengan transportasi, penginapan, konsumsi, dan rundown yang diatur rapi.",
      intro: [
        "Gathering kantor yang berhasil membuat tim pulang dengan cerita, bukan dengan keluhan soal bus terlambat atau makan siang yang kurang. Bunga Wisata membantu perusahaan dan instansi di Malang merancang outing, family gathering, dan event outbound yang lancar, sehingga panitia bisa fokus pada tujuan acaranya: mempererat tim.",
        "Kawasan Malang–Batu, tempat kantor kami berada, adalah pilihan praktis untuk acara sehari atau menginap semalam dengan udara sejuk dan banyak pilihan tempat. Kalau perusahaan ingin suasana yang lebih istimewa, gathering bisa dipadukan dengan perjalanan ke Bali, Lombok, atau Labuan Bajo.",
        "Kami mengatur hal-hal teknis yang sering menyita waktu panitia: kendaraan, penginapan, konsumsi, tempat acara, dan kegiatan outbound. Semua dirangkum dalam satu penawaran tertulis yang mudah diajukan ke manajemen.",
      ],
      suitableForTitle: "Cocok untuk",
      suitableFor: [
        "Outing tahunan dan team building karyawan kantor atau pabrik",
        "Family gathering yang mengajak pasangan dan anak-anak karyawan",
        "Rapat kerja atau kick-off yang digabung dengan rekreasi",
        "Reuni alumni, komunitas, dan organisasi yang ingin acara bersama",
        "Perusahaan yang ingin memberi perjalanan apresiasi untuk tim",
      ],
      weHandleTitle: "Yang kami urus",
      weHandle: [
        "Bus pariwisata dari kantor ke lokasi acara dan kembali",
        "Pilihan lokasi acara dan penginapan di Malang–Batu atau luar kota",
        "Konsumsi selama acara, dari coffee break sampai makan malam bersama",
        "Kegiatan outbound dan games yang disesuaikan dengan peserta",
        "Rundown perjalanan yang menyatu dengan acara internal perusahaan",
        "Tour leader yang menjaga jadwal tetap berjalan di lapangan",
        "Tiket pesawat grup bila gathering diadakan di luar pulau",
      ],
      steps: [
        {
          title: "Konsultasi kebutuhan acara",
          text: "Ceritakan jenis acara, jumlah peserta, lama kegiatan, dan suasana yang diinginkan lewat WhatsApp. Kami beri gambaran pilihan lokasi yang masuk akal.",
        },
        {
          title: "Penawaran & rundown tertulis",
          text: "Kami kirim usulan rundown, lokasi, penginapan, dan konsumsi dengan rincian yang termasuk, siap diajukan ke manajemen untuk persetujuan.",
        },
        {
          title: "Konfirmasi dan finalisasi",
          text: "Setelah disetujui, kami amankan lokasi, kendaraan, dan penginapan, lalu menyelaraskan jadwal dengan acara internal yang disiapkan panitia kantor.",
        },
        {
          title: "Hari pelaksanaan",
          text: "Crew dan tour leader hadir sejak penjemputan, mengawal jadwal di lokasi, dan memastikan seluruh peserta kembali dengan selamat ke titik awal.",
        },
      ],
    },
    en: {
      name: "Gatherings & Events",
      title: "Company Gatherings & Events from Malang",
      metaTitle: "Company Gatherings & Events from Malang",
      metaDescription:
        "Company outings, family gatherings and outbound events in Malang–Batu or further afield. We arrange transport, accommodation, catering and the event programme.",
      summary:
        "Company outings, family gatherings and outbound events in Malang–Batu or out of town, with transport, accommodation, catering and rundown neatly arranged.",
      intro: [
        "A good company gathering sends the team home with stories, not complaints about a late coach or a skimpy lunch. Bunga Wisata helps companies and agencies in Malang plan outings, family gatherings and outbound events that run smoothly, so the organisers can focus on what the event is really for: bringing the team closer.",
        "The Malang–Batu area, where our office is, is a practical choice for a one-day event or an overnight stay, with cool air and plenty of venues. If your company wants something more special, the gathering can be combined with a trip to Bali, Lombok or Labuan Bajo.",
        "We take care of the technical details that usually eat up the organisers' time: vehicles, accommodation, catering, venues and outbound activities. Everything is summarised in one written quote that is easy to submit to management.",
      ],
      suitableForTitle: "Ideal for",
      suitableFor: [
        "Annual outings and team building for office or factory staff",
        "Family gatherings that bring along employees' partners and children",
        "Work meetings or kick-offs combined with some leisure time",
        "Alumni reunions, communities and organisations holding a joint event",
        "Companies rewarding their team with an appreciation trip",
      ],
      weHandleTitle: "What we handle",
      weHandle: [
        "Tour coaches from your office to the venue and back",
        "Venue and accommodation options in Malang–Batu or out of town",
        "Catering throughout the event, from coffee breaks to a shared dinner",
        "Outbound activities and games suited to your participants",
        "A travel rundown that fits around your internal company programme",
        "A tour leader who keeps the schedule on track on the ground",
        "Group flight tickets if the gathering takes place on another island",
      ],
      steps: [
        {
          title: "Talk through the event",
          text: "Tell us on WhatsApp what kind of event it is, how many people are coming, how long it runs and the mood you want. We suggest realistic venue options.",
        },
        {
          title: "Written quote & rundown",
          text: "We send a proposed rundown, venue, accommodation and catering with a breakdown of what is included, ready to submit to management for approval.",
        },
        {
          title: "Confirm and finalise",
          text: "Once approved, we secure the venue, vehicles and accommodation, then align the schedule with the internal programme your organising team is preparing.",
        },
        {
          title: "Event day",
          text: "Our crew and tour leader are there from pick-up, keep the schedule running at the venue and make sure every participant gets safely back to the starting point.",
        },
      ],
    },
  },
} satisfies ServiceInput;
