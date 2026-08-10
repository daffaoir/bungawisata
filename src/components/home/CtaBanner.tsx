import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";

/**
 * Padding atas dan bawah sengaja sama besar — versi sebelumnya hanya punya
 * `pb`, sehingga kartunya menempel pada section di atasnya.
 */
export function CtaBanner() {
  const t = useTranslations("Home.cta");

  return (
    <section className="bg-canvas pt-20 pb-20 sm:pt-24 sm:pb-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="border border-ink bg-ink px-7 py-16 text-center sm:px-14 sm:py-20">
            <span
              aria-hidden="true"
              className="mx-auto mb-8 block h-px w-10 bg-gold-400"
            />

            <h2 className="mx-auto max-w-2xl text-[2rem] text-white sm:text-[2.6rem]">
              {t("title")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-[1.85] text-white/70">
              {t("subtitle")}
            </p>

            <WhatsAppCta
              intent="custom"
              label={t("button")}
              variant="white"
              size="lg"
              className="mt-10"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
