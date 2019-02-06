import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this.items = {};

    this._render();

    this.on('click', 'remove-button', (event) => {
      let button = event.target;

      this.remove(button.dataset.itemId);
    });

    this.on('click', ['decrease-button', 'increase-button'], (event) => {
      let itemId = event.target.dataset.itemId;

      const countInput = this.find(`[data-element="item-count"][data-item-id="${itemId}"]`);
      if (event.target.dataset.element === "decrease-button") {
        countInput.value = +countInput.value - 1;
      } else {
        countInput.value = +countInput.value + 1;
      }
      countInput.dispatchEvent(new Event('change', { bubbles: true }));
    });


    this.on('change', 'item-count', (event) => {
      let itemId = event.target.dataset.itemId;

      let count = event.target.value;

      if (count < 1) {
        this.remove(itemId);
        return;
      }

      this.items[itemId].count = count;
    });

    this.on('click', 'clear-button', () => {
      this.removeAll();
    });

    this.on('input', 'item-count', (event) => {
      let input = event.target;
      let itemId = event.target.dataset.itemId;
      let value = input.value;

      let newValue = value.replace(/[\D]/gm, '');
      if (!newValue && newValue !== "0") {
        newValue = this.items[itemId].count;
      }

      input.value = newValue;

      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  add(item) {
    if (!this.items[item.id]) {
      this.items[item.id] = { itemInfo:item, count: 1 };
      this._render();
    }
  }

  remove(itemIdToRemoveId) {
    delete this.items[itemIdToRemoveId];
    this.find(`[data-item-id="${itemIdToRemoveId}"]`).closest('li').remove();
  }

  removeAll() {
    this.items = {};
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Shopping Cart
        <button
          data-element="clear-button"
        >Clear cart</button>
      </p>
      <ul>
        ${ Object.values(this.items).map(item => `
          <li>
            <p>
              ${ item.itemInfo.name}
            </p>
            <button
              data-element="decrease-button"
              data-item-id="${ item.itemInfo.id}"
            >
              -
            </button>
            <input type="text" style="width:40px;"
              data-element="item-count"
              value="${ item.count}"
              data-item-id="${  item.itemInfo.id}"
            >
            <button
              data-element="increase-button"
              data-item-id="${  item.itemInfo.id}"
            >
              +
            </button>
            <button
              data-element="remove-button"
              data-item-id="${  item.itemInfo.id}"
            >
              X
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }
}