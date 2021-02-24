import { IListing } from './ListingsModel';
import JSX from '../../jsx';

const HTMLTemplate = (state: IListingsState) =>
  <div>
    <h2>{state.title}</h2>
    <section class="listings"></section>
  </div>
  ;

export class ListingsComponent extends HTMLElement {
  public state: IListingsState = { title: 'My Listings', listings: [] };
  public listingsElement!: HTMLElement;

  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ['listings'];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'listings') {
      this.state.listings = JSON.parse(newValue);
      this.renderListings();
    }
  }

  renderListings() {
    const listingFragment = document.createDocumentFragment();
    const listingsElement = document.querySelector('.listings') as HTMLElement;
    listingsElement.innerHTML = '';

    this.state.listings.forEach(item => {
      const listingItem = document.createElement('article', { is: 'z-listing' });
      listingItem.setAttribute('listing', JSON.stringify(item))
      listingItem.className = 'single-listing';
      listingFragment.appendChild(listingItem);
    });

    listingsElement.appendChild(listingFragment);
  }

  render() {
    this.innerHTML = HTMLTemplate(this.state);
  }
}

window.customElements.define('z-listings', ListingsComponent);

interface IListingsState {
  title: string;
  listings: IListing[]
}
