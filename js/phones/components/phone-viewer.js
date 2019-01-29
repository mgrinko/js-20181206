export default class PhoneViewer {
  constructor({ element, phoneCatalog, cart }) {
    this._element = element;
    this._phoneCatalog = phoneCatalog;
    this._cart = cart;
    this._element.addEventListener('click', (event)=>{
      if(event.target.closest('[data-element="back-button"]')){
        this.hide();
        this._phoneCatalog.show();
      }

      if(event.target.closest('[data-element="basket-add"]')){
        this._cart.add(this._phoneDetails);
      }

      const imgClicked = event.target.closest('[data-img-index]');
      if(imgClicked){
        const index = imgClicked.dataset.imgIndex;
        const mainImage = this._element.querySelector('[data-element="img"]');
        mainImage.src = this._phoneDetails.images[index];
      }

    });
  }


  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

    this._render();
  }
  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img data-element="img" 
      class="phone" src="${ phone.images[0] }">

      <button 
        data-element="back-button"
      >Back</button>
      
      <button
        data-element="basket-add"
      >Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
      ${phone.images.map((image, index)=>`
        <li>
        <img data-img-index="${index}" src="${image}">
      </li>
      `
      ).join('')}
      </ul>
    `;
  }
}
