import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/shared/Section";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";
import { images } from "@/content/images";

const STEPS = ["chat", "plan", "adjust", "go"] as const;

/**
 * Cara memesan, dari chat pertama sampai berangkat. Isinya memang urutan,
 * jadi bernomor. Alasan memilih Bunga Wisata (itinerary jelas, harga
 * transparan, bisa custom, didampingi tour leader) dilebur ke langkah-langkah
 * ini supaya tidak menjadi deretan kartu "kenapa kami" tersendiri.
 */
export function HowItWorks() {
  const t = useTranslations("Home.steps");

  return (
    <Section tone="daun" inset>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            tone="light"
          />

          <div className="reveal-photo relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-3xl lg:block">
            <Image
              src={images["suasana-kapal-teman"]}
              alt={t("photoAlt")}
              fill
              quality={85}
              sizes="(min-width: 1280px) 32rem, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <ol className="relative flex flex-col gap-2">
            {/* Garis penghubung antarlangkah, tergambar saat di-scroll. */}
            <span
              aria-hidden="true"
              className="timeline-progress absolute top-8 bottom-8 left-[1.4rem] w-px origin-top bg-canvas/25 sm:left-[1.65rem]"
            />
            {STEPS.map((step, index) => (
              <li
                key={step}
                className="relative flex gap-5 rounded-3xl p-2 sm:gap-6 sm:p-3"
              >
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-lg font-medium text-ink sm:size-14 sm:text-xl">
                  {index + 1}
                </span>
                <div className="pt-1.5 sm:pt-3">
                  <h3 className="text-[1.35rem] text-canvas sm:text-[1.6rem]">
                    {t(`items.${step}.title`)}
                  </h3>
                  <p className="mt-2 max-w-md leading-[1.7] text-canvas/80">
                    {t(`items.${step}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="ms-16 mt-6 sm:ms-20">
            <WhatsAppCta
              intent="custom"
              label={t("cta")}
              size="lg"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
