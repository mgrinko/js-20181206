export default class PhonesCatalog {
    constructor({element, phones, onPhoneSelected}) {
        this._element = element;
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;

        this._element.addEventListener('click', (event) => {
           const phoneLink = event.target.closest('[data-element="phone-link"]');

           if(!phoneLink) {
               return
           } else {
               const phoneElement = phoneLink.closest('[data-element="phone"]');

               this._onPhoneSelected(phoneElement.dataset.phoneId);

           }
        });

        this._render();
    }

    show() {
        this._element.hidden = false;
    }

    hide() {
        this._element.hidden = true;
    }

    _render() {
        this._element.innerHTML = `

            <ul class="phones">
            
                ${ this._phones.map(phone => `
                
                    <li class="thumbnail"
                        data-element="phone"
                        data-phone-id="${ phone.id }"
                    >
                        <a href="#!/phones/${ phone.id }"
                            data-element="phone-link"
                            class="thumb"
                        >
                          <img alt=" ${ phone.name } " src="${ phone.imageUrl }">
                        </a>
            
                        <div class="phones__btn-buy-wrapper">
                          <a class="btn btn-success">
                            Add
                          </a>
                        </div>
            
                        <a href="#!/phones/motorola-xoom-with-wi-fi"
                            data-element="phone-link"
                        > ${ phone.name } </a>
                        <p> ${ phone.snippet } </p>
                    </li>
                
                `).join('') }
            
            </ul>
        
        `;
    }
}