import type { NextApiRequest, NextApiResponse } from "next";
import { AUTH_COOKIE_NAME, buildCookie } from "../../../lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const expired = buildCookie(AUTH_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  res.setHeader("Set-Cookie", expired);
  return res.status(200).json({ ok: true });
}


