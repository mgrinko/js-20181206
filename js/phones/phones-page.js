'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';
import Component from '../component.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element })

    this._render();

    this._initFilter();
    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
  }

  async _initCatalog() {
    let phones = await PhoneService.getAll({ sortBy: this._filter.sortBy, query: this._filter.queryString });

    this._catalog = new PhoneCatalog({
      element: this.find('[data-component="phone-catalog"]'),
      phones,
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      let phoneDetails = await PhoneService.getById(phoneId);

      this._catalog.hide();
      this._viewer.show(phoneDetails);

    });

    this._catalog.subscribe('phone-added', (phoneId) => {
      this._cart.add(phoneId);
    });

  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this.find('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.subscribe('add', (phone) => {
      this._cart.add(phone);
    });
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: this.find('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: this.find('[data-component="filter"]'),
    });

    this._filter.subscribe('sort-changed', this._changeFilter.bind(this));
    this._filter.subscribe('query-changed', this._changeFilter.bind(this));

  }

  async _changeFilter({ sortBy, queryString }) {
    
    let phones = await PhoneService.getAll({ sortBy, query: queryString });
    this._catalog.updateView(phones);
    
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