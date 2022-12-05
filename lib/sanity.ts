import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: false,
  withCredentials: true,
  token: process.env.SANITY_TOKEN,
});

// const uploadImageFromUrl = async (url) => {
// const imageBuffer = await axios
//   .get(url, { responseType: "arraybuffer" })
//   .then((res) => Buffer.from(res.data, "utf-8"));

// client.assets
//   .upload("image", imageBuffer)
//   .then((img) => console.log(`Image successfully uploaded: ${img.url}`))
//   .catch((err) => console.log(err));
// };
