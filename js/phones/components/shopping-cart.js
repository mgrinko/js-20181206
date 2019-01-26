export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;
    this._addedItems = [];

    this._render();

    //в корзину
    document.addEventListener('click', (event) => {
        const addButton = event.target.closest('.js-addInCart');

        if (!addButton) return;

        this._addInCart(addButton.dataset.name);
    });

    //удаление
    document.addEventListener('click', (event) => {
        const delButton = event.target.closest('.js-delInCart');

        if (!delButton) return;

        this._delInCart(delButton.dataset.key);
    });
  }

  _addInCart(itemTitle) {
      this._addedItems.push(itemTitle);

      this._render();
  }

  _delInCart(id) {
      this._addedItems.splice(id,1);

      this._render();
  }

  _render() {
    if (!this._addedItems.length){
      this._element.innerHTML = '';
      return;
    }

    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${
          this._addedItems.map((item,key) => `
              <li> 
                  ${ item } 
                  <span class="delete_cart js-delInCart" data-key="${ key }">&times;</span>
              </li>
          `).join('')
        }
      </ul>
    `;
  }
}
