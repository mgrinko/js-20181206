export default class PhoneViewer {
  constructor({ element, onPhonesCatalog }) {
    this._element = element;
    this._onPhonesCatalog = onPhonesCatalog;
  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

    this._render();

    this._showLargeImage();

    this._addToCart();

    this._element.addEventListener('click', (event) => {
      const onCatalogLink = event.target.closest('[class="link-come-back"]');
      if (onCatalogLink) {
        this._onPhonesCatalog();
        console.log('Нажали Назад');
      }
    });

  }

  _showLargeImage() {
    let largeImg = document.querySelector('.phone');

    let thumbs = document.querySelector('.phone-thumbs');

    thumbs.addEventListener('click', (event) => {
      let target = event.target;

      if (target.nodeName === 'IMG') {
        showThumbnail(target.src);
        return false;
      }

    });

    function showThumbnail(src) {
      largeImg.src = src;
    }
  }

  _addToCart() {
    let phone = this._phoneDetails,
        cart = document.querySelector('.shopping-cart ol'),
        button = document.querySelector('.btn-mg');

    button.addEventListener('click', (event) => {
      let cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <img src="${ phone.images[0] }">
        ${ phone.name }
        <button class="btn-remove">×</button>
      `;

      cart.prepend(cartItem);
    });
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }">

      <button class="link-come-back">Back to catalog</button>

      <h1>${ phone.name }</h1>

      <p>${ phone.description }</p>

      <button class="btn btn-success btn-mg">Add to cart</button>

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
