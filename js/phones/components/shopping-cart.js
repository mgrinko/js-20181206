export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;

    this._render();
    this._initEventHandlers();
  }

  add({id, name}) {
    this._element.querySelector('ul').insertAdjacentHTML("beforeEnd", `<li>
        <span>${name}</span>
        <button class="js-remove-from-cart" data-id="${id}">X</button>
    </li>`);
  }

  _initEventHandlers() {
    this._element.addEventListener('click', (e) => {
      if (e.target.closest('.js-remove-from-cart')) {
        let li = e.target.closest('li');
        li.remove();
      }
    });
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>

      </ul>
    `;
  }
}

