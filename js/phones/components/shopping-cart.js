import Component from "./component.js";

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({element});
    this._items = [];

    this.on('click', 'remove-button', (event)=>{
      const itemToDelete = event.target.dataset.itemId;
      this.remove(itemToDelete);
    });
  }

  add(itemId) {
    this._items.push(itemId);
    this._render();
  }

  remove(itemId) {
    this._items = this._items.filter(item => item !== itemId);
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
      ${this._items.map(itemId=>`
        <li>${itemId}
          <a 
            data-element="remove-button" 
            data-item-id="${ itemId }"
            class="cart__remove-button">×
          </a>
        </li>
      `).join('')}
        
      </ul>
    `;
  }
}
