import { serializeJsonLd } from "@/lib/jsonld";

/** Satu blok JSON-LD. Terima satu objek atau beberapa sekaligus. */
export function JsonLd({ data }: { data: unknown }) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(block) }}
        />
      ))}
    </>
  );
}
