import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Susunan grid mengikuti jumlah foto supaya tidak ada foto "yatim" di baris
 * terakhir:
 * - 1 foto → satu foto lebar
 * - 2 atau 4 foto → dua kolom sama besar
 * - 3 foto → foto pertama selebar dua kolom, dua lainnya di bawahnya
 * - 5+ foto → tiga kolom (dua di ponsel), foto pertama 2×2
 */
function layout(count: number) {
  if (count === 1) {
    return { grid: "grid-cols-1", first: "aspect-[16/9]", rest: "" };
  }
  if (count === 3) {
    return {
      grid: "grid-cols-2",
      first: "col-span-2 aspect-[16/9]",
      rest: "aspect-[4/3]",
    };
  }
  if (count >= 5) {
    return {
      grid: "grid-cols-2 sm:grid-cols-3",
      first: "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto",
      rest: "aspect-[4/3]",
    };
  }
  return { grid: "grid-cols-2", first: "aspect-[4/3]", rest: "aspect-[4/3]" };
}

export function PackageGallery({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  if (images.length === 0) return null;

  const { grid, first, rest } = layout(images.length);

  return (
    <ul className={cn("grid gap-3 sm:gap-4", grid)}>
      {images.map((src, index) => (
        <li
          key={src}
          className={cn(
            "group relative overflow-hidden",
            index === 0 ? first : rest,
          )}
        >
          <Image
            src={src}
            alt={`${alt} — ${index + 1}`}
            fill
            sizes={
              index === 0
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 25vw, 50vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </li>
      ))}
    </ul>
  );
}
