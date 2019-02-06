import Component from '../../component.js';

export default class ShoppingCart extends Component {
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
