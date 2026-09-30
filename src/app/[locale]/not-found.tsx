import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { WhatsAppCta } from "@/components/shared/WhatsAppCta";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <section className="flex min-h-[60vh] items-center py-20 text-ink">
      <div className="mx-auto w-full max-w-6xl px-5 text-center sm:px-8">
        <p
          aria-hidden="true"
          className="font-display text-[7rem] leading-none text-gold-500"
        >
          404
        </p>
        <h1 className="mt-6 text-[2rem] sm:text-[2.6rem]">{t("title")}</h1>
        <p className="mx-auto mt-5 max-w-md leading-[1.85] text-ink-soft">
          {t("description")}
        </p>
        <div className="mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <ButtonLink href="/paket" size="lg" className="w-full sm:w-auto">
            {t("packagesCta")}
          </ButtonLink>
          <WhatsAppCta variant="outline" size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
