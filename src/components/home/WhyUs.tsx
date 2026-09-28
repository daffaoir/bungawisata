import { HeartHandshake, Route, Users, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Section, SectionHeading } from "@/components/shared/Section";

const ITEMS = [
  { key: "itinerary", Icon: Route },
  { key: "price", Icon: Wallet },
  { key: "leader", Icon: Users },
  { key: "flexible", Icon: HeartHandshake },
] as const;

/**
 * Empat alasan dalam grid 2×2 dipisahkan garis rambut, bukan kartu
 * berbayang. Tanpa nomor urut — alasannya tidak berurutan.
 */
export function WhyUs() {
  const t = useTranslations("Home.whyUs");

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        align="center"
      />

      <StaggerGroup className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
        {ITEMS.map(({ key, Icon }) => (
          <StaggerItem key={key} className="h-full">
            <div className="h-full bg-white p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <Icon
                  className="size-6 shrink-0 text-ink"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="text-lg">{t(`items.${key}.title`)}</h3>
              </div>
              <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.8] text-ink-soft">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
