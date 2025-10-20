import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkout = await prisma.user.findFirst({
          where: { username },
        });
        if (!checkout) {
          const user=await prisma.user.create({
            data: { username, email, password: hashedPassword },
          });
          return res.status(201).json(user.id);
        }
        return res.status(403).json(-1)
      }

      case "GET": {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
      }

      case "PUT": {
        const { id, username, email } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: { username, email },
        });
        return res.status(200).json(updatedUser);
      }

      case "DELETE": {
        const { id } = req.body;
        await prisma.user.delete({ where: { id: Number(id) } });
        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ data: error });
  }
}
