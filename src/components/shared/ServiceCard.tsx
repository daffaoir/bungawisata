import { ArrowRight } from "lucide-react";
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
    <article className="group relative flex h-full flex-col border border-line bg-white p-7 transition-colors duration-500 hover:border-ink">
      <ServiceIcon name={service.icon} className="size-8 text-gold-600" />
      <h3 className="mt-6 text-[1.35rem]">
        <Link
          href={{ pathname: "/layanan/[slug]", params: { slug: service.slug } }}
          className="after:absolute after:inset-0"
        >
          {content.name}
        </Link>
      </h3>
      <p className="mt-3 mb-6 text-sm leading-[1.75] text-ink-soft">
        {content.summary}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-600 uppercase">
        {t("more")}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
