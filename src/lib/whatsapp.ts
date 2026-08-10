import { WHATSAPP_NUMBER } from "@/content/site";

/**
 * Membangun tautan wa.me dengan pesan yang sudah terisi.
 *
 * Teks pesannya sengaja diterima sebagai argumen (bukan dirakit di sini)
 * supaya fungsi ini tetap murni dan pemanggilnya bebas memakai terjemahan
 * next-intl sesuai bahasa yang sedang aktif.
 */
export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = WHATSAPP_NUMBER,
): string {
  const digits = phoneNumber.replace(/\D/g, "");

  if (!digits) {
    throw new Error(
      "Nomor WhatsApp kosong. Set NEXT_PUBLIC_WHATSAPP_NUMBER atau perbaiki WHATSAPP_NUMBER di src/content/site.ts",
    );
  }

  const trimmed = message.trim();

  return trimmed
    ? `https://wa.me/${digits}?text=${encodeURIComponent(trimmed)}`
    : `https://wa.me/${digits}`;
}
