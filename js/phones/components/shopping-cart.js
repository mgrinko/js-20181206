export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;

    this._render();
  }

  add(phoneName) {
    console.log(phoneName);

    const listProducts = this._element.querySelector('ul');
    const newLi = document.createElement('li');

    newLi.innerHTML = phoneName;

    listProducts.appendChild(newLi);
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        <li>Phone 1</li>
        <li>Phone 2</li>
        <li>Phone 3</li>
      </ul>
    `;
  }
}
