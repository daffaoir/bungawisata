import { Mail, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
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

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-[1.8] text-white/60">
              {t("about")}
            </p>
            <p className="mt-5 font-display text-sm text-gold-400 italic">
              &ldquo;{site.tagline}&rdquo;
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h3 id="footer-nav" className="eyebrow text-gold-400">
              {t("navTitle")}
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-packages">
            <h3 id="footer-packages" className="eyebrow text-gold-400">
              {t("packagesTitle")}
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <Link
                  href={{ pathname: "/paket", query: { region: "dalam-negeri" } }}
                  className="text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {t("domestic")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/paket", query: { region: "luar-negeri" } }}
                  className="text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {t("international")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-gold-400">{t("contactTitle")}</h3>
            <ul className="mt-6 space-y-5 text-sm text-white/65">
              <li>
                <a
                  href={buildWhatsAppUrl(tWa("generic"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors duration-300 hover:text-white"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-[#25D366]" />
                  <span>{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-gold-400"
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <span>{site.email}</span>
                </a>
              </li>
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
              <li className="ps-7 text-xs text-white/45">
                {site.hours[0].days[locale]} · {site.hours[0].time}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t("rights")}
          </p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
