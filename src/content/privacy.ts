import type { AppLocale } from "@/i18n/routing";

export type PrivacySection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Kebijakan privasi (UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi).
 *
 * Isinya harus sesuai perilaku situs yang sebenarnya: satu cookie bahasa
 * `NEXT_LOCALE`, Cloudflare Web Analytics tanpa cookie, peta Google di
 * `/kontak`, form yang hanya menyusun pesan WhatsApp. Kalau menambah analytics
 * bercookie, form yang menyimpan data, atau layanan pihak ketiga lain, perbarui
 * bagian terkait dan `PRIVACY_UPDATED_AT`.
 *
 * Draf ditulis 2026-10-01 dan masih menunggu review pemilik usaha (lihat
 * `docs/KONTEN-PLACEHOLDER.md`). Kontak dan alamat dirender dari
 * `src/content/site.ts` oleh halaman, bukan ditulis di sini.
 */
export const PRIVACY_UPDATED_AT = "2026-10-01";

export const privacy: Record<
  AppLocale,
  { intro: string; sections: PrivacySection[] }
> = {
  id: {
    intro:
      "Halaman ini menjelaskan data pribadi apa yang kami terima saat Anda memakai situs ini atau menghubungi kami, untuk apa data itu dipakai, dan hak Anda atas data tersebut sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
    sections: [
      {
        heading: "Siapa kami",
        paragraphs: [
          "Situs ini dikelola oleh CV. Bunga Wisata Malang (\"Bunga Wisata\", \"kami\"). Untuk data yang Anda kirimkan kepada kami, kami bertindak sebagai pengendali data pribadi.",
        ],
      },
      {
        heading: "Data yang kami terima",
        paragraphs: [
          "Situs ini tidak memiliki akun, login, atau pembayaran online. Form \"minta penawaran\" hanya menyusun pesan WhatsApp di browser Anda. Isinya tidak dikirim ke server kami dan baru sampai kepada kami kalau Anda sendiri mengirim pesan itu.",
          "Data yang kami terima adalah data yang Anda berikan lewat WhatsApp, telepon, atau email, misalnya:",
        ],
        list: [
          "Nama dan nomor WhatsApp atau email Anda.",
          "Rencana perjalanan: tujuan, tanggal, jumlah peserta, kota penjemputan, dan anggaran.",
          "Saat memesan: data peserta yang diperlukan untuk tiket, hotel, asuransi, atau visa, seperti nama sesuai identitas, tanggal lahir, dan nomor paspor.",
          "Bukti pembayaran dan riwayat transaksi.",
        ],
      },
      {
        heading: "Untuk apa data dipakai",
        paragraphs: [
          "Kami memakai data tersebut untuk menyusun penawaran, memproses pemesanan, menghubungi Anda tentang perjalanan, dan memenuhi kewajiban pembukuan serta hukum. Kami tidak menjual data pribadi dan tidak mengirim promosi tanpa persetujuan Anda.",
        ],
      },
      {
        heading: "Pihak lain yang menerima data",
        paragraphs: [
          "Data peserta hanya kami teruskan kepada pihak yang diperlukan untuk menjalankan perjalanan Anda, sebatas yang mereka butuhkan:",
        ],
        list: [
          "Maskapai, hotel, penyedia transportasi, dan pemandu lokal.",
          "Perusahaan asuransi perjalanan, kalau perjalanan Anda memakai asuransi.",
          "Kedutaan atau agen pengurusan visa, untuk paket luar negeri yang memerlukan visa.",
          "WhatsApp (Meta) sebagai sarana komunikasi; pesan Anda juga tunduk pada kebijakan privasi WhatsApp.",
        ],
      },
      {
        heading: "Cookie, analitik, dan hosting",
        paragraphs: [
          "Situs ini memasang satu cookie, NEXT_LOCALE, untuk mengingat bahasa yang Anda pilih. Kami tidak memakai cookie iklan atau pelacak.",
          "Jumlah kunjungan dihitung dengan Cloudflare Web Analytics, yang tidak memakai cookie dan tidak melacak pengunjung secara individual. Situs di-hosting di Cloudflare, yang memproses alamat IP untuk mengirim halaman dan menjaga keamanan.",
          "Peta di halaman Kontak dimuat dari Google Maps. Google dapat memproses data Anda sesuai kebijakan privasinya sendiri saat peta itu tampil.",
        ],
      },
      {
        heading: "Berapa lama data disimpan",
        paragraphs: [
          "Kami menyimpan data selama diperlukan untuk menyelesaikan perjalanan Anda, lalu selama diwajibkan oleh aturan pembukuan dan perpajakan. Data yang tidak lagi diperlukan kami hapus.",
        ],
      },
      {
        heading: "Keamanan data",
        paragraphs: [
          "Akses ke data pemesanan dibatasi pada staf yang menangani perjalanan Anda. Kami hanya meminta data yang benar-benar dibutuhkan untuk perjalanan tersebut.",
        ],
      },
      {
        heading: "Hak Anda",
        paragraphs: [
          "Sesuai UU Pelindungan Data Pribadi, Anda berhak untuk:",
        ],
        list: [
          "Mengetahui data apa yang kami simpan dan untuk apa.",
          "Mengakses dan mendapatkan salinan data Anda.",
          "Memperbaiki data yang keliru atau tidak lengkap.",
          "Meminta data Anda dihapus, kecuali yang wajib kami simpan menurut hukum.",
          "Menarik persetujuan dan mengajukan keberatan atas pemrosesan data.",
        ],
      },
      {
        heading: "Perubahan kebijakan",
        paragraphs: [
          "Kebijakan ini dapat kami perbarui bila cara kerja situs atau layanan kami berubah. Tanggal pembaruan terakhir tercantum di bagian atas halaman ini.",
        ],
      },
    ],
  },
  en: {
    intro:
      "This page explains what personal data we receive when you use this site or contact us, what we use it for, and your rights over that data under Indonesia's Personal Data Protection Law (Law No. 27 of 2022).",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "This site is run by CV. Bunga Wisata Malang (\"Bunga Wisata\", \"we\"). For the data you send us, we act as the personal data controller.",
        ],
      },
      {
        heading: "Data we receive",
        paragraphs: [
          "This site has no accounts, logins, or online payments. The \"request a quote\" form only drafts a WhatsApp message in your browser. Nothing is sent to our servers; it only reaches us if you send that message yourself.",
          "The data we receive is what you give us on WhatsApp, by phone, or by email, for example:",
        ],
        list: [
          "Your name and WhatsApp number or email address.",
          "Your travel plans: destination, dates, group size, pick-up city, and budget.",
          "When booking: traveller details needed for tickets, hotels, insurance, or visas, such as the name on your ID, date of birth, and passport number.",
          "Proof of payment and transaction history.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use this data to prepare quotes, process bookings, contact you about your trip, and meet our bookkeeping and legal obligations. We do not sell personal data, and we do not send promotions without your consent.",
        ],
      },
      {
        heading: "Who else receives it",
        paragraphs: [
          "We only pass traveller data to parties needed to run your trip, and only what they need:",
        ],
        list: [
          "Airlines, hotels, transport providers, and local guides.",
          "Travel insurers, if your trip includes insurance.",
          "Embassies or visa agents, for international packages that need a visa.",
          "WhatsApp (Meta) as our messaging channel; your messages are also covered by WhatsApp's privacy policy.",
        ],
      },
      {
        heading: "Cookies, analytics, and hosting",
        paragraphs: [
          "This site sets one cookie, NEXT_LOCALE, to remember your chosen language. We do not use advertising or tracking cookies.",
          "Visits are counted with Cloudflare Web Analytics, which uses no cookies and does not track individual visitors. The site is hosted on Cloudflare, which processes IP addresses to deliver pages and keep the site secure.",
          "The map on the Contact page is loaded from Google Maps. Google may process your data under its own privacy policy when the map is shown.",
        ],
      },
      {
        heading: "How long we keep data",
        paragraphs: [
          "We keep data for as long as needed to complete your trip, and then for as long as bookkeeping and tax rules require. Data we no longer need is deleted.",
        ],
      },
      {
        heading: "Keeping data safe",
        paragraphs: [
          "Access to booking data is limited to the staff handling your trip. We only ask for data that is genuinely needed for that trip.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["Under the Personal Data Protection Law, you have the right to:"],
        list: [
          "Know what data we hold and why.",
          "Access and get a copy of your data.",
          "Correct data that is wrong or incomplete.",
          "Ask us to delete your data, except what we must keep by law.",
          "Withdraw consent and object to the processing of your data.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy when the site or our services change. The date of the last update is shown at the top of this page.",
        ],
      },
    ],
  },
};
