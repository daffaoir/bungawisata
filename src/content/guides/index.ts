import type { GuideInput } from "@/lib/content-schema";
import { bromoDariMalang } from "./bromo-dari-malang";
import { persiapanStudyTourSekolah } from "./persiapan-study-tour-sekolah";
import { tipsTourRombonganKantor } from "./tips-tour-rombongan-kantor";
import { tourLuarNegeriPertama } from "./tour-luar-negeri-pertama";

/**
 * Daftar artikel panduan (`/panduan/[slug]`), ditampilkan terbaru di atas.
 *
 * Menambah artikel: salin salah satu file di folder ini, isi kedua bahasa,
 * lalu impor dan daftarkan di sini.
 */
export const guideList: GuideInput[] = [
  bromoDariMalang,
  tipsTourRombonganKantor,
  persiapanStudyTourSekolah,
  tourLuarNegeriPertama,
];
