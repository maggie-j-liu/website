import { NextApiRequest, NextApiResponse } from "next";
import getPhotos from "@/lib/getPhotos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const result = await getPhotos(req.body.nextPageToken);
  if (result.error) {
    res.status(500).json(result);
    return;
  }
  res.status(200).json(result);
}
