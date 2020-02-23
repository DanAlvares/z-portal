import { IListing } from "../App/data";

const HTMLTemplate = (listing: IListing) => `
    <div class="expired" ${listing.expired ? '' : 'hidden'}>Expired</div>

    <section class="thumbnail-gallery">
        <img src="https://via.placeholder.com/150" alt="" width="150" height="150">
        <img src="https://via.placeholder.com/150" alt="" width="150" height="150">
        <img src="https://via.placeholder.com/150" alt="" width="150" height="150">
    </section>

    <h3>${listing.asking_price}</h3>

    <strong class="beds">${listing.beds} Bed</strong> |
    <strong class="baths">${listing.baths} Bath</strong>

    <address>${listing.address.line_1}, ${listing.address.postcode}</address>

    <p class="description">${listing.description}</p>

    <button class="btn btn-outline">Edit Listing</button>
`;

class ListingItem extends HTMLElement {
  public state: IListing = <IListing>{ address: {} };

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'data') {
      this.state = JSON.parse(newValue);
      this.render(this.state);
    }
  }

  connectedCallback() {
    console.log('LISTING CONNECTED')
  }

  editListing() {

  }

  render(state: IListing = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}

window.customElements.define('zoopla-listing', ListingItem, { extends: 'article' });
