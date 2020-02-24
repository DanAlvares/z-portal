export interface IListing {
  address: string;
  postcode: string;
  askingPrice: string;
  baths: number;
  beds: number;
  description: string;
  expired: boolean;
  photos: IPhoto[];
}

interface IPhoto {
  caption: string;
  url: string;
}