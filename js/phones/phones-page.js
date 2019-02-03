'use strict';

import Base from './components/base.js';
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Filter from './components/filter.js';
import PhoneService from './phone-service.js';

export default class PhonesPage extends Base{

  constructor({ element }) {
    super({ element });

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();


  }

  _initCatalog(){
      this._catalog = new PhoneCatalog({
          element: this._element.querySelector('[data-component="phone-catalog"]'),
          phones: PhoneService.getAll('','age',1,0),
      });

      this._catalog.subscribe('open-phone',(event)=>{

          const phoneElement = event.target.closest('[data-element="phone"]');
          let phoneDetails = PhoneService.getById(phoneElement.dataset.phoneId);

          this._catalog.hide();
          this._viewer.show(phoneDetails);
      });

      this._catalog.subscribe('add-cart',(event)=>{
          this._cart._addTo(event.target.dataset.id,event.target.dataset.name);
      });

  }

  _initViewer(){
      this._viewer = new PhoneViewer({
          element: this._element.querySelector('[data-component="phone-viewer"]')
      });

      this._viewer.subscribe('back',()=>{
          this._catalog.show();
          this._viewer.hide();
      });

      this._viewer.subscribe('gallery',(event)=>{
          const previewImage = event.target;
          const viewImage = this._element.querySelector('.js-view_item_image');
          viewImage.src = previewImage.src;
      });

      this._viewer.subscribe('add-cart',(event)=>{
          this._cart._addTo(this._viewer._phoneDetails.id,this._viewer._phoneDetails.name);
      });
  }

  _initShoppingCart(){
      this._cart = new ShoppingCart({
          element: this._element.querySelector('[data-component="shopping-cart"]'),
      });

      this._cart.subscribe('del-cart',(event)=>{

          let itemElement = event.target.closest('.js-itemInCart');
          this._cart._removeFrom(itemElement.dataset.id);
      });

      this._cart.subscribe('update-count',(event)=>{
          let itemElement = event.target.closest('.js-itemInCart');
          this._cart._updateItem(itemElement.dataset.id,event.target.dataset.type);
      });
  }

  _initFilter(){
      this._filter = new Filter({
          element: this._element.querySelector('[data-component="filter"]')
      });

      this._filter.subscribe('filter-catalog',(event)=>{

          const valueSearch = this._filter._searchInput.value.toLowerCase();
          const valueSort = this._filter._sortableOptions.value;

          this._catalog._phones = PhoneService.getAll(valueSearch,valueSort);
          this._catalog._render();

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
