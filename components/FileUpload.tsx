/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useState } from "react";

interface FileUploadProps {}

export default function FileUpload({}: FileUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // useEffect(() => {
  //   const input = document.querySelector("input[type=file]");

  //   if (!input) {
  //     throw new Error("Could not find upload input");
  //   }

  //   input.addEventListener("change", uploadImage, {});
  // }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setImages([...images, ...e.target.files]);
  };

  const onUploadImages = () => {
    if (images.length < 1) {
      return;
    }

    const formFile = new FormData();

    for (const image of images) {
      formFile.append("file", image, image.name);
    }

    fetch("/api/files/images", {
      method: "POST",
      body: formFile,
    }).then(async (res) => {
      console.log("ress: ", await res.json());
    });
  };

  useEffect(() => {
    if (images.length <= 0) {
      return;
    }

    setImageURLs((prev) => {
      // We want to revoke object urls from previous state
      // to avoid memory leak
      for (const url of prev) {
        URL.revokeObjectURL(url);
      }

      return images.map((f) => URL.createObjectURL(f));
    });
  }, [setImageURLs, images]);

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              File Upload
            </label>
            <label htmlFor="media-input">Choose a profile picture:</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file
                  </p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  id="media-input"
                  name="media-input"
                  accept="image/*"
                  multiple
                  onChange={onInputChange}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
              onClick={onUploadImages}
            >
              Upload Images
            </button>
          </div>
        </div>
      </div>
      <section className="overflow-hidden text-gray-700">
        <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
          <div className="flex flex-wrap -m-1 md:-m-2">
            {imageURLs.map((url, index) => (
              <div
                className="flex flex-wrap lg:w-1/4 xl:-1/5 2xl:1/6 w-1/3"
                key={index}
              >
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src={url}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
