import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Selalu impor `Link`, `redirect`, dan kawan-kawan dari sini — bukan dari
 * `next/link` — supaya path otomatis diterjemahkan sesuai bahasa aktif.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
