'use strict';

import Components from './components/components.js';
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';




export default class PhonesPage extends Components{

  constructor({ element }) {
    super();

    this._element = element;

    this._render();

    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getById(phoneId);

        this._show(this._viewer._element,()=>{
            this._viewer._phoneDetails = phoneDetails;
            this._viewer._render();
        });
        this._hide(this._catalog._element);

      },
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onBackCatalog: () => {
          this._show(this._catalog._element,);
          this._hide(this._viewer._element);
      },
    });

    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });

    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
      onSort:()=>{
          const valueSearch = this._filter._search_input.value.toLowerCase();
          const valueSort = this._filter._sortable_options.value;
          let phonesList = PhoneService.getAll();

          //фильтрация
          phonesList = phonesList.filter((phone)=>{
              let namePhone = phone.name.toLowerCase();
              return namePhone.includes(valueSearch);
          });

          //сортировка
          phonesList.sort((a,b)=>{
            let valA = a[valueSort];
            let valB = b[valueSort];
            if(valueSort==='name'){
                valA.toLowerCase();
                valB.toLowerCase();
            }

              if (valA < valB) return -1;//сортируем строки по возрастанию
              if (valA > valB) return 1;
              return 0;
          });

          this._catalog._phones = phonesList;
          this._catalog._render();

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
