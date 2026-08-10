import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { FacebookIcon } from "@/components/shared/FacebookIcon";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section, SectionHeading } from "@/components/shared/Section";
import { TikTokIcon } from "@/components/shared/TikTokIcon";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { faq } from "@/content/faq";
import { images } from "@/content/images";
import { MAPS_EMBED_URL, site } from "@/content/site";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/kontak">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/kontak", locale as AppLocale),
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

  const contactIcons = [
    {
      key: "whatsapp",
      label: t("whatsappTitle"),
      href: buildWhatsAppUrl(tWhatsApp("generic")),
      Icon: WhatsAppIcon,
    },
    {
      key: "email",
      label: t("emailTitle"),
      href: `mailto:${site.email}`,
      Icon: Mail,
    },
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
  ] as const;

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        image={images["gili-udara"]}
      />

      {/*
        Satu kartu utama berisi info kunci (alamat + jam operasional), lalu
        baris icon di bawahnya untuk semua kanal kontak — WhatsApp, email,
        dan media sosial sejajar sebagai satu grup, bukan kartu-kartu
        terpisah yang bersaing perhatian.
      */}
      <Section tone="alt">
        <SectionHeading
          eyebrow={t("channelsEyebrow")}
          title={t("channelsTitle")}
          align="center"
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col bg-white p-8">
              <MapPin
                className="size-6 text-gold-600"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <h3 className="mt-5 text-lg">{t("addressTitle")}</h3>
              <address className="mt-3 leading-[1.75] text-ink-soft not-italic">
                {site.address.street}
                <br />
                {site.address.area}
                <br />
                {site.address.city}, {site.address.province}{" "}
                {site.address.postalCode}
              </address>
            </div>
          </Reveal>

          <Reveal className="h-full" from="right">
            <div className="flex h-full flex-col bg-white p-8">
              <Clock
                className="size-6 text-gold-600"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <h3 className="mt-5 text-lg">{t("hoursTitle")}</h3>
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
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <span className="text-[0.68rem] tracking-[0.12em] text-ink-muted uppercase">
            {t("connectTitle")}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {contactIcons.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="flex size-12 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow={t("mapEyebrow")}
          title={t("mapTitle")}
          subtitle={t("mapSubtitle")}
        />

        {/*
          Peta dimuat malas supaya tidak ikut menahan LCP — bagi kebanyakan
          pengunjung alamat teks di atas sudah cukup, petanya baru dilihat
          saat mereka menggulir sampai sini.
        */}
        <div className="mt-10 aspect-[16/10] w-full border border-line sm:aspect-[16/7]">
          <iframe
            src={MAPS_EMBED_URL}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full"
          />
        </div>
      </Section>

      <Section tone="alt" id="faq">
        <SectionHeading
          title={t("faqTitle")}
          subtitle={t("faqSubtitle")}
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={faq} />
        </div>
      </Section>
    </>
  );
}
