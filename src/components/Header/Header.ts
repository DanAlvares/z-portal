const HTMLTemplate = (params: any) => `
    <header>
        <div class="container">
            <h1><a href="/">${params.title}</a></h1>
        </div>
    </header>
`;

export class HeaderComponent extends HTMLElement {
  public state = { title: 'Zoopla Portal' }

  constructor() {
    super();
    this.render(this.state);
  }

  render(state = this.state) {
    this.innerHTML = HTMLTemplate(state);
  }
}


window.customElements.define('zoopla-header', HeaderComponent);