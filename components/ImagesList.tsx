/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useState } from "react";

const calculateGridCols = (cols: number): string => {
  //
  const xxlCols = cols + 2;
  const xlCols = cols + 1;
  const mdlCols = cols - 1;
  const smlCols = cols - 2;

  const xxl = xxlCols > 8 ? "2xl:grid-cols 8" : xxlCols < 2 ? "2xl:grid-cols-2" : `2xl:grid-cols-${xxlCols}`;
  const xl = xlCols > 7 ? "xl:grid-cols 7" : xlCols < 2 ? "xl:grid-cols-2" : `xl:grid-cols-${xlCols}`;
  const lg = cols > 6 ? "lg:grid-cols 6" : cols < 2 ? "lg:grid-cols-2" : `lg:grid-cols-${cols}`;
  const md = mdlCols > 5 ? "md:grid-cols 6" : mdlCols < 2 ? "md:grid-cols-2" : `md:grid-cols-${mdlCols}`;
  const sm = smlCols > 4 ? "sm:grid-cols 4" : smlCols < 2 ? "sm:grid-cols-2" : `sm:grid-cols-${smlCols}`;

  return `${xxl} ${xl} ${lg} ${md} ${sm}`;
};

export default function ImagesList() {
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [cols, setCols] = useState<number>(4);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setImages([...images, ...e.target.files]);
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
      <input
        type="file"
        // className="opacity-0"
        id="images-input"
        name="images-input"
        accept="image/*"
        multiple
        onChange={onInputChange}
        className="text-black dark:text-white"
      />
      <a href="#" id="fileSelect" className="text-black dark:text-white">
        Select some files
      </a>
      <div id="fileList">
        <p className="text-black dark:text-white">No files selected!</p>
      </div>

      <button
        onClick={() => {
          setCols((prev) => {
            if (prev >= 6) {
              return prev;
            }
            return prev + 1;
          });
        }}
      >
        in
      </button>
      <button
        onClick={() => {
          setCols((prev) => {
            if (prev <= 2) {
              return prev;
            }
            return prev - 1;
          });
        }}
      >
        out
      </button>

      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className={`grid gap-y-2 gap-x-2 grid-cols-2 ${calculateGridCols(cols)}`}>
          {imageURLs.map((i, index) => {
            return (
              <a key={index} href={"#"} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-sm bg-gray-200 xl:aspect-w-7 xl:aspect-h-2 ">
                  <img
                    src={i}
                    alt={i}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    // width={280}
                    // height={320}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
