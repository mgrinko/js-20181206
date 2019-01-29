export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;
    this._items = [];

    this._element.addEventListener('click', (event)=>{
      const itemToDelete = event.target.closest('[data-delete-id]');
      if(itemToDelete){
        this._items = this._items.filter(item => 
          item.id !== itemToDelete.dataset.deleteId);
          this._render();
      }
    });
  }

  add(item) {
    this._items.push(item);
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
      ${this._items.map(item=>`
        <li>${item.name}<a data-delete-id="${item.id}" class="cart__delete-button">×</a></li>
      `).join('')}
        
      </ul>
    `;
  }
}
