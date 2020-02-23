const HTMLTemplate = (params: any) => `
    <div class="overlay"></div>

    <div class="form-modal">
        <header><h3>Listing Details</h3></header>
        <section>
        <form>
            <div class="form-field">
                <label for="AskingPrice">Asking price</label>
                <input type="text" placeholder="What is the asking price?" name="AskingPrice" id="AskingPrice">
            </div>
            <div class="form-field">
                <label for="Beds">Number of bedrooms</label>
                <input type="number" placeholder="How many bedrooms?" name="Beds" id="Beds">
            </div>
            <div class="form-field address">
                <label for="Address">Address</label>
                <input type="text" placeholder="What is the first line?" name="Address" id="Address">
                <input type="text" placeholder="Postcode" name="Postcode" id="Postcode">
            </div>
            <div class="form-field">
                <label for="Description">Description</label>
                <textarea placeholder="Give some details about the property  " name="Description" id="Description"></textarea>
            </div>
            
            <div class="form-field">
                <label for="Photos">Upload Photos</label>
                <input type="file" name="Photos" id="Photos">
                <section>
                    <img src="https://via.placeholder.com/150" alt="" width="80" height="80">
                    <img src="https://via.placeholder.com/150" alt="" width="80" height="80">
                    <img src="https://via.placeholder.com/150" alt="" width="80" height="80">
                    <img src="https://via.placeholder.com/150" alt="" width="80" height="80">
                </section>
            </div>

            <section class="btn-group">
                <button class="btn cancel-edit" type="button">Cancel</button>
                <button class="btn btn-secondary save-listing" type="submit">Save Listing</button>
            </section>
        </form>
        </section>

    </div>
`;

class ListingForm extends HTMLElement {
  public state = {};

  private cancelBtn!: HTMLElement;
  private saveBtn!: HTMLElement;
  private zooplaForm!: HTMLElement;

  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.cancelBtn = <HTMLElement>document.querySelector('.btn.cancel-edit');
    this.saveBtn = <HTMLElement>document.querySelector('.btn.save-listing');
    this.zooplaForm = <HTMLElement>document.querySelector('zoopla-listing-form');

    this.cancelBtn.addEventListener('click', this.cancelEdit.bind(this));
    this.saveBtn.addEventListener('click', this.saveListing.bind(this));
  }

  disconnectedCallback() {
    this.cancelBtn.removeEventListener('click', this.cancelEdit.bind(this));
  }

  saveListing(event: Event) {
    // TODO: Save listing to IndexedDB
    event.preventDefault()
  }

  cancelEdit() {
    this.zooplaForm.toggleAttribute('hidden');
  }

  render() {
    this.innerHTML = HTMLTemplate(this.state);
  }
}

window.customElements.define('zoopla-listing-form', ListingForm);
