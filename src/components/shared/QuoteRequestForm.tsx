"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type SubmitEvent } from "react";
import { cn } from "@/lib/cn";
import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Select } from "./Select";
import { WhatsAppIcon } from "./WhatsAppIcon";

type QuoteRequestFormProps = {
  /** Pilihan layanan dalam bahasa aktif. */
  services: ReadonlyArray<{ slug: string; name: string }>;
  /** Layanan yang terpilih saat form pertama tampil. */
  defaultService?: string;
  className?: string;
};

const inputClass =
  "min-h-12 w-full rounded-2xl border border-ink/15 bg-canvas px-4 py-3 text-[0.95rem] text-ink transition-colors duration-300 placeholder:text-ink-muted hover:border-ink/40 focus:border-ink/60 focus:outline-none";

/**
 * Form "minta penawaran" yang hanya menyusun pesan WhatsApp — tidak ada data
 * yang dikirim ke server. Pesan terstruktur memudahkan tim membalas dengan
 * penawaran tanpa bolak-balik bertanya.
 */
export function QuoteRequestForm({
  services,
  defaultService = "",
  className,
}: QuoteRequestFormProps) {
  const t = useTranslations("QuoteForm");
  const id = useId();
  const [service, setService] = useState(defaultService);
  const [error, setError] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("name") || !value("destination") || !value("pax")) {
      setError(true);
      return;
    }
    setError(false);

    const serviceName = services.find((s) => s.slug === service)?.name;
    const message = buildQuoteMessage(t("greeting"), [
      { label: t("name"), value: value("name") },
      { label: t("service"), value: serviceName },
      { label: t("destination"), value: value("destination") },
      { label: t("pax"), value: value("pax") },
      { label: t("date"), value: value("date") },
      { label: t("pickup"), value: value("pickup") },
      { label: t("budget"), value: value("budget") },
    ]);

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  const field = (name: string) => `${id}-${name}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("grid gap-5 sm:grid-cols-2", className)}
    >
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-ink">{t("service")}</p>
        <Select
          value={service}
          onChange={setService}
          label={t("service")}
          options={[
            { value: "", label: t("servicePlaceholder") },
            ...services.map((s) => ({ value: s.slug, label: s.name })),
          ]}
        />
      </div>

      <label htmlFor={field("destination")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("destination")} *
        </span>
        <input
          id={field("destination")}
          name="destination"
          required
          placeholder={t("destinationPlaceholder")}
          className={inputClass}
        />
      </label>

      <label htmlFor={field("pax")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("pax")} *
        </span>
        <input
          id={field("pax")}
          name="pax"
          type="number"
          inputMode="numeric"
          min={1}
          required
          className={inputClass}
        />
      </label>

      <label htmlFor={field("date")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("date")}
        </span>
        <input
          id={field("date")}
          name="date"
          placeholder={t("datePlaceholder")}
          className={inputClass}
        />
      </label>

      <label htmlFor={field("pickup")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("pickup")}
        </span>
        <input
          id={field("pickup")}
          name="pickup"
          defaultValue={t("defaultPickup")}
          className={inputClass}
        />
      </label>

      <label htmlFor={field("budget")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("budget")}
        </span>
        <input
          id={field("budget")}
          name="budget"
          placeholder={t("budgetPlaceholder")}
          className={inputClass}
        />
      </label>

      <label htmlFor={field("name")} className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          {t("name")} *
        </span>
        <input
          id={field("name")}
          name="name"
          autoComplete="name"
          required
          className={inputClass}
        />
      </label>

      <div className="sm:col-span-2">
        {error ? (
          <p role="alert" className="mb-4 text-sm font-medium text-red-700">
            {t("errorRequired")}
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-7 text-base font-semibold text-ink transition-[background-color,scale] duration-300 hover:bg-gold-300 active:scale-[0.97] sm:w-auto"
        >
          <WhatsAppIcon className="size-[1.15em]" />
          {t("submit")}
        </button>
        <p className="mt-4 text-[0.85rem] leading-[1.6] text-ink-muted">
          {t("privacy")}
        </p>
      </div>
    </form>
  );
}
