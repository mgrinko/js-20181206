'use strict';
import Component from './component.js'
export default class PhoneCatalog extends Component {
  constructor({ element, phones, onPhoneSelected, addPhoneToCart }) {
    super({ element });
    this._phones = phones;
    this._filteredPhones = null;
    this._onPhoneSelected = onPhoneSelected;
    this._addPhoneToCart = addPhoneToCart;
    this._render(phones);

    this._element.addEventListener('click', (event) => {
      if (event.target.closest('[data-element="phone-link"]')) {
        this._onClickPhoneLink(event);
      }

      if (event.target.closest('[data-element="add-button"]')) {
        this._onClickAddButton(event);
      }
    });
  }

  filterBy(query) {
    if (query === '') {
      this._filteredPhones = null;
      this._render(this._phones);
    }
    this._filteredPhones = this._phones.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()));
    this._render(this._filteredPhones);
  }

  sortBy(param) {
    let phones = this._filteredPhones || this._phones;
    phones.sort((a, b) => {
      if (a[param] > b[param]) {
        return 1;
      }
      if (a[param] < b[param]) {
        return -1;
      }
      return 0;
    });
    this._render(phones);
  }

  _onClickAddButton(event) {
    const addButton = event.target.closest('[data-element="add-button"]');
    const phoneElement = addButton.closest('[data-element="phone"]');
    const phoneInfo = this._phones.find((item) => item.id === phoneElement.dataset.phoneId );
    this._addPhoneToCart(phoneInfo);
  }

  _onClickPhoneLink(event) {
    const phoneLink = event.target.closest('[data-element="phone-link"]');

    if (!phoneLink) {
      return;
    }

    const phoneElement = phoneLink.closest('[data-element="phone"]');

    this._onPhoneSelected(phoneElement.dataset.phoneId);
  }

  _render(phones) {

    this._element.innerHTML = `
      <ul class="phones">
      
        ${ phones.map(phone => `

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
              <a class="btn btn-success" data-element="add-button">
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
