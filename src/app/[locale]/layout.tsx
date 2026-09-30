import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_URL } from "@/content/site";
import { routing } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/jsonld";
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
  const { locale } = await props.params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Meta" });

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
    },
    twitter: {
      card: "summary_large_image",
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        {/*
          Vercel Web Analytics: tanpa cookie, jadi tidak perlu banner izin.
          Versi `/react`, bukan `/next`: versi Next memakai `useSearchParams`
          yang membuat setiap halaman statis punya bailout ke client
          rendering. Skripnya tetap mencatat perpindahan halaman sendiri.
        */}
        <Analytics />
      </body>
    </html>
  );
}
