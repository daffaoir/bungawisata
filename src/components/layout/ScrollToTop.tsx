"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Memaksa halaman kembali ke paling atas setiap kali path berubah.
 *
 * `html { scroll-behavior: smooth }` di `globals.css` disengaja untuk
 * kompensasi tautan anchor (lihat `scroll-padding-top` di sana), tapi properti
 * itu ikut membuat reset-scroll bawaan Next.js setelah navigasi jadi animasi
 * — dan animasi itu bisa berhenti di tengah jalan (mis. karena pergeseran
 * layout saat gambar/font baru dimuat), sehingga halaman baru mendarat di
 * tengah, bukan di atas. `behavior: "instant"` di sini sengaja melewati CSS
 * itu sepenuhnya.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
