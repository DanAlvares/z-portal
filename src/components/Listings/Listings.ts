import { IListing } from './ListingsModel';

const HTMLTemplate = (state: IListingsState) => `
    <h2>${state.title}</h2>

    <section class="listings">
    </section>
`;

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
      this.renderListings()
    }
  }

  connectedCallback() {
    // this.renderListings()
  }

  renderListings() {
    const listingFragment = document.createDocumentFragment();
    const listingsElement = <HTMLElement>document.querySelector('.listings');
    listingsElement.innerHTML = '';

    this.state.listings.forEach(item => {
      const listingItem = document.createElement('article', { is: 'zoopla-listing' });
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

window.customElements.define('zoopla-listings', ListingsComponent);

interface IListingsState {
  title: string;
  listings: IListing[]
}
