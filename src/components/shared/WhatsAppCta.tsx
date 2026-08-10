import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonAnchor, type ButtonSize, type ButtonVariant } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

type WhatsAppCtaProps = {
  /**
   * Kalau diisi, pesan WhatsApp otomatis menyebut nama paket ini sehingga
   * calon pelanggan tidak perlu mengetik ulang.
   */
  packageTitle?: string;
  /** Nada pesan saat tidak menyebut paket tertentu. */
  intent?: "generic" | "custom";
  /** Ganti label tombol. Default mengikuti ada/tidaknya `packageTitle`. */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function WhatsAppCta({
  packageTitle,
  intent = "generic",
  label,
  variant = "primary",
  size = "md",
  className,
}: WhatsAppCtaProps) {
  const t = useTranslations("WhatsApp");

  const message = packageTitle
    ? t("package", { packageTitle })
    : t(intent);

  return (
    <ButtonAnchor
      href={buildWhatsAppUrl(message)}
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsAppIcon className="size-[1.15em]" />
      {label ?? (packageTitle ? t("ctaPackage") : t("cta"))}
    </ButtonAnchor>
  );
}
