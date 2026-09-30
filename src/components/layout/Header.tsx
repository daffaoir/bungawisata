import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS } from "./nav-items";
import { NavLink } from "./NavLink";

/**
 * Tombol WhatsApp sengaja tidak ada di sini — tombol mengambang di pojok
 * kanan bawah sudah menyediakan tautan yang sama di setiap halaman.
 */
export function Header() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 bg-canvas/85 backdrop-blur-lg">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t("home")} className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{t(item.key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-3 lg:ms-0">
          <span className="hidden sm:block">
            <LocaleSwitcher />
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
