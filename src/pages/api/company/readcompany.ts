import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize, filter } = req.query;
  const record = await prisma.company.findMany({
    skip: (Number(page) - 1) * Number(pageSize),
    take: Number(pageSize),
    where: {
      name: filter ? { contains: String(filter), mode: "insensitive" } : {},
    },
    include: {
      type: true,
      currency: true,
    },
  });
  const total = await prisma.company.count({
    where: {
      name: filter ? { contains: String(filter), mode: "insensitive" } : {},
    },
  });
  return res.status(200).json({ success: true, record, total });
}
