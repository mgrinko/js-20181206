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

  _initCatalog() {
    PhoneService.getAll({ sortBy: this._filter.sortBy, query: this._filter.queryString })
      .then(phones => {
        this._catalog = new PhoneCatalog({
          element: this.find('[data-component="phone-catalog"]'),
          phones,
        });

        this._catalog.subscribe('phone-selected', (phoneId) => {
          PhoneService.getById(phoneId)
            .then(phoneDetails => {
              this._catalog.hide();
              this._viewer.show(phoneDetails);
            })
        });

        this._catalog.subscribe('phone-added', (phoneId) => {
          this._cart.add(phoneId);
        });
      })

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

    this._filter.subscribe('sort-select', ({ sortBy, queryString }) => {
      PhoneService.getAll({ sortBy, query: queryString }).then(phones => {
        this._catalog.updateView(phones);
      })
    })

    this._filter.subscribe('search-select', ({ sortBy, queryString }) => {
      PhoneService.getAll({ sortBy, query: queryString }).then(phones => {
        this._catalog.updateView(phones);
      })
    })
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