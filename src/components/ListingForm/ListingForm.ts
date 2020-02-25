
import { ListingService } from "../../services/ListingService";
import { IListing } from "../Listings/ListingsModel";

const HTMLTemplate = (listing: IListing) => `
    <div class="overlay"></div>

    <div class="form-modal">
        <header><h3>Listing Details</h3></header>
        <section>
        <form class="listing-form">
            <div class="form-field">
                <label for="AskingPrice">Asking price</label>
                <input value="${listing.askingPrice}" type="text" placeholder="What is the asking price? eg. £400 000" name="AskingPrice" id="AskingPrice" required>
            </div>
            <div class="form-field two-column">
                <label for="Beds">Number of bedrooms & bathrooms</label>
                <input value="${listing.beds}" type="number" placeholder="How many bedrooms?" name="Beds" id="Beds" required>
                <input value="${listing.baths}" type="number" placeholder="How many bathrooms?" name="Baths" id="Baths" required>
            </div>
            <div class="form-field two-column address">
                <label for="Address">Address</label>
                <input value="${listing.address}" type="text" placeholder="What is the first line?" name="Address" id="Address" required>
                <input value="${listing.postcode}" type="text" placeholder="Postcode" name="Postcode" id="Postcode" required>
            </div>
            <div class="form-field">
                <label for="Description">Description</label>
                <textarea placeholder="Give some details about the property" name="Description" id="Description" required>${listing.description}</textarea>
            </div>
            
            <div class="form-field">
                <label for="Photos">Upload Photos</label>
                <input type="file" name="Photos" id="Photos" multiple accept="image/png,image/gif,image/jpeg">
                <section class="uploaded-photos"></section>
            </div>

            <section class="btn-group">
                <button class="btn cancel-edit" type="button">Cancel</button>
                <button class="btn btn-secondary save-listing" type="submit">Save Listing</button>
            </section>
        </form>
        </section>

    </div>
`;

export class ListingForm extends HTMLElement {
  public newListing: IListing | any = {
    _id: new Date().getTime(),
    address: '',
    askingPrice: '',
    baths: null,
    beds: null,
    description: '',
    expired: false,
    postcode: '',
    photos: [],
  }

  private editing: boolean = false;
  private listingService = new ListingService();
  private cancelBtn!: HTMLElement;
  private photoUpload!: HTMLElement;
  private saveBtn!: HTMLElement;
  private listingForm!: HTMLFormElement;

  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ['listing'];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (newValue && attr === 'listing') {
      this.populateForm(JSON.parse(newValue))
    }
  }

  connectedCallback() {
    this.cancelBtn = <HTMLElement>this.querySelector('.btn.cancel-edit');
    this.saveBtn = <HTMLElement>this.querySelector('.btn.save-listing');
    this.photoUpload = <HTMLElement>this.querySelector('#Photos');
    this.listingForm = <HTMLFormElement>this.querySelector('.listing-form');

    this.cancelBtn.addEventListener('click', this.hideForm.bind(this));
    this.saveBtn.addEventListener('click', this.triggerSubmitted.bind(this));
    this.listingForm.addEventListener('submit', this.saveListing.bind(this));
    this.photoUpload.addEventListener('change', (event) => this.uploadPhotos(event));
  }

  disconnectedCallback() {
    this.cancelBtn.removeEventListener('click', this.hideForm.bind(this));
    this.saveBtn.removeEventListener('click', this.triggerSubmitted.bind(this));
    this.listingForm.removeEventListener('submit', this.saveListing.bind(this));
    this.photoUpload.removeEventListener('change', (event) => this.uploadPhotos(event));
  }

  saveListing(event: Event) {
    const elements = ['Address', 'AskingPrice', 'Baths', 'Beds', 'Postcode', 'Description'];

    elements.forEach((elem: string) => {
      const listingProp = elem.charAt(0).toLowerCase() + elem.slice(1);
      this.newListing[listingProp] = (event.target as any).elements[elem].value;
    })

    if (!this.editing) {
      this.listingService.addListing(this.newListing);
    } else {
      this.listingService.updateListing(this.newListing);
      this.editing = false;
    }
    this.listingForm.classList.remove('submitted');
    this.hideForm();
    event.preventDefault();
  }

  uploadPhotos({ target: input }: any) {
    const gallerySection = <HTMLElement>document.querySelector('.uploaded-photos');

    if (input?.files) {
      for (let i = 0; i < input.files.length; i++) {
        const reader = new FileReader();

        reader.onload = (event: Event) => {
          const newImage = document.createElement('img');
          const imageDataUrl = (event.target as any).result;

          newImage.setAttribute('src', imageDataUrl);
          gallerySection.appendChild(newImage);

          this.newListing.photos.push(imageDataUrl)
        };

        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  hideForm() {
    this.setAttribute('hidden', 'hidden');
    this.disconnectedCallback();
    this.render(this.newListing);
    this.connectedCallback();
  }

  triggerSubmitted() {
    this.listingForm.classList.add('submitted')
  }

  populateForm(listing: IListing) {
    this.editing = true;
    // TODO: Populate listing.photos array
    this.disconnectedCallback();
    this.render(listing);
    this.connectedCallback();
  }

  render(listing = this.newListing) {
    this.innerHTML = HTMLTemplate(listing);
  }
}

window.customElements.define('zoopla-listing-form', ListingForm);
