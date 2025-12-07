import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const record = await prisma.companyType.findMany({
        include: {
          company: true,
        },
      });
      return res.status(200).send(record);
    case "POST":
      const { name, description } = req.body;
      const list = await prisma.companyType.create({
        data: { name, description },
      });
      return res.status(201).send(list.id);
  }
}
