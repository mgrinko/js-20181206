export default class PhoneViewer {
    constructor({element, onClickBackButton, addToCart, phoneDetails}) {
        this._element = element;
        this._onClickBackButton = onClickBackButton;
        this._addToCart = addToCart;
        this._phoneDetails = phoneDetails;

        this._element.addEventListener('click', (event) => {
            const backLink = event.target.closest('[data-element="back-link"]');

            if (!backLink) {
                return;
            }

            this.hide();
            this._onClickBackButton();
        });

        this._element.addEventListener('click', (event) => {
            let item = event.target.closest('[data-element="image-item"]');
            let largeImage = document.querySelector('.phone');

            if (!item) return;

            largeImage.src = item.src;
        });

        this._element.addEventListener('click', (event) => {
            let phone = this._phoneDetails;
            let addToCartButton = event.target.closest('[data-element="btn-cart"]');

            if (!addToCartButton) return;

            this._addToCart(phone.name);
        });
    }

    hide() {
        this._element.hidden = true;
    }

    show(phoneDetails) {
        this._element.hidden = false;
        this._phoneDetails = phoneDetails;
        this._render();
    }

    _render() {
        let phone = this._phoneDetails;

        this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }">

      <button data-element="back-link">Back</button>
      <button data-element="btn-cart">Add to basket</button>  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">      
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg"
           data-element="image-item" >
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg"
           data-element="image-item">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg"
           data-element="image-item">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg"
           data-element="image-item">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg" 
          data-element="image-item">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg" 
          data-element="image-item">
        </li>
      </ul>
    `;
    }
}
