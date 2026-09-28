import { notFound } from "next/navigation";

/**
 * Menangkap semua path yang tidak dikenal di bawah `[locale]`, lalu memanggil
 * `notFound()` supaya yang tampil adalah `[locale]/not-found.tsx` bermerek
 * (dengan header, footer, dan bahasa yang benar) — bukan 404 bawaan Next.
 * Tanpa rute ini, path tak dikenal tidak pernah masuk ke segmen `[locale]`.
 */
export default function CatchAllPage() {
  notFound();
}
