import { afterEach, describe, expect, it, vi } from "vitest";

async function load() {
  vi.resetModules();
  return import("./jsonld");
}

describe("organizationJsonLd", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("memuat data bisnis wajib dan @id", async () => {
    const { organizationJsonLd, ORGANIZATION_ID } = await load();
    const org = organizationJsonLd("desc");
    expect(org["@id"]).toBe(ORGANIZATION_ID);
    expect(org.geo).toMatchObject({ latitude: -7.8897902, longitude: 112.591502 });
    expect(org.openingHoursSpecification).toHaveLength(1);
    expect(org.sameAs).toHaveLength(3);
    expect(org.logo).toMatch(/^https:\/\/.+\/logo-full\.png$/);
    expect(org.telephone).toBe("+6281233909129");
  });

  it("tanpa email bila env kosong, dengan email bila diisi", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    expect("email" in (await load()).organizationJsonLd("d")).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "info@contoh.test");
    expect((await load()).organizationJsonLd("d")).toMatchObject({
      email: "info@contoh.test",
    });
  });
});

describe("serializeJsonLd", () => {
  it("meng-escape < supaya tidak bisa menutup tag script", async () => {
    const { serializeJsonLd } = await load();
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("<");
  });
});
