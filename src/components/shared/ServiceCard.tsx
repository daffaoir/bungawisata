import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { Service } from "@/lib/content-schema";
import { ServiceIcon } from "./ServiceIcon";

/** Kartu satu layanan — dipakai di beranda dan `/layanan`. */
export function ServiceCard({ service }: { service: Service }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Home.services");
  const content = service.content[locale];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-canvas-alt">
      {/* Tinggi foto tetap di desktop supaya kartu lebar (baris kedua di
          /layanan) sejajar dengan kartu biasa. */}
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-60">
        <Image
          src={service.heroImage}
          alt=""
          aria-hidden="true"
          fill
          quality={85}
          sizes="(min-width: 1024px) 38rem, (min-width: 640px) 90vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out-soft [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="flex size-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-[1.5rem]">
          <Link
            href={{
              pathname: "/layanan/[slug]",
              params: { slug: service.slug },
            }}
            className="after:absolute after:inset-0 after:rounded-3xl"
          >
            {content.name}
          </Link>
        </h3>
        <p className="mt-2 mb-5 leading-[1.65] text-ink-soft">
          {content.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-gold-700">
          {t("more")}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
