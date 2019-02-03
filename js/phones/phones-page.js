
export default class PhonesPage{
  constructor({ element }){
    this._element = element;

    this._render();

    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    });
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
      cart: this._cart,
      onPhoneSelected: (phoneId) =>{
        let phoneDetails = PhoneService.getById(phoneId);
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      }   
    });
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      catalog: this._catalog,
      cart: this._cart
    });
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
      phones: PhoneService.getAll(),
      catalog: this._element.querySelector('[data-component="phone-catalog"]')
    });
  }

  hide(){
    this._element.hidden = true;
  }
  show(){
    this._element.hidden = false;
  }
  _render(){
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
          <div data-component='phone-catalog'></div>
          <div data-component='phone-viewer' hidden></div>
        </div>
      </div>
    </div>

    `;
  }
}