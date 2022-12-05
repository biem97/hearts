import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
// you might want to use regular 'fs' and not a promise one
import { client } from "../../../lib/sanity";
import { Buffer } from "node:buffer";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // parse form with a Promise wrapper
  const data: Buffer[] = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    // parse a file upload

    const chunks: any = [];

    form.onPart = (part) => {
      part.on("data", (buffer) => {
        // do whatever you want here
        console.log("data");
        chunks.push(buffer);
      });
    };

    form.once("end", () => {
      console.log("Done!");
      resolve(chunks);
    });

    form.parse(req, (err) => {
      if (err) return reject(err);

      resolve(chunks);
    });
  });

  if (data) {
    // client.getDocuments()
    client.assets
      .upload("image", Buffer.concat(data))
      .then((img) => console.log(`Image successfully uploaded: ${img.url}`))
      .catch((err) => console.log(err));
  }

  res.status(200).json({ name: "John Doeeee" });
}
