import { listings, IListing } from "./data";

const HTMLTemplate = (params: IAppState) => `
    <main class="container">
        <section>
            <zoopla-listings listings="${params.sanitized_listings}"></zoopla-listings>
        </section>
        <aside>
            <button class="btn btn-secondary btn-block add-listing" type="button">+ <span>Add Listing</span></button>
        </aside>
    </main>

    <zoopla-listing-form hidden></zoopla-listing-form>
`;

export class AppComponent extends HTMLElement {
  public state: IAppState = { listings };

  private addListingBtn!: HTMLElement;
  private zooplaForm!: HTMLElement;

  constructor() {
    super();
    this.render()
  }

  connectedCallback() {
    this.addListingBtn = <HTMLElement>document.querySelector('.btn.add-listing');
    this.zooplaForm = <HTMLElement>document.querySelector('zoopla-listing-form');

    this.addListingBtn.addEventListener('click', this.addListing.bind(this));
  }

  disconnectedCallback() {
    this.addListingBtn.removeEventListener('click', this.addListing.bind(this));
  }

  addListing() {
    this.zooplaForm.toggleAttribute('hidden');
  }

  render() {
    this.state.sanitized_listings = this._sanitizeHtml(JSON.stringify(this.state.listings))
    this.innerHTML = HTMLTemplate(this.state);
  }

  _sanitizeHtml(html: string): string {
    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
}

window.customElements.define('zoopla-portal', AppComponent);

interface IAppState {
  listings: IListing[];
  sanitized_listings?: string;
}

