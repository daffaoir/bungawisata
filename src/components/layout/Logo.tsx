import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Lambang belah ketupat, dipotong dari logo master oleh
 * `scripts/prepare-logo.mjs`.
 *
 * Lambangnya hitam dengan latar transparan, jadi di atas latar gelap ia perlu
 * dibalik — `invert` mengubahnya menjadi belah ketupat putih dengan bunga
 * hitam, yaitu versi reverse yang lazim untuk logo satu warna.
 *
 * Ukuran ditentukan sepenuhnya oleh `className` dari pemanggil (mis.
 * `size-10`) — sengaja tidak ada `w-full`/`h-auto` di sini. `cn()` di proyek
 * ini hanya menggabung string, bukan `tailwind-merge`, jadi utility yang
 * konflik (`w-full` vs `size-10`) tidak saling menimpa berdasar urutan di
 * JSX; siapa yang menang bergantung urutan di stylesheet hasil kompilasi.
 * Sebelumnya itu membuat logo melebar mengikuti lebar container (~400px)
 * alih-alih ukuran `size-10` yang dimaksud.
 */
export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      priority
      className={cn(tone === "light" && "invert", className)}
    />
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark tone={tone} className="size-10 shrink-0" />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.05rem] font-extrabold tracking-[-0.01em] uppercase",
            isLight ? "text-white" : "text-ink",
          )}
        >
          Bunga Wisata
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold tracking-[0.28em] uppercase",
            isLight ? "text-gold-400" : "text-gold-600",
          )}
        >
          Tour &amp; Travel
        </span>
      </span>
    </span>
  );
}
