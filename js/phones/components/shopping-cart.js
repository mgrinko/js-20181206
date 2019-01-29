export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;

    this._render();
    this._removeCartItem();

  }

  _removeCartItem() {

    this._element.addEventListener('click', (event) => {

      const btnRemove = event.target.closest('[class="btn-remove"]');

      if (!btnRemove) {
        return;
      }

      const cartItem = event.target.parentNode;

      console.log('cartItemNode: ', cartItem);

      let cart = document.querySelector('.shopping-cart ol');

      cart.removeChild(cartItem);
    });
    
  }

  _render() {
    this._element.innerHTML = `
      <div class="shopping-cart">
        <h4>Shopping Cart</h4>
        <ol>
          <li>
            <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
            Phone 1
            <button class="btn-remove">×</button>
          </li>
          <li>
            <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
            Phone 2
            <button class="btn-remove">×</button>
          </li>
        </ol>
      </div>
    `;
  }
}
