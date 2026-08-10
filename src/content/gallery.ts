import type { AppLocale } from "@/i18n/routing";
import { images } from "./images";

export type GalleryItem = {
  src: string;
  caption: Record<AppLocale, string>;
  /** Rasio kolom di grid masonry-like; 2 berarti selebar dua kolom. */
  span?: 1 | 2;
};

/**
 * Foto galeri.
 *
 * Keterangannya sengaja menyebut tempatnya saja, bukan "rombongan kami di …",
 * karena foto-foto ini masih stok Unsplash. Begitu dokumentasi perjalanan asli
 * tersedia, ganti `src` lewat `src/content/images.ts` lalu keterangannya boleh
 * diubah menjadi cerita perjalanan yang sebenarnya.
 */
export const gallery: GalleryItem[] = [
  {
    src: images["turki-cappadocia"],
    caption: {
      id: "Balon udara di atas Cappadocia, Türkiye",
      en: "Hot-air balloons over Cappadocia, Türkiye",
    },
    span: 2,
  },
  {
    src: images["komodo-padar"],
    caption: {
      id: "Puncak Pulau Padar, Labuan Bajo",
      en: "The viewpoint on Padar Island, Labuan Bajo",
    },
  },
  {
    src: images["jepang-fushimi-inari"],
    caption: {
      id: "Lorong torii Fushimi Inari, Kyoto",
      en: "The torii corridor at Fushimi Inari, Kyoto",
    },
  },
  {
    src: images["bali-pantai-senja"],
    caption: {
      id: "Senja di pantai barat Bali",
      en: "Sunset on Bali's west coast",
    },
    span: 2,
  },
  {
    src: images["raja-ampat-piaynemo"],
    caption: {
      id: "Gugusan karst Piaynemo, Raja Ampat",
      en: "The Piaynemo karst cluster, Raja Ampat",
    },
  },
  {
    src: images["korea-gyeongbokgung"],
    caption: {
      id: "Istana Gyeongbokgung, Seoul",
      en: "Gyeongbokgung Palace, Seoul",
    },
  },
  {
    src: images["vietnam-ha-long"],
    caption: {
      id: "Teluk Ha Long, Vietnam",
      en: "Ha Long Bay, Vietnam",
    },
    span: 2,
  },
  {
    src: images["korea-nami"],
    caption: {
      id: "Barisan pohon di Pulau Nami",
      en: "The tree-lined path on Nami Island",
    },
  },
  {
    src: images["bangkok-wat-arun"],
    caption: {
      id: "Wat Arun di tepi Sungai Chao Phraya, Bangkok",
      en: "Wat Arun on the Chao Phraya River, Bangkok",
    },
  },
  {
    src: images["bromo-lanskap"],
    caption: {
      id: "Kaldera Bromo dari Penanjakan",
      en: "The Bromo caldera seen from Penanjakan",
    },
    span: 2,
  },
  {
    src: images["dubai-gurun"],
    caption: {
      id: "Dune bashing di gurun Dubai",
      en: "Dune bashing in the Dubai desert",
    },
  },
  {
    src: images["yogya-borobudur"],
    caption: {
      id: "Candi Borobudur, Magelang",
      en: "Borobudur Temple, Magelang",
    },
  },
];
