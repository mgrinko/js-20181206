export default class PhoneViewer {
    constructor({element, onPhoneUnSelected}) {
        this._element = element;
        this._onPhoneUnSelected = onPhoneUnSelected;
        this._element.addEventListener('click', (event) => {
            const phoneBack = event.target.closest('[data-element="back"]');
            if (!phoneBack) {
                return;
            }
            this._onPhoneUnSelected(phoneBack.dataset.phoneId);

        });
        this._element.addEventListener('click', (event) => {
            const itemSlider = event.target.closest('[data-item-slider="img"]');
            const itemHolderSlider = document.querySelector('[data-item-holder-slider="img"]');

            if (!itemSlider) {
                return;
            }
            itemHolderSlider.src = itemSlider.src;
        });
        this._element.addEventListener('click',(event) => {
            const btnAddToCart = event.target.closest('[data-add-to-cart]');
            const holderCart = document.querySelector('[data-shoping-cart]')
            if(!btnAddToCart) {
                return;
            }
            holderCart.innerHTML += `<li data-list-item="${this._phoneId}"> ${btnAddToCart.dataset.addToCart} <span class="glyphicon glyphicon-remove-circle remove-btn" ></span></li>`

        });

    }

    hide() {
        this._element.hidden = true;
    }

    getCurrent(phoneId) {
        return this._phoneId = phoneId;
    }

    show(phoneDetails) {
        this._element.hidden = false;

        this._phoneDetails = phoneDetails;
        this._render();
    }

    _render() {

        let phone;
        for (let i = 0; i < this._phoneDetails.length; i++) {
            const element = this._phoneDetails[i];
            if (element.id === this._phoneId) {
                phone = element;
            }
        }

        this._element.innerHTML = `
      <img class="phone" data-item-holder-slider="img" src="${phone.images[0]}">

      <button data-element="back">Back</button>
      <button data-add-to-cart="${phone.name}">Add to basket</button>
  
  
      <h1>${phone.name}</h1>
  
      <p>${phone.description}</p>
  
      <ul class="phone-thumbs">
      ${
            phone.images.map(image => {
                return `<li><img data-item-slider="img"  src="${image}"></li>`;
            }).join('')
            }
      </ul>
    `;
    }
}
