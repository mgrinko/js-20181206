import PhoneCatalog from './components/phone-catalog.js';
import BaseComponent from './components/base-component.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage extends BaseComponent{
  constructor({ element }) {
    super({ element })

    this._render();

    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getById(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
      onAddToCart: (phone) => {
        this._cart.addItem(phone);
      },
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onClose: () => {
        this._catalog.show();
      },
      onAddToCart: (phone) => {
        this._cart.addItem(phone);
      }
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
