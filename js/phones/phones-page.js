'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      onPhoneSelected: async (phoneId) => {
        let phoneDetails = await PhoneService.getById(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      addPhoneToCart: (opts) => {
        this._cart.add(opts);
      }
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
        backToCatalog: () => {
          this._viewer.hide();
          this._catalog.show();
        },
      addToCart: (opts) => {
        this._cart.add(opts);
      }
    });

    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });

    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
      onSearch: (query) => {
        this._catalog.filterBy(query);
      },
      onSort: (param) => {
        this._catalog.sortBy(param);
      }
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
