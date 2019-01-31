import BaseComponent from './base-component.js';

export default class PhoneCatalog extends BaseComponent {
  constructor({ element, phones, onPhoneSelected, onAddToCart }) {
    super({ element });
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._onAddToCart = onAddToCart;

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
      const byBtn = event.target.closest('[data-add-item]');

      if (!byBtn) {
        return;
      }

      const phoneId = byBtn.dataset.addItem;
      const phone = this._phones.find(el => el.id === phoneId);
      this._onAddToCart(phone);
    });
  }

  updateView(){
    this._render();
  }

  setPhones(newPhones){
    this._phones = newPhones;
  }

  getPhones(){
    return this._phones;
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
              <a data-add-item="${phone.id}" class="btn btn-success">
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
