import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSiteUrl() {
  vi.resetModules();
  const mod = await import("./site");
  return mod.SITE_URL;
}

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("jatuh ke https://bungawisata.co.id bila env tidak di-set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
    expect(await loadSiteUrl()).toBe("https://bungawisata.co.id");
  });

  it("jatuh ke fallback bila env berisi string kosong", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(await loadSiteUrl()).toBe("https://bungawisata.co.id");
  });

  it("memakai env dan membuang garis miring di akhir", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://contoh.test/");
    expect(await loadSiteUrl()).toBe("https://contoh.test");
  });
});

async function loadSite() {
  vi.resetModules();
  return (await import("./site")).site;
}

describe("site", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("tidak memuat domain bungawisata.com (milik pihak lain)", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", undefined);
    expect(JSON.stringify(await loadSite())).not.toContain("bungawisata.com");
  });

  it("menyembunyikan email bila env kosong", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    expect((await loadSite()).email).toBeUndefined();
  });

  it("memakai email dari env bila diisi", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", " info@contoh.test ");
    expect((await loadSite()).email).toBe("info@contoh.test");
  });

  it("jam buka mengikuti Google: enam hari kerja 08.00–17.00", async () => {
    const { hours } = await loadSite();
    const open = hours.flatMap((h) => (h.schema ? [h.schema] : []));
    expect(open).toHaveLength(1);
    expect(open[0].dayOfWeek).toHaveLength(6);
    expect(open[0]).toMatchObject({ opens: "08:00", closes: "17:00" });
  });
});
