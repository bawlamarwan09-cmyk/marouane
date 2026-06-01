export type ClassValue = string | number | null | false | undefined;

/**
 * Lightweight className combiner (drop-in for shadcn's `cn`).
 * Filters out falsy values and joins the rest with spaces.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
