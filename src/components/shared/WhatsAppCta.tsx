import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonAnchor, type ButtonSize, type ButtonVariant } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

type WhatsAppCtaProps = {
  /**
   * Kalau diisi, pesan WhatsApp otomatis menyebut nama dan tautan paket ini,
   * plus baris "rencana tanggal/jumlah peserta" yang tinggal dilengkapi,
   * sehingga calon pelanggan tidak perlu mengetik ulang.
   */
  pkg?: { title: string; url: string };
  /** Nada pesan saat tidak menyebut paket tertentu. */
  intent?: "generic" | "custom";
  /** Ganti label tombol. Default mengikuti ada/tidaknya `pkg`. */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function WhatsAppCta({
  pkg,
  intent = "generic",
  label,
  variant = "primary",
  size = "md",
  className,
}: WhatsAppCtaProps) {
  const t = useTranslations("WhatsApp");

  const message = pkg
    ? t("package", { packageTitle: pkg.title, packageUrl: pkg.url })
    : t(intent);

  return (
    <ButtonAnchor
      href={buildWhatsAppUrl(message)}
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsAppIcon className="size-[1.15em]" />
      {label ?? (pkg ? t("ctaPackage") : t("cta"))}
    </ButtonAnchor>
  );
}
