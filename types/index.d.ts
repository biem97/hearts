export type LunchesResponse = { images: Image[] } | Error;

export type Image = {
  date: string;
  imageUrl: string;
};

export type Error = {
  message: string;
};
