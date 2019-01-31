export default class PhoneViewer {
  constructor({ element, backToCatalog, addToCart}) {
    this._element = element;
    this._backToCatalogCallback = backToCatalog;
    this._addToCartCallback = addToCart;

    this._element.addEventListener('click', (event) => {
      const backLink = event.target.closest('[data-element="back-link"');
      const cartLink = event.target.closest('[data-element=add-to-cart]');
      this._backToCatalog(backLink);
      this._addToCart(cartLink);
    })
  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

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
      <img class="phone" src="${ phone.images[0] }">

      <button data-element="back-link">Back</button>
      <button data-element="add-to-cart">Add to basket</button>
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
  }
}
