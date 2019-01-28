'use strict';

export default class PhoneCatalog {
  constructor({ element, phones, onPhoneSelected }) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      const phoneLink = event.target.closest('[data-element="phone-link"]');

      if (!phoneLink) {
        return;
      }

      const phoneElement = phoneLink.closest('[data-element="phone"]');

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  _render() {

    if(!this._phones.length){
      this._element.innerHTML = `
        <ul class="phones">
          <li><h2>Ничего не нашлось</h2></li>
        </ul>
      `;

      return;
    }

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
              <a 
                class="btn btn-success js-addInCart" 
                data-id="${ phone.id }"
                data-name="${ phone.name }"
              >
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
