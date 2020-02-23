export const listings: IListing[] = [
  {
    address: {
      line_1: "34 Agent Street",
      postcode: "ZO0 1LA"
    },
    asking_price: "£450 000",
    baths: 2,
    beds: 3,
    description: "Sed fringilla at felis condimentum dignissim. Aliquam luctus felis vel sollicitudin vestibulum. Maecenas vel semper lorem. In pellentesque tellus dignissim, congue urna id, pharetra eros. ",
    expired: false,
    photos: [
      { caption: "Photo1", url: "https://via.placeholder.com/150" },
      { caption: "Photo2", url: "https://via.placeholder.com/150" },
      { caption: "", url: "https://via.placeholder.com/150" }
    ]
  },
  {
    address: {
      line_1: "34 Agent Street",
      postcode: "ZO0 1LA"
    },
    asking_price: "£450 000",
    baths: 2,
    beds: 3,
    description: "Sed fringilla at felis condimentum dignissim. Aliquam luctus felis vel sollicitudin vestibulum. Maecenas vel semper lorem. In pellentesque tellus dignissim, congue urna id, pharetra eros. ",
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