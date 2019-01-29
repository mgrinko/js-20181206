'use strict';

export default class PhoneCatalog {
  constructor({ element, phones, onPhoneSelected }) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._addToCart();

    this._element.addEventListener('click', (event) => {
      const phoneLink = event.target.closest('[data-element="phone-link"]');

      if (!phoneLink) {
        return;
      }

      const phoneElement = phoneLink.closest('[data-element="phone"]');

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  _addToCart() {
    let buttons = document.querySelectorAll('.btn');

    buttons.forEach((item) => {

      item.addEventListener('click', (event) => {

        const phoneItem = event.target.closest('[class="thumbnail"]'),
              phoneImg = phoneItem.getElementsByTagName('img')[0],
              phoneName = phoneItem.querySelector('.phone-name');

        console.log('phoneItem: ', phoneItem);
        console.log('phoneImg: ', phoneImg);
        console.log('phoneName: ', phoneName.innerHTML);

        let cart = document.querySelector('.shopping-cart ol'),
            cartItem = document.createElement('li');
        cartItem.innerHTML = `
          ${ phoneImg.outerHTML }
          ${ phoneName.innerHTML }
          <button class="btn-remove">×</button>
        `;

        cart.prepend(cartItem);
      });

    });
  }

  _render() {
    this._element.innerHTML = `
      <h1>Phones catalog</h1>
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
              <a class="btn btn-success">
                Add to cart
              </a>
            </div>

            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="phone-name"
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
