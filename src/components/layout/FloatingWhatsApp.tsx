import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Tombol WhatsApp yang ikut mengambang di semua halaman. Ini satu-satunya
 * tautan WhatsApp yang selalu terlihat — navbar sengaja tidak punya duplikat.
 *
 * Hijau khas WhatsApp (#25D366) supaya langsung dikenali. Di ponsel berupa
 * lingkaran; di layar lebar menjadi pil berlabel. Teksnya cokelat soga
 * (kontras 8,2:1 di atas hijau). Berdenyut sekali setelah 3 detik.
 *
 * Di halaman detail paket pada layar kecil, tombol ini disembunyikan oleh
 * aturan `:has([data-sticky-cta])` di `globals.css` karena bilah CTA sticky
 * di sana sudah menyediakan tautan yang sama. Aturan serupa
 * (`:has([data-mobile-nav-open])`) menyembunyikannya selagi menu mobile
 * terbuka.
 */
export function FloatingWhatsApp() {
  const t = useTranslations("WhatsApp");
  const label = t("floatingLabel");

  return (
    <a
      data-floating-wa
      href={buildWhatsAppUrl(t("generic"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="wa-nudge group fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center gap-2 rounded-full bg-wa text-ink shadow-[0_18px_40px_-18px_rgba(42,31,22,0.75)] transition-[background-color,scale] duration-300 hover:bg-[#2ee073] active:scale-95 sm:right-6 sm:bottom-6 lg:size-auto lg:min-h-14 lg:ps-5 lg:pe-6"
    >
      <WhatsAppIcon className="size-7 lg:size-6" />
      <span aria-hidden="true" className="hidden text-[0.95rem] font-semibold lg:inline">
        {label}
      </span>
    </a>
  );
}
