
const HTMLTemplate = (state: any) => `

`;

export class ImageGalleryComponent extends HTMLElement {
  public state = {}

  constructor() {
    super();
    this.render(this.state);
  }

  static get observedAttributes() {
    return ['listing'];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) { }

  connectedCallback() { }

  disconnectedCallback() { }

  render(state = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}


window.customElements.define('zoopla-image-gallery', ImageGalleryComponent);