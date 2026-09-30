import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Tombol WhatsApp yang ikut mengambang di semua halaman. Ini satu-satunya
 * tautan WhatsApp yang selalu terlihat — navbar sengaja tidak punya duplikat.
 *
 * Hijau khas WhatsApp (#25D366) supaya langsung dikenali. Berupa lingkaran;
 * saat di-hover (desktop) labelnya memanjang ke kiri. Teksnya cokelat soga
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
      className="wa-nudge group fixed right-4 bottom-4 z-50 flex h-14 min-w-14 items-center justify-end rounded-full bg-wa ps-3.5 pe-3.5 text-ink shadow-[0_18px_40px_-18px_rgba(42,31,22,0.75)] transition-[background-color,scale] duration-300 hover:bg-[#2ee073] active:scale-95 sm:right-6 sm:bottom-6"
    >
      {/* Label memanjang ke kiri hanya saat di-hover (desktop), supaya
          tombolnya tidak menutupi kolom konten di tepi kanan. */}
      <span
        aria-hidden="true"
        className="max-w-0 overflow-hidden text-[0.95rem] font-semibold whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-500 ease-out-soft [@media(hover:hover)]:group-hover:me-2 [@media(hover:hover)]:group-hover:max-w-[16rem] [@media(hover:hover)]:group-hover:opacity-100"
      >
        {label}
      </span>
      <WhatsAppIcon className="size-7 shrink-0" />
    </a>
  );
}
