'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage {
  constructor({ element , phoneItemId}) {
    this._element = element;
    this._phoneItemId = phoneItemId;
    this._render();
    console.log('phoneItem', this._phoneItemId);
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getById(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },

    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onPhoneUnSelected: (phoneId) => {
        let phoneDetails = PhoneService.getById(phoneId);
        this._catalog.show();
        this._viewer.hide(phoneDetails);
      },
      phoneId: this._element.addEventListener('click',function (event) {
        const thisElement = event.target.closest('[data-phone-id]').dataset.phoneId;

        if(!thisElement) {
          return;
        }
        console.log(thisElement);
        return thisElement
      })
    });

    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });

    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
    });

  }

  _render() {
    this._element.innerHTML = `
      <div class="row">
    
        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="filter"></div>
          </section>
    
          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer" hidden></div>
        </div>
      </div>
    `;
  }
}
