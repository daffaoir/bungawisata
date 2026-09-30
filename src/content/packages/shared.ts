import type { AppLocale } from "@/i18n/routing";

/**
 * Teks yang berulang di banyak paket. Ditaruh di satu tempat supaya kalau
 * kebijakan berubah — misalnya kalimat soal hotel setaraf — tidak perlu
 * menyunting empat belas berkas.
 */

/**
 * Catatan tetap untuk paket luar negeri: harga indikatif, keberangkatan bisa
 * diatur dari kota lain, dan hotel bisa diganti yang setaraf.
 */
export const INTERNATIONAL_NOTE: Record<AppLocale, string> = {
  id:
    "Harga bersifat indikatif dan masih mengikuti kurs, tarif penerbangan, serta musim ramai. " +
    "Keberangkatan dapat diatur dari kota asal lain. Sebutkan kota Anda saat bertanya, " +
    "nanti kami hitungkan selisih tiketnya. Hotel yang disebutkan adalah acuan; " +
    "bila penuh, kami ganti dengan hotel setaraf di area yang sama.",
  en:
    "Prices are indicative and still move with exchange rates, airfares, and peak seasons. " +
    "Departure can be arranged from another home city. Tell us yours when you enquire and " +
    "we will quote the fare difference. The hotels listed are a reference; if they are full " +
    "we substitute a hotel of a similar standard in the same area.",
};

/**
 * Tambahan untuk paket dalam negeri yang harus diawali penerbangan (Toba,
 * Labuan Bajo, Lombok, Raja Ampat): pelanggan kebanyakan dari Malang dan
 * sekitarnya, jadi sebutkan bandara terdekat tanpa menjanjikan maskapai.
 */
export const FLIGHT_FROM_EAST_JAVA_NOTE: Record<AppLocale, string> = {
  id:
    "Penerbangan menuju kota awal tur dari Surabaya (Juanda) atau Malang (Abdul Rachman Saleh) " +
    "bisa kami bantu atur; jadwal dan tarif mengikuti ketersediaan saat pemesanan.",
  en:
    "Flights to the starting city from Surabaya (Juanda) or Malang (Abdul Rachman Saleh) can be " +
    "arranged on request; schedules and fares depend on availability at the time of booking.",
};

/**
 * Catatan tetap untuk paket dalam negeri. Tidak menyinggung kurs, tapi tetap
 * menegaskan bahwa tiket pesawat menuju kota awal tur ditanggung terpisah.
 */
export const DOMESTIC_NOTE: Record<AppLocale, string> = {
  id:
    "Harga bersifat indikatif dan belum termasuk tiket pesawat menuju kota awal tur. " +
    "Urutan kunjungan dapat menyesuaikan cuaca dan lalu lintas tanpa mengurangi jumlah destinasi. " +
    "Hotel yang disebutkan adalah acuan; bila penuh, kami ganti dengan hotel setaraf.",
  en:
    "Prices are indicative and exclude flights to the city where the tour starts. " +
    "The order of visits may shift with weather and traffic, without reducing the number of " +
    "destinations. The hotels listed are a reference; if they are full we substitute an " +
    "equivalent one.",
};
