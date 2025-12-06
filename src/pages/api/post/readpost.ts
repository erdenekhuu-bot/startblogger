import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize } = req.query;
  const record = await prisma.post.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    include: {
      category: true,
    },
    orderBy: {
      view: "asc",
    },
  });
  return res.status(200).send(record);
}
