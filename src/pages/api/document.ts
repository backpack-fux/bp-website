import type { NextApiRequest, NextApiResponse } from "next";
import { createDocument } from "../../services/documentService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const newDocument = await createDocument(req.body);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ message: "Error creating document", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
