
import { ListingService } from "../../services/ListingService";

const HTMLTemplate = (params: any) => `
    <div class="overlay"></div>

    <div class="form-modal">
        <header><h3>Listing Details</h3></header>
        <section>
        <form class="listing-form">
            <div class="form-field">
                <label for="AskingPrice">Asking price</label>
                <input type="text" placeholder="What is the asking price? eg. £400 000" name="AskingPrice" id="AskingPrice" required>
            </div>
            <div class="form-field two-column">
                <label for="Beds">Number of bedrooms & bathrooms</label>
                <input type="number" placeholder="How many bedrooms?" name="Beds" id="Beds" required>
                <input type="number" placeholder="How many bathrooms?" name="Baths" id="Baths" required>
            </div>
            <div class="form-field two-column address">
                <label for="Address">Address</label>
                <input type="text" placeholder="What is the first line?" name="Address" id="Address" required>
                <input type="text" placeholder="Postcode" name="Postcode" id="Postcode" required>
            </div>
            <div class="form-field">
                <label for="Description">Description</label>
                <textarea placeholder="Give some details about the property  " name="Description" id="Description" required></textarea>
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

class ListingForm extends HTMLElement {
  public state = {};
  public listingService = new ListingService();

  private cancelBtn!: HTMLElement;
  private photoUpload!: HTMLElement;
  private saveBtn!: HTMLElement;
  private zooplaForm!: HTMLElement;
  private listingForm!: HTMLFormElement;
  private photos: string[] = [];

  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.cancelBtn = <HTMLElement>document.querySelector('.btn.cancel-edit');
    this.saveBtn = <HTMLElement>document.querySelector('.btn.save-listing');
    this.photoUpload = <HTMLElement>document.querySelector('#Photos');
    this.listingForm = <HTMLFormElement>document.querySelector('.listing-form');
    this.zooplaForm = <HTMLElement>document.querySelector('zoopla-listing-form');

    this.cancelBtn.addEventListener('click', this.closeModal.bind(this));
    this.saveBtn.addEventListener('click', this.triggerSubmitted.bind(this));
    this.listingForm.addEventListener('submit', this.saveListing.bind(this));
    this.photoUpload.addEventListener('change', (event) => this.uploadPhotos(event));
  }

  disconnectedCallback() {
    this.cancelBtn.removeEventListener('click', this.closeModal.bind(this));
    this.saveBtn.removeEventListener('click', this.triggerSubmitted.bind(this));
    this.listingForm.removeEventListener('submit', this.saveListing.bind(this));
    this.photoUpload.removeEventListener('change', (event) => this.uploadPhotos(event));
  }

  saveListing(event: Event) {
    const elements = ['Address', 'AskingPrice', 'Baths', 'Beds', 'Postcode', 'Description'];
    const newListing: any = {
      photos: this.photos
    };

    elements.forEach((elem: string) => {
      const listingProp = elem.charAt(0).toLowerCase() + elem.slice(1);
      newListing[listingProp] = (event.target as any).elements[elem].value;
    })

    this.listingService.addListing(newListing);
    this.listingForm.classList.remove('submitted')
    this.closeModal();
    event.preventDefault()
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
          this.photos.push(imageDataUrl)
        };

        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  closeModal() {
    this.zooplaForm.toggleAttribute('hidden');
  }

  triggerSubmitted() {
    this.listingForm.classList.add('submitted')
  }

  render() {
    this.innerHTML = HTMLTemplate(this.state);
  }

}

window.customElements.define('zoopla-listing-form', ListingForm);
