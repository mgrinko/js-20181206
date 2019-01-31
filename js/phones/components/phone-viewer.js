import Component from './component.js'

export default class PhoneViewer extends Component {
  constructor({ element, backToCatalog, addToCart }) {
    super({ element });
    this._backToCatalog = backToCatalog;
    this._addToCart = addToCart;
    this._initEventHandlers();
  }

  show(phoneDetails) {
    super.show();
    this._phoneDetails = phoneDetails;
    this._render();
  }

  _initEventHandlers() {
    this._element.addEventListener('click', (e) => {
      if (e.target.closest('[data-element="back-button"]')) {
          this._backToCatalog();
      }
      if (e.target.closest('[data-element="add-button"]')) {
        this._addToCart(this._phoneDetails);
      }
      if (e.target.tagName === 'IMG' && !e.target.classList.contains('phone')) {
            const mainPhoto = this._element.querySelector('.phone');
            if (!mainPhoto.hasAttribute('data-src')) mainPhoto.setAttribute('data-src', mainPhoto.src);

            mainPhoto.src = e.target.src;
        }
    });
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }" alt="phone photo">

      <button class="phone__back" data-element="back-button">Back</button>
      <button class="phone__add" data-element="add-button" data-phone-id="${phone.id}">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(img => `
            <li>
              <img src="${img}" alt="phone photo">
            </li>
        `).join('') }
      </ul>
    `;
  }
}
