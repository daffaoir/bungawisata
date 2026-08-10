import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Tombol WhatsApp yang ikut mengambang di semua halaman. Ini satu-satunya
 * tautan WhatsApp yang selalu terlihat — navbar sengaja tidak punya duplikat.
 *
 * Bentuknya lingkaran hijau khas WhatsApp (#25D366) dengan ikon putih — pola
 * baku yang paling dikenali, satu-satunya tempat di situs yang keluar dari
 * palet monokrom.
 *
 * Di halaman detail paket pada layar kecil, tombol ini disembunyikan oleh
 * aturan `:has([data-sticky-cta])` di `globals.css` karena bilah CTA sticky
 * di sana sudah menyediakan tautan yang sama.
 */
export function FloatingWhatsApp() {
  const t = useTranslations("WhatsApp");

  return (
    <a
      data-floating-wa
      href={buildWhatsAppUrl(t("generic"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatingLabel")}
      className="group fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-16px_rgba(15,15,15,0.7)] transition-colors duration-300 hover:bg-[#1DA851]"
    >
      <WhatsAppIcon className="size-7 transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
