
const HTMLTemplate = (state: any) => ``;

export class ImageGalleryComponent extends HTMLElement {
  public state = {}

  constructor() {
    super();
    this.render(this.state);
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) { }

  connectedCallback() { }

  disconnectedCallback() { }

  previous() { }

  next() { }

  render(state = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}


window.customElements.define('z-listing-gallery', ImageGalleryComponent);