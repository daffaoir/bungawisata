import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.businessName,
    short_name: site.name,
    description:
      "Tour & travel di Malang: paket tour rombongan, study tour, gathering, dan private tour dalam & luar negeri.",
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf8",
    theme_color: "#b08d57",
    lang: "id",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
