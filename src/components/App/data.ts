export const listings: IListing[] = [
  {
    address: {
      line_1: "xs ",
      postcode: ""
    },
    asking_price: "",
    beds: 3,
    description: "",
    expired: true,
    photos: [
      { caption: "Photo1", url: "https://via.placeholder.com/150" },
      { caption: "Photo2", url: "https://via.placeholder.com/150" },
      { caption: "", url: "https://via.placeholder.com/150" }
    ]
  }
]

export interface IListing {
  address: {
    line_1: string;
    postcode: string;
  },
  asking_price: string;
  beds: 3;
  description: string;
  expired: boolean;
  photos: IPhoto[];
}

interface IPhoto {
  caption: string;
  url: string;
}