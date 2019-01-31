export default class PhoneViewer {
  constructor({ element, backToCatalog, addToCart}) {
    this._element = element;
    this._backToCatalogCallback = backToCatalog;
    this._addToCartCallback = addToCart;

    this._element.addEventListener('click', (event) => {
      const backLink = event.target.closest('[data-element="back-link"');
      const cartLink = event.target.closest('[data-element=add-to-cart]');
      const imageLink = event.target.closest('[data-element=image]');
      this._backToCatalog(backLink);
      this._addToCart(cartLink);
      this._selectImage(imageLink);
    })
  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;
    this._selectedImage = phoneDetails.images[0];

    this._render();
  }

  _selectImage(imageLink) {
    if (!imageLink) return;
    const imageIndex = imageLink.dataset.imageIndex;
    this._selectedImage = this._phoneDetails.images[imageIndex];
    this._render();
  }

  _backToCatalog(backLink) {
    if (!backLink) return;
    this._backToCatalogCallback();
  }

  _addToCart(cartLink) {
    if (!cartLink) return;
    this._addToCartCallback(this._phoneDetails);
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone" src="${ this._selectedImage}">

      <button data-element="back-link">Back</button>
      <button data-element="add-to-cart">Add to basket</button>
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${phone.images.map((image, index) => `
          <li data-element="image" data-image-index="${index}">
            <img src="${image}">
          </li>
        `).join('')}
      </ul>
    `;
  }
}
