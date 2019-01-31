'use strict';

export default class PhoneCatalog {
  constructor({ element, phones, onPhoneSelected, onPhoneAddCart }) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._onPhoneAddCart = onPhoneAddCart;

    this._render();

    this._element.addEventListener('click', (event) => {
      const phoneLink = event.target.closest('[data-element]');
      const phoneElement = phoneLink.closest('[data-element="phone"]');
      const elType = phoneLink.dataset.element;

      if (elType === 'phone-link') {
        this._onPhoneSelected(phoneElement.dataset.phoneId);
      } else if (elType === 'add-cart') {
        this._onPhoneAddCart(phoneElement.dataset.phoneName);
      } else {
        return;
      }

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
            data-phone-name="${ phone.name }"
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
              <a class="btn btn-success" data-element="add-cart">
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
