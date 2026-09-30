import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Kepala halaman untuk halaman selain beranda: panel foto membulat yang
 * sedikit masuk dari tepi layar, sama bahasanya dengan hero beranda tetapi
 * lebih pendek supaya isi halaman cepat terlihat.
 *
 * Tanpa `image`, panelnya hijau daun polos. Dengan foto, gradien dari bawah
 * menjaga kontras teks (subjudul ≥ 4,5:1 di area teks).
 */
export function PageHeader({
  title,
  subtitle,
  children,
  image,
  imagePosition,
  className,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  image?: string;
  /** Kelas `object-position` kalau subjek foto tidak di tengah. */
  imagePosition?: string;
  className?: string;
}) {
  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-3">
      <div
        className={cn(
          "relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-daun text-canvas sm:min-h-[24rem] sm:rounded-[2.5rem]",
          className,
        )}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              aria-hidden="true"
              fill
              priority
              quality={85}
              sizes="(min-width: 640px) calc(100vw - 2rem), calc(100vw - 1rem)"
              className={cn("hero-settle -z-10 object-cover", imagePosition)}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-daun-900/90 via-daun-900/55 to-daun-900/10 lg:bg-gradient-to-tr lg:from-daun-900/90 lg:via-daun-900/50 lg:to-transparent" />
          </>
        ) : null}

        <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-9 sm:px-8 sm:pb-12">
          <h1 className="max-w-3xl text-[2.5rem] leading-[1.04] sm:text-[3.75rem]">{title}</h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-canvas/90">
              {subtitle}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
