import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/shared/Section";
import { images } from "@/content/images";
import { Link } from "@/i18n/navigation";
import type { Region } from "@/lib/schema";
import { getPackagesByRegion } from "@/lib/packages";

const CARDS: Array<{
  region: Region;
  image: string;
  from: "left" | "right";
}> = [
  {
    region: "dalam-negeri",
    image: images["raja-ampat-piaynemo"],
    from: "left",
  },
  {
    region: "luar-negeri",
    image: images["turki-cappadocia"],
    from: "right",
  },
];

export function RegionSplit() {
  const t = useTranslations("Home.regionSplit");

  return (
    <Section tone="white">
      <SectionHeading
        title={t("title")}
        subtitle={t("subtitle")}
        align="center"
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {CARDS.map((card) => {
          const isDomestic = card.region === "dalam-negeri";
          const count = getPackagesByRegion(card.region).length;

          return (
            <Reveal key={card.region} from={card.from}>
              <Link
                href={{ pathname: "/paket", query: { region: card.region } }}
                className="group relative flex min-h-[24rem] flex-col justify-end overflow-hidden p-9 text-white sm:min-h-[28rem]"
              >
                <Image
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                {/*
                  Gradien satu warna (ink) — bukan dua warna seperti versi
                  lama — supaya fotonya tetap yang berbicara.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5" />

                <div className="relative">
                  <h3 className="text-[1.75rem] sm:text-[2.1rem]">
                    {isDomestic ? t("domesticTitle") : t("internationalTitle")}
                  </h3>
                  <p className="mt-4 max-w-sm leading-[1.8] text-white/75">
                    {isDomestic
                      ? t("domesticDescription")
                      : t("internationalDescription")}
                  </p>
                  <p className="mt-7 inline-flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
                    {t("explore", { count })}
                    <ArrowRight
                      className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-12 origin-left bg-gold-400 transition-transform duration-500 group-hover:scale-x-[2.5]"
                  />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
