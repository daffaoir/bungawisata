import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Daftar "sudah termasuk" dan "belum termasuk".
 *
 * Bagian ini sengaja paling tenang di seluruh halaman — tanpa animasi dan
 * tanpa warna kuat — karena inilah blok yang paling menentukan kepercayaan
 * pada harga.
 */
export function InclusionList({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "include" | "exclude";
}) {
  const isInclude = variant === "include";
  const Icon = isInclude ? Check : Minus;

  return (
    <div
      className={cn(
        "border p-7",
        isInclude ? "border-gold-200 bg-gold-50" : "border-line bg-white",
      )}
    >
      <h3 className="text-xl">{title}</h3>

      <ol className="mt-6 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-[1.7]">
            <Icon
              className={cn(
                "mt-1 size-3.5 shrink-0",
                isInclude ? "text-gold-600" : "text-ink-muted",
              )}
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span className={isInclude ? "text-ink" : "text-ink-soft"}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
