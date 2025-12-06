import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize, filter } = req.query;
  const record = await prisma.post.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    where: {
      attribute: filter ? Number(filter) : {},
    },
    include: {
      category: true,
      lang: true,
      profile: {
        select: {
          user: true,
        },
      },
    },
    orderBy: {
      view: "desc",
    },
  });
  const total = await prisma.post.count({
    where: {
      attribute: filter ? Number(filter) : {},
    },
  });
  return res.status(200).json({ success: true, record, total });
}
