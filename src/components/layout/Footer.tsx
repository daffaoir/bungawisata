import { Mail, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { site } from "@/content/site";
import { getPathname, Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./nav-items";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tWa = useTranslations("WhatsApp");
  const locale = useLocale() as AppLocale;
  const year = new Date().getFullYear();
  /*
   * Tautan region sengaja `<a>` biasa (navigasi penuh), bukan `Link`:
   * `PackageBrowser` membaca filter dari URL hanya saat mount, jadi navigasi
   * client-side dari `/paket` ke `/paket?region=…` tidak akan memperbarui
   * filternya.
   */
  const packagesPath = getPathname({ href: "/paket", locale });

  return (
    <footer className="bg-daun text-canvas">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-[1.8] text-canvas/75">
              {t("about")}
            </p>
            <p className="mt-5 font-display text-base text-gold-300 italic">
              &ldquo;{site.tagline}&rdquo;
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h3 id="footer-nav" className="font-display text-lg text-gold-300">
              {t("navTitle")}
            </h3>
            <ul className="mt-3 text-[0.95rem]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-300 hover:text-canvas"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-packages">
            <h3 id="footer-packages" className="font-display text-lg text-gold-300">
              {t("packagesTitle")}
            </h3>
            <ul className="mt-3 text-[0.95rem]">
              <li>
                <a
                  href={`${packagesPath}?region=dalam-negeri`}
                  className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-300 hover:text-canvas"
                >
                  {t("domestic")}
                </a>
              </li>
              <li>
                <a
                  href={`${packagesPath}?region=luar-negeri`}
                  className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-300 hover:text-canvas"
                >
                  {t("international")}
                </a>
              </li>
              <li>
                <Link
                  href="/panduan"
                  className="inline-flex min-h-11 items-center text-canvas/80 transition-colors duration-300 hover:text-canvas"
                >
                  {tNav("guides")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-lg text-gold-300">{t("contactTitle")}</h3>
            <ul className="mt-5 space-y-5 text-[0.95rem] text-canvas/80">
              <li>
                <a
                  href={buildWhatsAppUrl(tWa("generic"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-3 flex items-start gap-3 py-3 transition-colors duration-300 hover:text-canvas"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-wa" />
                  <span>{site.phoneDisplay}</span>
                </a>
              </li>
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="-my-3 flex items-start gap-3 py-3 transition-colors duration-300 hover:text-canvas"
                  >
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-gold-400"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span>{site.email}</span>
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-gold-400"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <address className="leading-[1.7] not-italic">
                  {site.address.street}
                  <br />
                  {site.address.area}
                  <br />
                  {site.address.city}, {site.address.province}{" "}
                  {site.address.postalCode}
                </address>
              </li>
              <li className="ps-7 text-[0.875rem] text-canvas/75">
                {site.hours[0].days[locale]}, {site.hours[0].time}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-canvas/15 pt-8 pb-20 text-[0.85rem] sm:pb-0 text-canvas/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t("rights")}
          </p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
