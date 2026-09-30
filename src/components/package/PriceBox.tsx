import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonAnchor } from "@/components/shared/Button";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { buildItineraryFilename } from "@/lib/itinerary-pdf";
import type { Package } from "@/lib/schema";
import { itineraryPdfPath } from "@/lib/static-files";

/**
 * PDF-nya berkas statis buatan `scripts/generate-static-files.mts`, jadi
 * tautannya cukup `<a download>` biasa, tanpa JavaScript dan tanpa status
 * memuat. Nilai `download` memberi nama berkas yang rapi (tautan satu origin).
 */
function pdfLink(pkg: Package, locale: AppLocale) {
  return {
    href: itineraryPdfPath(locale, pkg.slug),
    download: buildItineraryFilename(pkg, locale),
  };
}

/**
 * Fakta kunci paket — sumber bersama untuk kotak harga (desktop) dan blok
 * fakta ringkas di bawah ringkasan (ponsel).
 */
function usePackageFacts(pkg: Package) {
  const t = useTranslations("PackageDetail");
  const tCommon = useTranslations("Common");

  return [
    {
      label: t("durationLabel"),
      value: tCommon("duration", {
        days: pkg.durationDays,
        nights: pkg.durationNights,
      }),
    },
    { label: t("destinationLabel"), value: pkg.destination },
    { label: t("departureLabel"), value: pkg.departureFrom },
    ...(pkg.airline ? [{ label: t("airlineLabel"), value: pkg.airline }] : []),
    { label: t("minPaxLabel"), value: t("minPaxValue", { count: pkg.minPax }) },
  ];
}

/**
 * Di bawah `lg` kotak harga baru muncul setelah rundown yang panjang, jadi
 * fakta kuncinya ditampilkan lebih awal di sini. Desktop tidak butuh ini —
 * kotak harga sticky sudah ada di samping.
 */
export function PackageFacts({
  pkg,
  className,
}: {
  pkg: Package;
  className?: string;
}) {
  const rows = usePackageFacts(pkg);

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-5 rounded-3xl bg-canvas-alt p-5 lg:hidden",
        className,
      )}
    >
      {rows.map((row) => (
        <div key={row.label} className="min-w-0">
          <dt className="text-[0.75rem] text-ink-muted">{row.label}</dt>
          <dd className="mt-1 text-[0.95rem] font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PriceBox({ pkg }: { pkg: Package }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("PackageDetail");
  const tCommon = useTranslations("Common");
  const content = pkg.content[locale];
  const rows = usePackageFacts(pkg);

  return (
    <div className="rounded-[2rem] bg-canvas-alt p-7">
      <p className="text-[0.95rem] text-ink-muted">{t("priceLabel")}</p>
      <p className="mt-1 font-display text-[2.25rem] leading-none font-medium text-ink">
        {formatPrice(pkg.priceFrom, locale)}
      </p>
      <p className="mt-2 text-[0.9rem] text-ink-muted">
        {tCommon("perPerson")}
        {pkg.priceIsEstimate ? `, ${tCommon("estimate")}` : null}
      </p>

      <dl className="mt-6 space-y-3.5 rounded-2xl bg-canvas p-5 text-[0.925rem]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="shrink-0 text-ink-muted">{row.label}</dt>
            <dd className="text-end font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <WhatsAppCta
        packageTitle={content.title}
        size="lg"
        className="mt-8 w-full"
      />

      <ButtonAnchor
        {...pdfLink(pkg, locale)}
        target="_self"
        rel=""
        variant="outline"
        className="mt-3 w-full"
      >
        <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
        {t("downloadPdf")}
      </ButtonAnchor>

      <p className="mt-5 text-[0.85rem] leading-[1.6] text-ink-muted">
        {pkg.priceIsEstimate ? t("priceNoteEstimate") : t("priceNote")}
      </p>
    </div>
  );
}

/**
 * Versi ringkas yang menempel di bawah layar pada mobile.
 *
 * Atribut `data-sticky-cta` dipakai aturan CSS di `globals.css` untuk
 * menyembunyikan tombol WhatsApp mengambang selama bilah ini tampil —
 * keduanya mengarah ke tujuan yang sama, jadi tidak perlu berebut ruang.
 */
export function StickyPriceBar({ pkg }: { pkg: Package }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("PackageDetail");
  const tCommon = useTranslations("Common");
  const content = pkg.content[locale];

  return (
    <div
      data-sticky-cta
      className="fixed inset-x-2 bottom-2 z-30 rounded-3xl bg-canvas/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(42,31,22,0.5)] ring-1 ring-ink/10 backdrop-blur-lg lg:hidden"
    >
      {/*
        Harga tidak boleh terpotong: kiri dibiarkan selebar isinya
        (`whitespace-nowrap`), kanan cukup tombol PDF ikon 44px dan tombol
        WhatsApp berlabel pendek. Muat untuk harga terpanjang di layar 320px.
      */}
      <div className="flex items-center justify-between gap-3">
        <div className="shrink-0">
          <p className="text-[0.75rem] whitespace-nowrap text-ink-muted">
            {tCommon("startingFrom")}
            {pkg.priceIsEstimate ? `, ${tCommon("estimate")}` : null}
          </p>
          <p className="font-display text-[1.15rem] font-medium whitespace-nowrap text-ink">
            {formatPrice(pkg.priceFrom, locale)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            {...pdfLink(pkg, locale)}
            aria-label={t("downloadPdf")}
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </a>

          <WhatsAppCta
            packageTitle={content.title}
            label={t("askShort")}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
