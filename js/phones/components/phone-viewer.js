export default class PhoneViewer {
  constructor({ element, onDetailBack, onDetailAddCart }) {
    this._element = element;
    this._onDetailBack = onDetailBack;
    this._onDetailAddCart = onDetailAddCart;

    this._element.addEventListener('click', (event) => {
      const elButton = event.target.closest('[data-element]');
      const phoneElement = elButton.closest('[data-element="detail"]');
      const elType = elButton.dataset.element;

      if (elType === 'back-catalog') {
        this._onDetailBack();
      } else if (elType === 'add-cart') {
        this._onDetailAddCart(phoneElement.dataset.phoneName);
      } else {
        return;
      }

    });

    this._element.addEventListener('click', (event) => {
      const image = event.target.closest('[data-image="img"]').src;

      if (!image) {
        return;
      }

      this._element.querySelector('.phone').setAttribute('src', image)
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
    <div data-element="detail"
         data-phone-name="${ phone.name }">
          <img class="phone" src="${ phone.images[0] }">
    
          <button data-element="back-catalog">Back</button>
          <button data-element="add-cart">Add to basket</button>
      
      
          <h1>${ phone.name }</h1>
      
          <p>${ phone.description }</p>
      
          <ul class="phone-thumbs">
            ${phone.images.map(image => `
            <li>
              <img src="${ image }" data-image="img">
            </li>
            `).join('') }
          </ul>
    </div>
    `;
  }
}
