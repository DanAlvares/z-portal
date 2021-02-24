import { IListing } from "../Listings/ListingsModel";
import { ListingService } from '../../services/ListingService';
import { Utils } from '../../services/Utils';
import { JSX } from '../../jsx'

const HTMLTemplate = (params: IAppState) =>
  <div>
    <main class="container">
      <section>
        <z-listings listings={params.sanitized_listings}></z-listings>
      </section>
      <aside>
        <button class="btn btn-secondary btn-block add-listing" type="button">+ <span>Add Listing</span></button>
      </aside>
    </main>

    <z-listing-form hidden></z-listing-form>
    <z-listing-gallery hidden></z-listing-gallery>
  </div>
  ;

export class AppComponent extends HTMLElement {
  public listingService = new ListingService();
  public state: IAppState = { listings: this.listingService.getListings() };

  private addListingBtn!: HTMLElement;
  private zForm!: HTMLElement;

  constructor() {
    super();
    this.render()
  }

  connectedCallback() {
    this.addListingBtn = document.querySelector('.btn.add-listing') as HTMLElement;
    this.zForm = document.querySelector('z-listing-form') as HTMLElement;

    this.addListingBtn.addEventListener('click', this.addListing.bind(this));
  }

  disconnectedCallback() {
    this.addListingBtn.removeEventListener('click', this.addListing.bind(this));
  }

  addListing() {
    this.zForm.toggleAttribute('hidden');
  }

  render() {
    this.state.sanitized_listings = Utils.sanitizeHtml(JSON.stringify(this.state.listings))
    this.innerHTML = HTMLTemplate(this.state);
  }

}

window.customElements.define('z-portal', AppComponent);

interface IAppState {
  listings: IListing[];
  sanitized_listings?: string;
}

