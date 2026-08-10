import type { PackageInput } from "@/lib/schema";

import { bali4d3n } from "./bali-4d3n";
import { bangkokPattaya4d3n } from "./bangkok-pattaya-4d3n";
import { bromoIjen4d3n } from "./bromo-ijen-4d3n";
import { danauToba4d3n } from "./danau-toba-4d3n";
import { dubaiAbuDhabi5d4n } from "./dubai-abu-dhabi-5d4n";
import { jepang7d6n } from "./jepang-7d6n";
import { koreaSelatan6d5n } from "./korea-selatan-6d5n";
import { labuanBajo4d3n } from "./labuan-bajo-4d3n";
import { lombokGili4d3n } from "./lombok-gili-4d3n";
import { rajaAmpat6d5n } from "./raja-ampat-6d5n";
import { singapuraMalaysia4d3n } from "./singapura-malaysia-4d3n";
import { turki9d8n } from "./turki-9d8n";
import { vietnam5d4n } from "./vietnam-5d4n";
import { yogyakarta3d2n } from "./yogyakarta-3d2n";

/**
 * Daftar semua paket wisata.
 *
 * Menambah paket baru:
 *   1. Salin salah satu file di folder ini sebagai titik awal.
 *   2. Isi kedua bahasa (`content.id` dan `content.en`) — build akan gagal
 *      kalau salah satunya tertinggal, jumlah harinya tidak sama, atau daftar
 *      `meals` per hari berbeda antarbahasa.
 *   3. Pastikan total `nights` di `hotels` sama dengan `durationNights`.
 *   4. Impor dan daftarkan di array ini.
 *
 * Urutan array menentukan urutan tampil default di halaman katalog:
 * dalam negeri lebih dulu, lalu luar negeri, masing-masing dari yang
 * paling sering diminta.
 */
export const packageList: PackageInput[] = [
  // Dalam negeri
  bali4d3n,
  labuanBajo4d3n,
  yogyakarta3d2n,
  bromoIjen4d3n,
  lombokGili4d3n,
  danauToba4d3n,
  rajaAmpat6d5n,

  // Luar negeri
  bangkokPattaya4d3n,
  singapuraMalaysia4d3n,
  vietnam5d4n,
  koreaSelatan6d5n,
  jepang7d6n,
  turki9d8n,
  dubaiAbuDhabi5d4n,
];
