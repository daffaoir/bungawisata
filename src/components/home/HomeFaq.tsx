import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/Button";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Section } from "@/components/shared/Section";
import { faq } from "@/content/faq";

/** Pertanyaan yang paling sering muncul sebelum orang menghubungi kami. */
const HOME_FAQ_IDS = ["booking", "payment", "group-size", "custom"];

/**
 * FAQ singkat di beranda. Daftar lengkapnya ada di halaman Kontak (`#faq`).
 */
export function HomeFaq() {
  const t = useTranslations("Home.faq");
  const items = faq.filter((item) => HOME_FAQ_IDS.includes(item.id));

  return (
    <Section tone="canvas">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.25rem]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md text-[1.075rem] leading-[1.7] text-ink-soft">
            {t("subtitle")}
          </p>
          <ButtonLink
            href={{ pathname: "/kontak", hash: "faq" }}
            variant="outline"
            className="mt-8 hidden lg:inline-flex"
          >
            {t("viewAll")}
          </ButtonLink>
        </div>

        <div>
          <FaqAccordion items={items} />
          <ButtonLink
            href={{ pathname: "/kontak", hash: "faq" }}
            variant="outline"
            className="mt-8 lg:hidden"
          >
            {t("viewAll")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
