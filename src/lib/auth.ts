import type { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

const AUTH_COOKIE_NAME = "auth_token";

type JwtPayload = {
  address: string;
};

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET env var");
  }
  return secret;
}

export function signAuthToken(address: string): string {
  return jwt.sign({ address } as JwtPayload, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: "30d",
  });
}

export function verifyAuthToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

export function getCookie(req: NextApiRequest, name: string): string | undefined {
  const cookie = req.headers.cookie;
  if (!cookie) return undefined;
  const parts = cookie.split("; ");
  for (const part of parts) {
    const [k, ...v] = part.split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

export function buildCookie(name: string, value: string, options: {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none";
} = {}): string {
  const segments = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${options.path ?? "/"}`,
    `SameSite=${options.sameSite ?? "lax"}`,
  ];
  if (options.httpOnly !== false) segments.push("HttpOnly");
  if (options.secure ?? process.env.NODE_ENV === "production") segments.push("Secure");
  if (options.maxAge) segments.push(`Max-Age=${options.maxAge}`);
  return segments.join("; ");
}

export function getAddressFromRequest(req: NextApiRequest): string | null {
  const token = getCookie(req, AUTH_COOKIE_NAME);
  if (!token) return null;
  const payload = verifyAuthToken(token);
  return payload?.address ?? null;
}

export { AUTH_COOKIE_NAME };


