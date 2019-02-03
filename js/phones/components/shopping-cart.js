import Base from './base.js';

export default class ShoppingCart extends Base{
  constructor({ element }) {
    super({ element });

    this._addedItems = new Map();

    this._render();

    //удаление
    this.on('click','.js-delInCart','del-cart');
    this.on('click','.js-controlCart','update-count');

  }

  _addTo(itemId,itemTitle) {
    if(this._addedItems.has(itemId)) return;


    this._addedItems.set(itemId, {
        title:itemTitle,
        count:1
    });

    this._render();
  }

  _removeFrom(id) {
      this._addedItems.delete(id);

      this._render();
  }

  _updateItem(id,type) {
    let item = this._addedItems.get(id);

    if(type==='p') item.count++;
    else  item.count--;

    this._addedItems.set(id,item);

    this._render();
  }

  _render() {

    if (!this._addedItems.size){
      this._element.innerHTML = '';
      return;
    }

    let itemsHtml = '';

    this._addedItems.forEach((item, key) => {
      itemsHtml += `
            <li class="js-itemInCart" data-id="${ key }">
                ${ item.title }
                <div>
                    <span class="controlCart js-controlCart" data-type="m">-</span>
                    <span>${ item.count }</span>
                    <span class="controlCart js-controlCart" data-type="p">+</span>
                    <span class="delete_cart js-delInCart">&times;</span>
                </div>
                
            </li>
        `
    });

    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>${ itemsHtml }</ul>
    `;
  }
}
