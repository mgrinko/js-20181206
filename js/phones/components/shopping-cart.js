export default class ShoppingCart {
  constructor({element}) {
    this._element = element;
    this._phones = [];
    this._render();

    this._element.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-element="remove-from-cart"]');
      if (!removeBtn) return;
      const phoneToRemove = removeBtn.dataset.phone;
      this.remove(phoneToRemove);
    })
  }

  add(phone) {
    this._phones.push(phone);
    this._render();
  }

  remove(phoneId) {
    const phone = this._phones.find(phone => phone.id === phoneId);
    if (!phone) return;
    this._phones.splice(this._phones.indexOf(phone), 1);
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart </p>
      <ul>
        ${this._phones.map(phone => `
          <li>${phone.name} <button data-element="remove-from-cart" data-phone="${phone.id}">remove</button></li>
        `)}
      </ul>
    `;
  }
}
