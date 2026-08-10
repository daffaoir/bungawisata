import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Lewati /api, /trpc, aset internal Next, dan semua file berekstensi.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
