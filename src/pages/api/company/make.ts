import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import formidable from "formidable";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Failed to parse form data" });
    }

    const {
      name,
      meta,
      about,
      profileId,
      web,
      address,
      amount,
      companytypeId,
    } = fields;

    const uploadedProfile: any = files.profile;
    const uploadedBackground: any = files.background;
    const publicDir = path.join(process.cwd(), "public", "images");
    const savedFilePaths: string[] = [];
    const savedFileProfile: string[] = [];

    const checkout = await prisma.profile.findUnique({
      where: {
        userId: Number(profileId),
      },
    });

    if (!checkout) res.status(404).send(0);

    for (const file of uploadedProfile) {
      const tempPath = file.filepath;
      const fileName = file.originalFilename;
      const newPath = path.join(publicDir, fileName);

      fs.renameSync(tempPath, newPath);
      savedFilePaths.push(`/` + fileName);
    }
    for (const file of uploadedBackground) {
      const tempPath = file.filepath;
      const fileName = file.originalFilename;
      const newPath = path.join(publicDir, fileName);

      fs.renameSync(tempPath, newPath);
      savedFileProfile.push(`/` + fileName);
    }

    const company = await prisma.company.create({
      data: {
        name: String(name),
        profile: String(savedFileProfile),
        background: String(savedFilePaths),
        meta: String(meta),
        about: String(about),
        detail: {
          create: {
            created: new Date(),
            web: String(web),
            address: String(address),
          },
        },
        currency: {
          create: {
            amount: Number(amount),
          },
        },
        type: {
          connect: {
            id: Number(companytypeId),
          },
        },
        attribute: Number(companytypeId),
      },
    });

    res.status(201).send(company.id);
  });
}
