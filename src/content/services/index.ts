import type { ServiceInput } from "@/lib/content-schema";
import { gatheringEvent } from "./gathering-event";
import { privateTour } from "./private-tour";
import { studyTour } from "./study-tour";
import { tiketPesawat } from "./tiket-pesawat";
import { tourRombongan } from "./tour-rombongan";

/**
 * Daftar halaman layanan (`/layanan/[slug]`). Urutan array = urutan tampil.
 *
 * Menambah layanan: salin salah satu file di folder ini, isi kedua bahasa,
 * lalu impor dan daftarkan di sini. Build gagal kalau bentuknya salah atau
 * `relatedPackages` merujuk paket yang tidak ada.
 */
export const serviceList: ServiceInput[] = [
  tourRombongan,
  studyTour,
  gatheringEvent,
  privateTour,
  tiketPesawat,
];
