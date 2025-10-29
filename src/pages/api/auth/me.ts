import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";
import { getAddressFromRequest } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  const address = getAddressFromRequest(req);
  if (!address) return res.status(401).json({ user: null });

  const user = await db.user.findUnique({ where: { address } });
  if (!user) return res.status(404).json({ user: null });

  return res.status(200).json({ user: { id: user.id, address: user.address } });
}


