import { listings, IListing } from "./data";

const HTMLTemplate = (params: IAppState) => `
    <main class="container">
        <section>
        </section>
        <aside>
            <button class="btn btn-secondary btn-block add-listing" type="button">Add Listing</button>
        </aside>
    </main>
`;

export class AppComponent extends HTMLElement {
  public state: IAppState = { listings }

  constructor() {
    super();
    this.render()
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

