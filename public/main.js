/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);




let currentPage = new _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  element: document.querySelector('[data-page-container]'),
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhonesPage; });
/* harmony import */ var _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _components_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _phone_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);








class PhonesPage {
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


    _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getAll(filterData)
      .then(phones => {
        this._catalog.show(phones);
      })
      .catch(error => {
        console.warn('Server unavailable');
      });
  }

  _initCatalog() {
    this._catalog = new _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      try {
        const phoneDetails = await _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getById(phoneId);

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
    this._viewer = new _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
    this._cart = new _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new _components_filter_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneCatalog; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class PhoneCatalog extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._phones = [];
    this._render();

    this.on('click', 'phone-link', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'add-button', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-added', phoneElement.dataset.phoneId);
    });
  }

  show(phones) {
    this._phones = phones;

    super.show();

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      
        ${ this._phones.map(phone => `

          <li
            data-element="phone"
            data-phone-id="${ phone.id }"
            class="thumbnail"
          >
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="add-button">
                Add
              </a>
            </div>
  
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      
        
      </ul> 
    `;
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {

  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${ elementName }"]`);

      if (!delegateTarget) {
        return;
      }

      callback(event);
    });
  }

  show() {
    this._element.hidden = false;
  }

  hide() {
    this._element.hidden = true;
  }

  subscribe(eventName, callback) {
    let eventCallbacks = this._callbackMap[eventName] || [];

    eventCallbacks.push(callback);

    this._callbackMap[eventName] = eventCallbacks;
  }

  emit(eventName, data) {
    let eventCallbacks = this._callbackMap[eventName] || [];

    eventCallbacks.forEach(callback => {
      callback(data);
    });
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneViewer; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class PhoneViewer extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  constructor({ element }) {
    super({ element });

    this._phoneDetails = null;

    this.on('click', 'back-button', () => this.emit('back'));
    this.on('click', 'add-button', () => this.emit('add', this._phoneDetails.id));

    this.on('click', 'small-image', (event) => {
      let smallImage = event.target;
      let largeImage = this._element.querySelector('[data-element="large-image"]');

      largeImage.src = smallImage.src;
    });
  }

  show(phoneDetails) {
    this._phoneDetails = phoneDetails;

    super.show();

    this._render();
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img
        data-element="large-image"
        class="phone"
        src="${ phone.images[0] }"
      >

      <button data-element="back-button">Back</button>
      <button data-element="add-button">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(imageUrl => `
        
          <li>
            <img
              data-element="small-image"
              src="${ imageUrl }"
            >
          </li>
        
        `).join('') }
      </ul>
    `;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShoppingCart; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class ShoppingCart extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this.items = [];

    this._render();

    this.on('click', 'remove-button', (event) => {
      let button = event.target;

      this.remove(button.dataset.itemId);
    });
  }

  add(itemId) {
    this.items.push(itemId);

    this._render();
  }

  remove(itemIdToRemove) {
    this.items = this.items
      .filter(itemId => itemId !== itemIdToRemove);

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ this.items.map(itemId => `
          <li>
            ${ itemId }
            
            <button
              data-element="remove-button"
              data-item-id="${ itemId }"
            >
              X
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Filter extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._render();

    const emitQueryChangedWithDeboune = _.debounce(
      (event) => {
        this.emit('query-changed', event.target.value);
      },

      500
    );

    this.on('input', 'query-field', emitQueryChangedWithDeboune);

    this.on('change', 'order-field', (event) => {
      this.emit('order-changed', event.target.value);
    });
  }

  getCurrentData() {
    let orderField = this._element.querySelector('[data-element="order-field"]');
    let queryField = this._element.querySelector('[data-element="query-field"]');

    return {
      query: queryField.value,
      orderBy: orderField.value,
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="query-field">
      </p>

      <p>
        Sort by:
        <select data-element="order-field">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const PhoneService = {

  async getAll({ query = '', orderBy = 'age' }) {
    let url = 'https://mgrinko.github.io/js-20181206/phones/phones.json';

    const phones = await this._sendRequest(url);
    const filteredPhones = this._filter(phones, query);
    const sortedPhones = this._sort(filteredPhones, orderBy);

    return sortedPhones;
  },

  getById(phoneId, callback) {
    let url = `https://mgrinko.giasdthub.io/js-20181206/phones/${ phoneId }.json`;

    return this._sendRequest(url);
  },

  _sendRequest(url) {
    return fetch(url)
      .then(response => response.json());
  },

  _filter(phones, query) {
    const normalizedQuery = query.toLowerCase();

    return phones.filter((phone) => {
      return phone.name.toLowerCase().includes(normalizedQuery);
    });
  },

  _sort(phones, orderBy) {
    return phones.sort((phoneA, phoneB) => {
      return phoneA[orderBy] > phoneB[orderBy] ? 1 : -1
    });
  },
};

/* harmony default export */ __webpack_exports__["default"] = (PhoneService);


/***/ })
/******/ ]);