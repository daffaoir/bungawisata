import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonAnchor } from "@/components/shared/Button";
import { FacebookIcon } from "@/components/shared/FacebookIcon";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section, SectionHeading } from "@/components/shared/Section";
import { TikTokIcon } from "@/components/shared/TikTokIcon";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { faq } from "@/content/faq";
import { images } from "@/content/images";
import { MAPS_EMBED_URL, MAPS_LINK, site } from "@/content/site";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph } from "@/lib/metadata";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/kontak">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/kontak", locale as AppLocale),
    openGraph: await buildOpenGraph("/kontak", locale as AppLocale, {
      title: t("metaTitle"),
      description: t("metaDescription"),
      parent,
    }),
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/kontak">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tWhatsApp = await getTranslations({ locale, namespace: "WhatsApp" });

  const otherChannels = [
    // Email hanya tampil kalau `NEXT_PUBLIC_CONTACT_EMAIL` diisi.
    ...(site.email
      ? [
          {
            key: "email",
            label: t("emailTitle"),
            href: `mailto:${site.email}`,
            Icon: Mail,
          },
        ]
      : []),
    {
      key: "instagram",
      label: "Instagram",
      href: site.social.instagram,
      Icon: InstagramIcon,
    },
    {
      key: "facebook",
      label: "Facebook",
      href: site.social.facebook,
      Icon: FacebookIcon,
    },
    {
      key: "tiktok",
      label: "TikTok",
      href: site.social.tiktok,
      Icon: TikTokIcon,
    },
  ];

  const whatsappUrl = buildWhatsAppUrl(tWhatsApp("generic"));
  const replyHours = site.hours[0];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["gili-udara"]}
      />

      {/*
        WhatsApp adalah kanal utama, jadi ia membuka halaman: nomor besar +
        tombol. Alamat dan jam operasional di kolom kanan (desktop) atau di
        bawahnya (ponsel). Kanal lain menyusul sebagai tautan berlabel.
      */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-2xl">{t("whatsappTitle")}</h2>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center font-display text-[2rem] leading-tight text-ink transition-colors hover:text-gold-600"
            >
              {site.phoneDisplay}
            </a>
            <div className="mt-6">
              <WhatsAppCta size="lg" className="w-full sm:w-auto" />
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              {replyHours.days[appLocale]} · {replyHours.time}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h3 className="flex items-center gap-2.5 text-lg">
                <MapPin
                  className="size-5 text-gold-600"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                {t("addressTitle")}
              </h3>
              <address className="mt-3 leading-[1.75] text-ink-soft not-italic">
                {site.address.street}
                <br />
                {site.address.area}
                <br />
                {site.address.city}, {site.address.province}{" "}
                {site.address.postalCode}
              </address>
            </div>

            <div>
              <h3 className="flex items-center gap-2.5 text-lg">
                <Clock
                  className="size-5 text-gold-600"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                {t("hoursTitle")}
              </h3>
              <dl className="mt-4 space-y-2.5 text-sm">
                {site.hours.map((entry) => (
                  <div
                    key={entry.days[appLocale]}
                    className="flex justify-between gap-4 border-b border-line pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-ink-soft">{entry.days[appLocale]}</dt>
                    <dd className="font-medium">
                      {typeof entry.time === "string"
                        ? entry.time
                        : entry.time[appLocale]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <h3 className="text-base">{t("connectTitle")}</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {otherChannels.map(({ key, label, href, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  className="inline-flex min-h-11 items-center gap-2.5 border border-line px-4 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="text-[2rem] sm:text-[2.6rem]">{t("mapTitle")}</h2>
            <address className="mt-5 leading-[1.75] text-ink-soft not-italic">
              {site.address.street}, {site.address.area}, {site.address.city},{" "}
              {site.address.province} {site.address.postalCode}
            </address>
            <ButtonAnchor
              href={MAPS_LINK}
              variant="outline"
              className="mt-6 w-full sm:w-auto"
            >
              <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {t("openMaps")}
            </ButtonAnchor>
            <p className="mt-6 text-sm leading-[1.75] text-ink-soft">
              {t("mapSubtitle")}
            </p>
          </div>

          {/*
            Peta dimuat malas supaya tidak ikut menahan LCP. Latar
            `canvas-alt` mengisi kotaknya selama iframe belum termuat.
          */}
          <div className="aspect-[4/3] w-full border border-line bg-canvas-alt">
            <iframe
              src={MAPS_EMBED_URL}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full"
            />
          </div>
        </div>
      </Section>

      <Section tone="white" id="faq">
        <SectionHeading
          title={t("faqTitle")}
          subtitle={t("faqSubtitle")}
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={faq} />
        </div>
        <div className="mt-10 flex justify-center">
          <WhatsAppCta variant="outline" />
        </div>
      </Section>
    </>
  );
}
