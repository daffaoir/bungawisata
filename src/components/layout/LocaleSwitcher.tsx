"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LABEL: Record<AppLocale, string> = { id: "ID", en: "EN" };

/**
 * Berpindah bahasa tanpa keluar dari halaman yang sedang dibuka:
 * `/paket/turki-9d8n` ⇄ `/en/packages/turki-9d8n`.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: AppLocale) {
    if (locale === activeLocale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl memvalidasi bahwa `params` cocok
        // dengan `pathname`. Untuk halaman yang sedang aktif keduanya selalu
        // cocok, jadi pemeriksaan runtime bisa dilewati.
        { pathname, params },
        { locale },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={cn(
        "inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.12em]",
        isPending && "opacity-50",
        className,
      )}
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === activeLocale;

        return (
          <span key={locale} className="inline-flex items-center gap-3">
            {index > 0 ? (
              <span aria-hidden="true" className="h-3 w-px bg-line" />
            ) : null}

            <button
              type="button"
              onClick={() => switchTo(locale)}
              aria-pressed={isActive}
              disabled={isPending}
              className={cn(
                "transition-colors duration-300",
                isActive
                  ? "text-ink underline decoration-gold-600 decoration-2 underline-offset-[6px]"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              <span aria-hidden="true">{LABEL[locale]}</span>
              <span className="sr-only">
                {locale === "id" ? t("languageId") : t("languageEn")}
              </span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
