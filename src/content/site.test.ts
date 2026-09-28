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
