/* eslint-disable @next/next/no-img-element */
import { Image } from "../types";

interface LunchesGallery {
  lunches: Image[];
}

export default function LunchesGallery({ lunches }: LunchesGallery) {
  return (
    <div className="mt-8">
      <div className={`grid gap-y-1 gap-x-1 grid-cols-3 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4`}>
        {lunches.map((l, index) => (
          <a key={index} href={"#"} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-w-7 xl:aspect-h-2">
              <img
                src={l.imageUrl}
                alt={`Lunch taken at ${l.imageUrl}`}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                // width={280}
                // height={320}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
