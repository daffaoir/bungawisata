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
 * Empat kolom dipisahkan garis rambut, bukan kartu berbayang. Nomor urut
 * kecil di atas ikon memberi ritme baca dari kiri ke kanan.
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

      <StaggerGroup className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ key, Icon }, index) => (
          <StaggerItem key={key} className="h-full">
            <div className="group h-full bg-white p-8 transition-colors duration-500 hover:bg-gold-50">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  className="size-6 text-ink transition-colors duration-500 group-hover:text-gold-600"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-6 text-lg">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.8] text-ink-soft">
                {t(`items.${key}.description`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
