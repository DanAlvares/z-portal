import { listings } from './data';
import { AppComponent } from '../components/App/App';
import { IListing } from '../components/Listings/ListingsModel';

export class ListingService {

  constructor() { }

  addListing(listing: IListing): void {
    const appComponent = new AppComponent();
    appComponent.state.listings.unshift(listing);
    appComponent.render();
    this.saveListings(appComponent.state.listings);
  }

  getListings(): IListing[] {
    const listingsStore = localStorage.getItem('listings');

    if (listingsStore) {
      return JSON.parse(listingsStore);
    }
    return listings;
  }

  updateListing(listing: IListing): void {
    const appComponent = new AppComponent();
    const appListings = appComponent.state.listings;

    const listingIndex = appListings.findIndex((listing: IListing) => listing._id === listing._id);
    appComponent.state.listings = [
      ...appListings.slice(0, listingIndex),
      listing,
      ...appListings.slice(listingIndex + 1, appListings.length)
    ]
    appComponent.render();
    this.saveListings(appComponent.state.listings);
  }

  private saveListings(listings: IListing[]) {
    localStorage.setItem('listings', JSON.stringify(listings));
  }
}