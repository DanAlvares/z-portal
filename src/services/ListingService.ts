import { listings } from './data';
import { AppComponent } from '../components/App/App';
import { IListing } from '../components/Listings/ListingsModel';
import { Utils } from './Utils';

export class ListingService {

  constructor() { }

  addListing(listing: IListing) {
    const appComponent = new AppComponent();
    appComponent.state.listings.unshift(listing);
    appComponent.render();
    localStorage.setItem('listings', JSON.stringify(appComponent.state.listings));
  }

  getListings() {
    const listingsStore = localStorage.getItem('listings');

    if (listingsStore) {
      return JSON.parse(listingsStore);
    }
    return listings;
  }
}