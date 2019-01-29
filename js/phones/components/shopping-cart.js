export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;
    this._goods = {};
    this._render();
    this._element.addEventListener('click', (event) => {
      const delBtn = event.target.closest('[data-remove-item]');
      if(delBtn){
        const phoneId = delBtn.dataset.removeItem;
        this.removeItem(phoneId);
      }
    });
  }
  addItem(phone){
    this._goods[phone.id] = phone;
    this._render();
  }
  removeItem(id){
    delete this._goods[id];
    this._render();
  }
  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${Object.keys(this._goods).map(phoneId => `
          <li>${ this._goods[phoneId].name } <button data-remove-item="${phoneId}">-</button></li>
        `)}
      </ul>
    `;
  }
}
