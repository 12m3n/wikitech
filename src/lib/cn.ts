type ClassValue = string | number | bigint | boolean | null | undefined;

/** Join class names, dropping anything falsy or non-string. */
export function cn(...parts: ClassValue[]) {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}
