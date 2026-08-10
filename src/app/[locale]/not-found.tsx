import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { Section } from "@/components/shared/Section";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <Section tone="white" className="text-center">
      <p className="font-display text-7xl text-gold-500/40">404</p>
      <h1 className="mt-6 text-[2rem] sm:text-[2.6rem]">{t("title")}</h1>
      <p className="mx-auto mt-5 max-w-md leading-[1.85] text-ink-soft">
        {t("description")}
      </p>
      <ButtonLink href="/" size="lg" className="mt-9">
        {t("cta")}
      </ButtonLink>
    </Section>
  );
}
