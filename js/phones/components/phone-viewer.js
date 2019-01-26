export default class PhoneViewer {
  constructor({ element, backToCatalog }) {
    this._element = element;
    this._backToCatalog = backToCatalog;

    this._initEventHandlers();
  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

    this._render();
  }

  _initEventHandlers() {
    this._element.addEventListener('click', (e) => {
      if (e.target.closest('.phone__back')) {
          this._backToCatalog();
      };

        if (e.target.tagName === 'IMG' && !e.target.classList.contains('phone')) {
            const mainPhoto = this._element.querySelector('.phone');
            if (!mainPhoto.hasAttribute('data-src')) mainPhoto.setAttribute('data-src', mainPhoto.src);

            mainPhoto.src = e.target.src;
        }
    });
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }">

      <button class="phone__back">Back</button>
      <button class="phone__add js-add-to-cart">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(img => `
            <li>
              <img src="${img}">
            </li>
        `).join('') }
      </ul>
    `;
  }
}
