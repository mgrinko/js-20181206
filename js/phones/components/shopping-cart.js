export default class ShoppingCart {
  constructor({ element,addToCart }) {
    this._element = element;
    this._addToCart = addToCart;

    this._render();
    this._element.addEventListener('click',(event) => {
      const removeBtn = event.target.closest('.remove-btn')
      if(!removeBtn){
        return;
      }

      removeBtn.parentNode.remove();
    })
  }

  _render() {
    this._element.innerHTML = `
      <h3>Shopping Cart</h3>
      <ul data-shoping-cart class="list-holder">
      </ul>
    `;
  }
}
