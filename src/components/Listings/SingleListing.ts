import { IListing } from "./ListingsModel";
import { ListingService } from '../../services/ListingService';

const HTMLTemplate = (listing: IListing) => `
    <div class="expired" ${listing.expired ? '' : 'hidden'}>Expired</div>

    <picture>
      <!-- Add Image Sources here-->
      <img src="${listing.photos[0]}" alt="${listing.address}, ${listing.postcode}" onerror="this.src='https://via.placeholder.com/150'" />
    </picture>

    <div>
      <h3>${listing.askingPrice}</h3>
  
      <strong class="beds">${listing.beds} Bed</strong> |
      <strong class="baths">${listing.baths} Bath</strong>
  
      <address>${listing.address}, ${listing.postcode}</address>
  
      <p class="description">${listing.description}</p>
      
      <button class="btn btn-outline edit-listing" data-listing-id="${listing._id}">Edit Listing</button>
    </div>
`;

class ListingItem extends HTMLElement {
  public state: IListing = <IListing>{ address: {} };

  private listingService = new ListingService();
  private editBtn!: HTMLElement;
  private zooplaForm!: HTMLElement;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['listing'];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'listing') {
      this.state = JSON.parse(newValue);
      this.render(this.state);
    }
  }

  connectedCallback() {
    this.zooplaForm = <HTMLElement>document.querySelector('zoopla-listing-form');
    this.editBtn = <HTMLElement>this.querySelector('.edit-listing');

    this.editBtn.addEventListener('click', this.editListing.bind(this))
  }

  disconnectedCallback() {
    this.editBtn.removeEventListener('click', this.editListing)
  }

  editListing(event: MouseEvent) {
    const listingId = (event.target as HTMLElement).getAttribute('data-listing-id');
    const selectedListing = this.listingService
      .getListings()
      .find((listing: IListing) => Number(listingId) === listing._id);

    this.zooplaForm.setAttribute('listing', JSON.stringify(selectedListing))
    this.zooplaForm.removeAttribute('hidden')
  }

  render(state: IListing = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}

window.customElements.define('zoopla-listing', ListingItem, { extends: 'article' });
