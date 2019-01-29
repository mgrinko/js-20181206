'use strict';

export default class PhoneCatalog {
  constructor({ element, phones, onPhoneSelected, addToCart }) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._addToCart = addToCart;

    this._render();

    this._element.addEventListener('click', (event) => {
      const phoneLink = event.target.closest('[data-element="phone-link"]');

      if (!phoneLink) {
        return;
      }

      const phoneElement = phoneLink.closest('[data-element="phone"]');

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });

    this._element.addEventListener('click', (event) => {
      let addToCartButton = event.target.closest('[data-element="btn-cart"]');
      let phone = addToCartButton.closest('[data-element="phone"]');
      let phoneName = phone.querySelector('.phone-name').innerHTML ;

      if (!addToCartButton) return;

      this._addToCart(phoneName);
    });
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
              <a data-element="btn-cart" 
                 class="btn btn-success">
                Add
              </a>
            </div>
  
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="phone-name"
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
