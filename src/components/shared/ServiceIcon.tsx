import {
  GraduationCap,
  Heart,
  PartyPopper,
  Plane,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ServiceIconName } from "@/lib/content-schema";

const ICONS = {
  users: Users,
  "graduation-cap": GraduationCap,
  "party-popper": PartyPopper,
  heart: Heart,
  plane: Plane,
} satisfies Record<ServiceIconName, unknown>;

/** Ikon satu layanan; dekoratif, jadi selalu `aria-hidden`. */
export function ServiceIcon({
  name,
  ...props
}: { name: ServiceIconName } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" strokeWidth={1.25} {...props} />;
}
