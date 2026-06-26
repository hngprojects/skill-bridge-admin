export function normalizeToken(token: string | undefined): string | undefined {
  if (!token || token === "undefined") return undefined;
  return token;
}

export async function getAuthToken(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return normalizeToken(session?.accessToken);
  }
  return undefined;
}
