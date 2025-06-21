import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handleGet(res);
    case "POST":
      return handlePost(res);
    case "PUT":
      return handlePut(res);
    case "DELETE":
      return handleDelete(res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function handleGet(res: NextApiResponse) {
  res.status(200).json({ message: "GET request received" });
}

function handlePost(res: NextApiResponse) {
  res.status(201).json({ message: "POST request received" });
}

function handlePut(res: NextApiResponse) {
  res.status(200).json({ message: "PUT request received" });
}

function handleDelete(res: NextApiResponse) {
  res.status(200).json({ message: "DELETE request received" });
}
