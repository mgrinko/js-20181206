export default class ShoppingCart {
  constructor({ element, addToCart, shoppingCartList }) {
    this._element = element;
    this._addToCart = addToCart;
    this._shoppingCartList = shoppingCartList;

    this._render();

      this._element.addEventListener('click', (event) => {
          const removeButton = event.target.closest('.remove-btn');

          if (!removeButton) {
              return;
          }

          removeButton.parentElement.remove();
      });
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul data-element="cart-list">        
      </ul>
    `;
  }
}
