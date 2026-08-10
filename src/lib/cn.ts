type ClassValue = string | false | null | undefined;

/** Gabung className secara kondisional tanpa menambah dependensi. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
