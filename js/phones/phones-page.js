'use strict';

import PhoneViewer from './components/phon-viewer.js';
import Filter from './components/filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesCatalog from './components/phones-catalog.js';

export default class phonePage {
    constructor({element}) {
        this._element = element;

        this._render();

        this._catalog = new PhonesCatalog({
            element: this._element.querySelector('[data-component="phones-catalog"]')
        });

        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]')
        });

        this._filter = new Filter({
            element: this._element.querySelector('[data-component="filter"]')
        });

        this._viwer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]')
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
                <div data-component="phones-catalog"></div>
                <div data-component="phone-viewer" hidden></div>
              </div>
            </div>
        
        `;
    };
}