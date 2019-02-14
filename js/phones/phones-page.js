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

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();

    this._showPhones();
  }

  _showPhones() {
    const filterData = this._filter.getCurrentData();


    PhoneService.getAll(filterData)
      .then(phones => {
        this._catalog.show(phones);
      })
      .catch(() => {
        // console.warn('Server unavailable');
      });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      try {
        const phoneDetails = await PhoneService.getById(phoneId);

        this._viewer.show(phoneDetails);
        this._catalog.hide();
      } catch (e) {
        alert('Error');
      }

    });

    this._catalog.subscribe('phone-added', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._showPhones();
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
    });

    this._filter.subscribe('query-changed', () => {
      this._showPhones();
    });

    this._filter.subscribe('order-changed', () => {
      this._showPhones();
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
