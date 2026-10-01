import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { JsonLd } from "@/components/shared/JsonLd";
import { CF_BEACON_TOKEN, SITE_URL } from "@/content/site";
import { routing } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/jsonld";
import { OG_IMAGE_SIZE, ogImagePath } from "@/lib/static-files";
import "../globals.css";

// Serif variabel dengan sumbu SOFT (ujung huruf membulat) untuk judul.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
): Promise<Metadata> {
  const { locale: requested } = await props.params;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });
  // Dibuat `scripts/generate-static-files.mts`; halaman yang tidak mengisi
  // `images` sendiri mewarisi gambar ini lewat `buildOpenGraph`.
  const ogImage = {
    url: ogImagePath(locale),
    ...OG_IMAGE_SIZE,
    alt: t("siteName"),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Wajib agar seluruh Server Component di bawah layout ini bisa dirender
  // statis saat build, bukan per-request.
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "Meta" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Entitas bisnis dirender sekali di sini, jadi ada di semua halaman. */}
        <JsonLd data={organizationJsonLd(tMeta("defaultDescription"))} />
        <NextIntlClientProvider>
          <ScrollToTop />
          {/* Lompat dari navigasi langsung ke isi halaman (pengguna keyboard). */}
          <a
            href="#konten"
            className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas transition-transform focus:translate-y-[env(safe-area-inset-top,0px)]"
          >
            {tCommon("skipToContent")}
          </a>
          <Header />
          <main id="konten" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        {/*
          Cloudflare Web Analytics: tanpa cookie, jadi tidak perlu banner
          izin. Hanya dipasang bila tokennya diisi, jadi `next dev` dan
          preview lokal tidak mengirim data.
        */}
        {CF_BEACON_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        ) : null}
      </body>
    </html>
  );
}
