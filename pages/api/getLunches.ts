import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity";
import { LunchesResponse } from "../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<LunchesResponse>) {
  const lunches = await client
    .fetch(
      `*[_type == "foods" && name == "Lunches"]{
  "images": images[]{
   date,
   "imageUrl": asset->url,
 }
}`
    )
    .then((response) => {
      console.info(`Successfully fetched lunches @${new Date().toLocaleString()}`);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error(`Error while fetching lunches @${new Date().toLocaleString()}: ${err}`);
      res.status(400).json({ message: "Can not fetch images" });
    });
}
