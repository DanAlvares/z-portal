import { IListing } from "./ListingsModel";
import { ListingService } from '../../services/ListingService';
import placeholderImage from '../../images/placeholder.png';
import { JSX } from '../../jsx'

const HTMLTemplate = (listing: IListing) =>
  <div style="display: flex">
    {listing.expired ? <div class="expired">Expired</div> : ''}

    <picture>
      <img src={listing.photos[0] || placeholderImage} alt={listing.address + ', ' + listing.postcode} />
    </picture>

    <div>
      <h3>{listing.askingPrice}</h3>

      <strong class="beds">{listing.beds} Bed</strong> |
      <strong class="baths">{listing.baths} Bath</strong>

      <address>{listing.address}, {listing.postcode}</address>

      <p class="description">{listing.description}</p>

      <button class="btn btn-outline edit-listing" data-listing-id={listing._id}>Edit Listing</button>
    </div>
  </div>
  ;

class ListingItem extends HTMLElement {
  public state: IListing = { address: {} } as IListing;

  private listingService = new ListingService();
  private editBtn!: HTMLElement;
  private zForm!: HTMLElement;

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
    this.zForm = document.querySelector('z-listing-form') as HTMLElement;
    this.editBtn = this.querySelector('.edit-listing') as HTMLElement;
    console.log(this)
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

    this.zForm.setAttribute('listing', JSON.stringify(selectedListing))
    this.zForm.removeAttribute('hidden')
  }

  render(state: IListing = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}

window.customElements.define('z-listing', ListingItem, { extends: 'article' });
