import type { SetCookieHeaders } from "@/types/api/client";
import type { StoredCookie } from "@/types/api/cookies";

export async function getServerCookieHeader(): Promise<string | undefined> {
  if (typeof window !== "undefined") return undefined;

  try {
    const { headers } = await import("next/headers");
    return (await headers()).get("cookie") ?? undefined;
  } catch {
    return undefined;
  }
}

export function setCookieHeadersFrom(headers: unknown): string[] {
  if (!headers || typeof headers !== "object") return [];

  const maybeHeaders = headers as SetCookieHeaders;

  const setCookie =
    maybeHeaders["set-cookie"] ?? maybeHeaders.get?.("set-cookie");
  if (Array.isArray(setCookie)) return setCookie.filter(Boolean);
  if (typeof setCookie === "string") return [setCookie];
  return maybeHeaders.getSetCookie?.() ?? [];
}

export function parseSetCookieHeader(header: string): StoredCookie | undefined {
  const [cookiePair, ...attributes] = header
    .split(";")
    .map((part) => part.trim());
  const separatorIndex = cookiePair.indexOf("=");
  if (separatorIndex <= 0) return undefined;

  const cookie: StoredCookie = {
    name: cookiePair.slice(0, separatorIndex),
    value: cookiePair.slice(separatorIndex + 1),
  };

  for (const attribute of attributes) {
    const [key, ...valueParts] = attribute.split("=");
    const normalizedKey = key.toLowerCase();
    const value = valueParts.join("=");

    if (normalizedKey === "httponly") cookie.httpOnly = true;
    if (normalizedKey === "secure") cookie.secure = true;
    if (normalizedKey === "path" && value) cookie.path = value;
    if (normalizedKey === "max-age" && value) {
      const maxAge = Number(value);
      if (Number.isFinite(maxAge)) cookie.maxAge = maxAge;
    }
    if (normalizedKey === "samesite") {
      const sameSite = value.toLowerCase();
      if (sameSite === "strict" || sameSite === "lax" || sameSite === "none") {
        cookie.sameSite = sameSite;
      }
    }
  }

  return cookie;
}

export function mergeCookieHeader(
  currentCookieHeader: string | undefined,
  storedCookies: StoredCookie[],
): string | undefined {
  const cookies = new Map<string, string>();

  for (const cookie of currentCookieHeader?.split(";") ?? []) {
    const trimmedCookie = cookie.trim();
    const separatorIndex = trimmedCookie.indexOf("=");
    if (separatorIndex <= 0) continue;
    cookies.set(
      trimmedCookie.slice(0, separatorIndex),
      trimmedCookie.slice(separatorIndex + 1),
    );
  }

  for (const cookie of storedCookies) {
    cookies.set(cookie.name, cookie.value);
  }

  const mergedCookies = Array.from(
    cookies,
    ([name, value]) => `${name}=${value}`,
  );
  return mergedCookies.length ? mergedCookies.join("; ") : undefined;
}

export async function persistServerCookies(storedCookies: StoredCookie[]) {
  if (typeof window !== "undefined" || storedCookies.length === 0) return;

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    for (const cookie of storedCookies) {
      cookieStore.set(cookie);
    }
  } catch {
    // Some server render contexts cannot mutate response cookies. The retry
    // still receives the rotated cookies through the returned Cookie header.
  }
}
