import Image from "next/image";

export function PackageGallery({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  if (images.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {images.map((src, index) => (
        <li
          key={src}
          className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
        >
          <Image
            src={src}
            alt={`${alt} — ${index + 1}`}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </li>
      ))}
    </ul>
  );
}
