'use strict';

export default class PhoneCatalog {
  constructor({ element, phones, onPhoneSelected, addToCart}) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._addToCartCallback = addToCart;

    this._render();

    this._element.addEventListener('click', (event) => {
      const phoneLink = event.target.closest('[data-element="phone-link"]');
      const addToCartButton = event.target.closest('[data-element="add-to-cart"]');
      this._openPhone(phoneLink);
      this._addToCart(addToCartButton);
    });
  }

  _openPhone(phoneLink) {
    if (!phoneLink) return;
    const phoneElement = phoneLink.closest('[data-element="phone"]');
    this._onPhoneSelected(phoneElement.dataset.phoneId);
  }

  _addToCart(addToCartButton) {
    if (!addToCartButton) return;
    const phoneElement = addToCartButton.closest('[data-element="phone"]');
    this._addToCartCallback(phoneElement.dataset.phoneId);
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${ this._phones.map(phone => `

          <li
            data-element="phone"
            data-phone-id="${ phone.id }"
            class="thumbnail"
          >
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a data-element="add-to-cart" class="btn btn-success">
                Add
              </a>
            </div>
  
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      
        
      </ul> 
    `;
  }
}
