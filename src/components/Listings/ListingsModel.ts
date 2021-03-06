export interface IListing {
  _id: number;
  address: string;
  postcode: string;
  askingPrice: string;
  baths: number;
  beds: number;
  description: string;
  expired: boolean;
  photos: string[];
}
