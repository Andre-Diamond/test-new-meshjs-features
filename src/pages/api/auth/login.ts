import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";
import { AUTH_COOKIE_NAME, buildCookie, signAuthToken } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { address } = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) ?? {};
    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'address'" });
    }

    const now = new Date();
    const user = await db.user.upsert({
      where: { address },
      create: { address, lastLoginAt: now },
      update: { lastLoginAt: now },
    });

    const token = signAuthToken(address);
    const cookie = buildCookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ user: { id: user.id, address: user.address } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


