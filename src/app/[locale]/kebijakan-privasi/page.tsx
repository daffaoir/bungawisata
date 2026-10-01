import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { PRIVACY_UPDATED_AT, privacy } from "@/content/privacy";
import { site } from "@/content/site";
import { routing, type AppLocale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  breadcrumbItems,
  buildAlternates,
  buildOpenGraph,
} from "@/lib/metadata";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/kebijakan-privasi">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/kebijakan-privasi", locale as AppLocale),
    openGraph: await buildOpenGraph("/kebijakan-privasi", locale as AppLocale, {
      title: t("title"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

/**
 * Halaman teks biasa dengan lebar baca yang sama seperti artikel panduan.
 * Isinya di `src/content/privacy.ts`; kontak diambil dari `site` supaya
 * tidak ada nomor/alamat yang ditulis dua kali.
 */
export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/kebijakan-privasi">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const content = privacy[appLocale];
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tWa = await getTranslations({ locale, namespace: "WhatsApp" });

  const breadcrumb = breadcrumbJsonLd(
    breadcrumbItems(appLocale, tNav("home"), [
      { name: t("title"), href: "/kebijakan-privasi" },
    ]),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />

      <article className="bg-canvas pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <header>
            <h1 className="text-[2.5rem] leading-[1.06] sm:text-[3.5rem]">
              {t("title")}
            </h1>
            <p className="mt-6 text-[1.1rem] leading-[1.8] text-ink-soft">
              {content.intro}
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              {t("updated", {
                date: formatDate(PRIVACY_UPDATED_AT, appLocale),
              })}
            </p>
          </header>

          <div className="mt-12 space-y-12">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.7rem] sm:text-[2rem]">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[1.05rem] leading-[1.9] text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-5 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative ps-5 text-[1.02rem] leading-[1.8] text-ink-soft before:absolute before:start-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-gold-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="rounded-3xl bg-canvas-alt p-6 sm:p-8">
              <h2 className="text-[1.7rem] sm:text-[2rem]">
                {t("contactTitle")}
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.9] text-ink-soft">
                {t("contactText")}
              </p>
              <ul className="mt-5 space-y-2 text-[1.02rem] leading-[1.8]">
                <li>{site.legalName}</li>
                <li>
                  <a
                    href={buildWhatsAppUrl(tWa("generic"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-medium underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
                  >
                    <WhatsAppIcon className="size-4 text-wa" />
                    {site.phoneDisplay}
                  </a>
                </li>
                {site.email ? (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex min-h-11 items-center font-medium underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
                    >
                      {site.email}
                    </a>
                  </li>
                ) : null}
                <li className="text-ink-soft">
                  <address className="not-italic">
                    {site.address.street}, {site.address.area},{" "}
                    {site.address.city}, {site.address.province}{" "}
                    {site.address.postalCode}
                  </address>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
