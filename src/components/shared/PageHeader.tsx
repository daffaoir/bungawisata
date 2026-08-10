import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Kepala halaman untuk halaman selain beranda.
 *
 * `image` opsional — tanpa itu, latarnya tetap `bg-ink` polos seperti semula.
 * Saat diisi, foto ditutup gradien gelap dari kiri (tempat judul berada) ke
 * kanan, supaya teks putih tetap terbaca sekaligus fotonya masih terlihat
 * di sisi kanan.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-20 pb-24 text-white sm:pt-28 sm:pb-32">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {eyebrow ? (
          <p className="eyebrow rule-gold mb-4 text-gold-400">{eyebrow}</p>
        ) : null}

        <h1 className="max-w-3xl text-[2.5rem] sm:text-6xl">{title}</h1>

        {subtitle ? (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-white/70">
            {subtitle}
          </p>
        ) : null}

        {children ? <div className="mt-10">{children}</div> : null}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />
    </section>
  );
}
