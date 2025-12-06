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

    const { title, meta, content } = fields;
    const uploadedFiles: any = files.metaImage;
    const publicDir = path.join(process.cwd(), "public", "images");
    const savedFilePaths: string[] = [];

    for (const file of uploadedFiles) {
      const tempPath = file.filepath;
      const fileName = file.originalFilename;
      const newPath = path.join(publicDir, fileName);

      fs.renameSync(tempPath, newPath);
      savedFilePaths.push(`/` + fileName);
    }

    console.log("Title:", title);
    console.log("Meta:", meta);
    console.log("Content:", content);
    console.log("Files:", uploadedFiles);

    await prisma.post.create({
      data: {
        title: String(title),
        meta: String(meta),
        content: String(content),
        metaImage: String(savedFilePaths),
        profileId: 1,
      },
    });

    res.status(200).json({ success: true, message: "Blog received" });
  });
}
