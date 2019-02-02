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
      
      const countInput = this.find(`[data-element="item-count"][data-item-id="${ itemId }"]`);
      if(event.target.dataset.element === "decrease-button") {
        countInput.value = +countInput.value - 1;
      } else {
        countInput.value = +countInput.value + 1;
      }
      countInput.dispatchEvent( new Event('change', {bubbles: true}));
    });

   
    this.on('change', 'item-count', (event) => {
       let itemId = event.target.dataset.itemId;
       
       let count = event.target.value;

       if(count < 1){
         this.remove(itemId);
         return;
       }

       this.items[itemId].count = count;
     });
  }

  add(item) {
    if(!this.items[item.id]){
      this.items[item.id] = {item, count: 1};
      this._render();
    }
  }

  remove(itemIdToRemoveId) {
    delete this.items[itemIdToRemoveId];

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ Object.keys(this.items).map(itemId => {
          const item = this.items[itemId].item;
          const count = this.items[itemId].count;
          return `
          <li>
            <p>
              ${ item.name }
            </p>
            <button
              data-element="decrease-button"
              data-item-id="${ itemId }"
            >
              -
            </button>
            <input type="text" style="width:40px;"
              data-element="item-count"
              value="${ count }"
              data-item-id="${ itemId }"
            >
            <button
              data-element="increase-button"
              data-item-id="${ itemId }"
            >
              +
            </button>
            <button
              data-element="remove-button"
              data-item-id="${ itemId }"
            >
              X
            </button>
          </li>
        `}).join('')}
      </ul>
    `;
  }
}